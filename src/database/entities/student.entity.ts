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

  @Column({ default: false })
  isSuspend: boolean

  @OneToMany(() => StudentTeacher, (studentTeacher) => studentTeacher.student, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  studentTeachers: StudentTeacher[];
}
