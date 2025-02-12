import { Response } from 'express';
import { HttpStatus } from "@nestjs/common";
import { ErrorResponseDto } from "../dtos/error_response.dto";
import { SuccessResponseDto } from "../dtos/success_response.dto";

export class ResponseHelper {
    static success(res: Response, message?: string) {
        return ResponseHelper.successWithPayload(res, message, null);
    }

    static successWithPayload(res: Response, message?: string, payload?: any) {
        return ResponseHelper.successWithPayloadAndStatus(res, message, HttpStatus.OK, payload);
    }

    static successWithStatus(res: Response, statusCode?: HttpStatus) {
        if (statusCode === HttpStatus.NO_CONTENT) {
            return res.status(HttpStatus.NO_CONTENT).send();
        }
        return res.status(statusCode).json({});
    }

    static successWithPayloadAndStatus(res: Response, message?: string, statusCode?: HttpStatus, payload?: any) {
        return res.status(statusCode).json(new SuccessResponseDto(message, payload));
    }

    static error(res: Response, message?: string) {
        return ResponseHelper.errorWithStatus(res, message, HttpStatus.BAD_REQUEST);
    }

    static errorWithStatus(res: Response, message?: string, status?: HttpStatus) {
        return res.status(status).json(new ErrorResponseDto(message));
    }
}