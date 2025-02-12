import { HttpStatus } from "@nestjs/common";
import { BaseResponseDto } from "./base_response.dto";

export class ErrorResponseDto extends BaseResponseDto {
    constructor(message: string) {
        super(message);
    }
}