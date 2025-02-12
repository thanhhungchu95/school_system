import { HttpStatus } from "@nestjs/common";

export class BaseResponseDto {
    message: string;
    isSuccess: boolean;

    constructor(message: string) {
        this.message = message;
        this.isSuccess = false;
    }
}