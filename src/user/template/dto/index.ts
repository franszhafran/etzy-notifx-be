import { AuthenticatedDto } from "src/common/dto/authenticated";
import Pagination from "src/common/dto/pagination";
import { User } from "src/entities/user";

export interface TemplateFilterPaginated extends AuthenticatedDto, Pagination  {
  status?: string;
  user: User;
}
  