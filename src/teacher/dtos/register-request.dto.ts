import { BaseRequestDto } from "../../common/dtos/base_request.dto";

export class RegisterRequestDto extends BaseRequestDto {
    teacher: string;
    students: string[];
}