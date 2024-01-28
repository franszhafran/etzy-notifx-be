import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/entities/user";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthenticatedDto } from "src/common/dto/authenticated";
import { CreateMessageDto } from "src/user/message/dto/create";
import { Message } from "src/entities/message";

@Injectable()
export class Service {
    constructor(
        @InjectRepository(Message)
        private repo: Repository<Message>,
    ) {}

    async store(req: AuthenticatedDto, body: CreateMessageDto) {
        return true;
    }
    
    async detail(id: number) {        
        const message = await this.repo.findOne({
            where: {
                id: id,
            }
        })
        return message;
    }

    async isMessageOwnership(template_id: number, user_id: number) {
        return true;
    }
}
