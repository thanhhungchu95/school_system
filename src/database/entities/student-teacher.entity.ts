import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';

@Entity('student_teacher_relation')
export class StudentTeacher {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.studentTeachers)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Teacher, (teacher) => teacher.studentTeachers)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;
}
