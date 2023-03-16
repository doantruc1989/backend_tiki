import { IsNotEmpty } from "class-validator";



export class ForgetPwdDto {
    @IsNotEmpty() email: string;
}