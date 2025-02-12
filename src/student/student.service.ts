import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponseDto } from 'src/common/dtos/base_response.dto';
import { ErrorResponseDto } from 'src/common/dtos/error_response.dto';
import { SuccessResponseDto } from 'src/common/dtos/success_response.dto';
import { Student } from 'src/database/entities/student.entity';
import { FindManyOptions, FindOptionsWhere, In, Repository } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
    ) {}

    async findByEmails(emails: string[], opts: FindOptionsWhere<Student> | FindOptionsWhere<Student>[] = {}): Promise<Student[]> {
        let students = await this.studentRepository.find({ where: { email: In(emails), ...opts} });
        return students;
    }

    async findByEmail(email: string): Promise<Student> {
        let students = await this.studentRepository.findOne({ where: { email: email} });
        return students;
    }

    async suspend(studentEmail: string): Promise<BaseResponseDto> {
        try {
            let student = await this.studentRepository.findOneBy({ email: studentEmail });
            if (!student) {
                throw new Error('Student does not existed');
            }
            student.isSuspend = true;
            await this.studentRepository.save(student);
        } catch (error) {
            return new ErrorResponseDto(error.message);
        }

        return new SuccessResponseDto();
    }

    async removeStudent(studentEmail: string): Promise<BaseResponseDto> {
        try {
            let student = await this.studentRepository.findOneBy({ email: studentEmail });
            if (!student) {
                throw new Error('Student does not existed');
            }

            await this.studentRepository.delete(student.id);
        } catch (error) {
            return new ErrorResponseDto(error.message);
        }

        return new SuccessResponseDto();
    }
}
