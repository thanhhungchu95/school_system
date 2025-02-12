import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { StudentService } from './student.service';
import { ResponseHelper } from 'src/common/helpers/response_helper';
import { SuspendRequest as SuspendStudentRequest } from './dtos/suspend-request.dto';
import { Response } from 'express';
import { RemoveStudentRequestDto } from './dtos/remove-student-request.dto';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Post('suspend')
    async suspend(@Body() request: SuspendStudentRequest, @Res() res: Response) {
        if (~~request?.student?.length === 0) {
            return ResponseHelper.error(res, 'Parameter is not valid');
        }

        let student = this.studentService.findByEmail(request.student);
        if (!student) {
            return ResponseHelper.errorWithStatus(res, 'Student is not existed', HttpStatus.NOT_FOUND);
        }

        let result = await this.studentService.suspend(request.student);
        if (result.isSuccess) {
            return ResponseHelper.successWithStatus(res, HttpStatus.NO_CONTENT);
        } else {
            return ResponseHelper.error(res, result.message);
        }
    }

    @Post('remove')
    async removeStudent(@Body() request: RemoveStudentRequestDto, @Res() res: Response) {
        if (~~request?.email?.length === 0) {
            return ResponseHelper.error(res, 'Parameter is not valid');
        }

        let result = await this.studentService.removeStudent(request.email);
        if (result.isSuccess) {
            return ResponseHelper.successWithStatus(res, HttpStatus.NO_CONTENT);
        } else {
            return ResponseHelper.error(res, result.message);
        }
    }
}
