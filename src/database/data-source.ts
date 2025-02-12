import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { Student } from './entities/student.entity';
import { StudentTeacher } from './entities/student-teacher.entity';

// Load environment variables
config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT, 10),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [Student, Teacher, StudentTeacher],
  migrations: ["src/database/migrations/*.{ts,js}"],
  synchronize: process.env.NODE_ENV !== "production",
});

export default AppDataSource;