import { IsEmail, IsNotEmpty, IsPhoneNumber, IsUrl, Length, isNotEmpty } from "class-validator";
import { isLength } from "validator";

export class CallbackDto {
  @IsNotEmpty()
  callback_url: string;
}
  