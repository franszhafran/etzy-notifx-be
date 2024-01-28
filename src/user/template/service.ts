import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user";
import { LoginDto } from "src/user/auth/dto/login.dto";
import { RegisterDto } from "src/user/auth/dto/register.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { Template, TemplateStatus } from "src/entities/template";
import { CreateTemplateDto } from "src/user/template/dto/create";
import { TemplateFilterPaginated } from "src/user/template/dto";
import { where } from "sequelize";
import { AuthenticatedDto } from "src/common/dto/authenticated";

@Injectable()
export class Service {
    constructor(
        @InjectRepository(Template)
        private repo: Repository<Template>,
    ) {}

    async index(req: TemplateFilterPaginated) {
        const whereParam = req.status ? {
            status: req.status
        } : {}

        const count = await this.repo.count({
            where: whereParam,
        });

        const data = await this.repo.find({
            where: whereParam,
            skip: (req.size) ? req.size*req.page : 0,
            take: (req.size) ? req.size : 0,
        });

        return {
            data: data,
            meta: {
                last_page: req.size ? Math.floor(count/req.size) : 0,
                total: count,
            }
        }
    }

    parseTemplateParameters(template: string) {
        const parsed: string[] = [];
        var buffer = "";
        var lookForTag = 0;
        for (var i = 0; i < template.length; i++) {
          if ((template.at(i) == "{") && lookForTag === 0) {
            lookForTag = 1;
            buffer = "";
            continue
          }
          if ((template.at(i) == "}") && lookForTag === 1) {
            parsed.push(buffer);
            lookForTag = 0;
            buffer = ""
            continue
          }
          buffer = buffer.concat(template[i]);
        }
        return parsed;
    }
    async store(req: AuthenticatedDto, body: CreateTemplateDto) {
        const parameters = this.parseTemplateParameters(body.template)
        
        await this.repo.save({
            user: req.user,
            template: body.template,
            parameters: parameters,
            status: TemplateStatus.APPROVED,
        })
        return true;
    }

    async delete(id: number) {
        this.repo.delete(id)
        return true;
    }

    async isTemplateOwnership(template_id: number, user_id: number) {
        const template = await this.repo.findOne({
            where: {
                id: template_id,
            },
            relations: {
                user: true,
            }
        });
        console.log(template)
        return template ? template.user.id === user_id : false;
    }
}
