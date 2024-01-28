import { IsNotEmpty } from "class-validator";
import { AuthenticatedDto } from "src/common/dto/authenticated";
import { User } from "src/entities/user";

export class CreateMessageDto {
  @IsNotEmpty()
  template_id: number;

  parameters: Record<string, string>;

  @IsNotEmpty()
  recipient: string;
}
  