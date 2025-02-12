import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { ResponseHelper } from 'src/common/helpers/response_helper';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { Response } from 'express';
import { StudentService } from 'src/student/student.service';
import { SuccessResponseDto } from 'src/common/dtos/success_response.dto';
import { SuspendRequest as SuspendStudentRequest } from 'src/student/dtos/suspend-request.dto';
import { ReceiveNotificationRequestDto } from './dtos/receive-notification-request.dto';

@Controller('teachers')
export class TeacherController {
    constructor(
        private readonly teacherService: TeacherService,
        private readonly studentService: StudentService,
    ) {}

    @Post('register')
    async register(@Body() request: RegisterRequestDto, @Res() res: Response) {
        if (~~request?.teacher?.length === 0 || ~~request?.students.length === 0) {
            return ResponseHelper.error(res, 'Parameters is invalid');
        }

        let students = await this.studentService.findByEmails(request.students);
        if (students.length !== request.students.length) {
            return ResponseHelper.error(res, 'One or more students is not exists');
        }

        let registerResult = await this.teacherService.registerStudents(request.teacher, students);
        
        if (registerResult.isSuccess) {
            return ResponseHelper.successWithStatus(res, HttpStatus.NO_CONTENT);
        } else {
            return ResponseHelper.error(res, registerResult.message);
        }
    }

    @Get('common-students')
    async commonStudents(@Query('teacher') teacherEmails: string | string[], @Res() res: Response) {
        if (~~teacherEmails?.length === 0) {
            return ResponseHelper.error(res, 'No any teacher given');
        }

        let result = await this.teacherService.retrieveCommonStudents(teacherEmails);

        if (result.isSuccess) {
            return ResponseHelper.successWithPayload(res, result.message, (result as SuccessResponseDto).payload);
        } else {
            return ResponseHelper.error(res, result.message);
        }
    }

    @Post('receive-for-notification')
    async studentsReceiveForNotification(@Body() request: ReceiveNotificationRequestDto, @Res() res: Response) {
        if (request.teacher.length === 0) {
            return ResponseHelper.error(res, 'Parameter is invalid');
        }

        let result = await this.teacherService.retrieveStudentsToNotice(request.teacher, request.notification);

        if (result.isSuccess) {
            let recipients = await this.studentService.findByEmails((result as SuccessResponseDto).payload, { isSuspend: false });
            if (recipients.length) {
                return ResponseHelper.successWithPayload(res, '', { recipients: recipients.map(s => s.email) });
            } else {
                return ResponseHelper.error(res, 'Not found any students to receive notification');
            }
        } else {
            return ResponseHelper.error(res, result.message);
        }
    }
}
