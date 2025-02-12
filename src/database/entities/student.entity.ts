import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StudentTeacher } from './student-teacher.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @OneToMany(() => StudentTeacher, (studentTeacher) => studentTeacher.student)
  studentTeachers: StudentTeacher[];
}
