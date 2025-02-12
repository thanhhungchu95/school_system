import { Student } from '../entities/student.entity';
import { Teacher } from '../entities/teacher.entity';
import { config } from 'dotenv';
import AppDataSource from '../data-source';

// Load environment variables
config();

async function seed() {
  if (process.env.NODE_ENV !== 'development') return;
  await AppDataSource.initialize();

  const studentRepo = AppDataSource.getRepository(Student);
  const teacherRepo = AppDataSource.getRepository(Teacher);

  console.log('Seeding data...');

  // Seed Students
  const students = [
    studentRepo.create({ name: 'Alice Johnson', email: 'alice@example.com', birthday: new Date(1990, 0, 1) }),
    studentRepo.create({ name: 'Bob Smith', email: 'bob@example.com', birthday: new Date(1990, 1, 1) }),
    studentRepo.create({ name: 'Charlie Brown', email: 'charlie@example.com', birthday: new Date(1990, 2, 1) }),
    studentRepo.create({ name: 'Diana Prince', email: 'diana@example.com', birthday: new Date(1990, 3, 1) }),
    studentRepo.create({ name: 'Ethan Hunt', email: 'ethan@example.com', birthday: new Date(1990, 4, 1) }),
  ];
  await studentRepo.save(students);

  // Seed Teachers
  const teachers = [
    teacherRepo.create({ name: 'Mr. Anderson', email: 'anderson@example.com' }),
    teacherRepo.create({ name: 'Ms. Clark', email: 'clark@example.com' }),
    teacherRepo.create({ name: 'Dr. Lee', email: 'lee@example.com' }),
    teacherRepo.create({ name: 'Mrs. Taylor', email: 'taylor@example.com' }),
    teacherRepo.create({ name: 'Prof. Brown', email: 'brown@example.com' }),
  ];
  await teacherRepo.save(teachers);

  console.log('Seeding completed!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  AppDataSource.destroy();
});