import { ApiProperty } from "@nestjs/swagger";
import {  IsEmail,  IsNotEmpty, IsOptional, Length, Matches } from "class-validator";
import { MESSAGES, REGEX } from "src/utils/app.utils";
import { Role } from "../entity/user.entity";

export class CreateUserDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;


  @IsNotEmpty()
  username: string;
  
  @IsNotEmpty()
  @Length(8,24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @IsOptional()
  image: string;

  @IsOptional()
  role: Role[];

  phone?:string;

  refreshToken?: string;
  address?: string;

}
