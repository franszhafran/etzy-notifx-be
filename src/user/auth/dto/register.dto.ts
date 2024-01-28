import { IsEmail, IsNotEmpty, IsPhoneNumber, Length, isNotEmpty } from "class-validator";
import { isLength } from "validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;
}
  