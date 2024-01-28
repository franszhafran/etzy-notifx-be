import { AuthenticatedDto } from "src/common/dto/authenticated";
import { User } from "src/entities/user";

export interface CreateTemplateDto extends AuthenticatedDto {
  template: string;
}
  