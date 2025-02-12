import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponseDto } from 'src/common/dtos/base_response.dto';
import { ErrorResponseDto } from 'src/common/dtos/error_response.dto';
import { SuccessResponseDto } from 'src/common/dtos/success_response.dto';
import { StudentTeacher } from 'src/database/entities/student-teacher.entity';
import { Student } from 'src/database/entities/student.entity';
import { Teacher } from 'src/database/entities/teacher.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(Teacher) private readonly teacherRepository: Repository<Teacher>
    ) {}

    async registerStudents(teacherEmail: string, students: Student[]): Promise<BaseResponseDto> {
        try {
            let teacher = await this.teacherRepository.findOne({ 
                where: {
                    email: teacherEmail
                },
                relations: [
                    'studentTeachers',
                    'studentTeachers.student'
                ]
            });
            if (!teacher) {
                throw new Error('Teacher does not existed');
            }

            const existedStudentIds = teacher.studentTeachers.map((rel) => rel.student.id);
            const studentsToAdd = students.filter((s) => !existedStudentIds.includes(s.id));
    
            const newRelations = studentsToAdd.map((student) => {
                const relation = new StudentTeacher();
                relation.student = student;
                relation.teacher = teacher;
                return relation;
            });
        
            teacher.studentTeachers = [...teacher.studentTeachers, ...newRelations];
        
            await this.teacherRepository.save(teacher);
        } catch (error) {
            return new ErrorResponseDto(error.message);
        }
        
        return new SuccessResponseDto();
    }

    async retrieveCommonStudents(teacherEmails: string | string[]): Promise<BaseResponseDto> {
        try {
            let emails = typeof(teacherEmails) === 'string' ? [teacherEmails] : teacherEmails;

            let teachers = await this.teacherRepository.find({
                where: {
                    email: In(emails)
                },
                relations: [
                    "studentTeachers",
                    "studentTeachers.student",
                ]
            });
            let students = teachers.flatMap(t => t.studentTeachers.map(st => st.student));
            let commonStudentEmails = Array.from(new Map(students.map(s => [s.id, s])).values()).map(s => s.email);
            if (commonStudentEmails.length > 0) {
                return new SuccessResponseDto('', { students: commonStudentEmails });
            } else {
                return new ErrorResponseDto('Not any common students found');
            }
        } catch (error) {
            return new ErrorResponseDto(error.message);
        }
    }

    async retrieveStudentsToNotice(teacherEmail: string, notification: string): Promise<BaseResponseDto> {
        try {
            let teacher = await this.teacherRepository.findOne({
                where: {
                    email: teacherEmail,
                },
                relations: [
                    "studentTeachers",
                    "studentTeachers.student",
                ]
            });
            if (!teacher) {
                throw new ErrorResponseDto('Teacher does not existed');
            }

            // Positive lookbehind for @ character (?<=@)
            // \S mean anything except whitespace characters
            let regexSearch = /(?<=@)\S+/g;
            let studentEmailsInNotification = notification.match(regexSearch) || [];
            let allStudentEmails = Array.from(new Set([
                ...teacher.studentTeachers.map(s => s.student.email),
                ...studentEmailsInNotification,
            ]));
            if (allStudentEmails.length > 0) {
                return new SuccessResponseDto('', allStudentEmails);
            } else {
                return new ErrorResponseDto('Not found any students to receive notification');
            }
        } catch (error) {
            return new ErrorResponseDto(error.message);
        }
    }
}
