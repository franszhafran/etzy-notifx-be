import { User } from "src/entities/user";

export interface AuthenticatedDto {
    user: User;
}