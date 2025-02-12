import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/database/entities/teacher.entity';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]), StudentModule],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
