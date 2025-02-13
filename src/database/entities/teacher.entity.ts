import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StudentTeacher } from './student-teacher.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @OneToMany(() => StudentTeacher, (studentTeacher) => studentTeacher.teacher, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  studentTeachers: StudentTeacher[];
}
