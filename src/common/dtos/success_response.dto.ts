import { HttpStatus } from "@nestjs/common";
import { BaseResponseDto } from "./base_response.dto";

export class SuccessResponseDto extends BaseResponseDto {
    payload: any;

    constructor(message?: string, payload?: any) {
        super(message);
        this.isSuccess = true;
        this.payload = payload;
    }   
}