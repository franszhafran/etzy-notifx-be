import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user";
import { LoginDto } from "src/user/auth/dto/login.dto";
import { RegisterDto } from "src/user/auth/dto/register.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { APIKey } from "src/entities/api_key";
import randomString from "src/common/utils/rand_string";
import { AuthenticatedDto } from "src/common/dto/authenticated";
import { CallbackDto } from "src/user/auth/dto/callback.dto";
import { ValidationError } from "class-validator";
import axios from "axios";
import { Md5 } from "ts-md5";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private repo: Repository<User>,
        @InjectRepository(APIKey)
        private apiKeyRepo: Repository<APIKey>,
        private jwtService: JwtService,
    ) {}

    async login(req: LoginDto) {
        const user = await this.repo.findOne({
            where: {
                email: req.email
            }
        });
        const payload = { sub: user.id,  };
        return await this.jwtService.signAsync(payload);
    }

    async register(req: RegisterDto) {
        const api_key = new APIKey();
        
        const user = await this.repo.save({
            name: req.name,
            email: req.email,
            password: req.password,
            phone: req.phone,
            api_key: api_key.build(randomString(16), randomString(32))
        });

        return user;
    }


    async apiKey(user: User) {
        const u = await this.repo.findOne({
            where: {
                id: user.id,
            },
            relations: {
                api_key: true,
            }
        })
        return {
            secret: u.api_key.secret,
            key: u.api_key.key,
            callback_url: u.api_key.callback_url,
        };
    }

    async updateCallback(user: User, body: CallbackDto) {
        const apiKey = await this.apiKeyRepo.findOneOrFail({
            where: {
                user: user,
            }
        });
        apiKey.callback_url = body.callback_url;
        await this.apiKeyRepo.save(apiKey)
    }

    async testWebhook(user: User) {
        const apiKey = await this.apiKeyRepo.findOneOrFail({
            where: {
                user: user,
            }
        });
        if(apiKey?.callback_url !== "") {
            const eventDate = new Date();
            const message = "Your OTP is 149-500. Please do not share to anyone."
            const testData = {
                template_id: 1,
                message: message,
                status: "success",
                latest_event: eventDate.getUTCMilliseconds(),
                signature: Md5.hashStr(apiKey?.id + apiKey?.secret + apiKey?.callback_url + message + ('' + eventDate.getUTCMilliseconds())),
                signature_raw: apiKey?.id + apiKey?.secret + apiKey?.callback_url + message + ('' + eventDate.getUTCMilliseconds())
            }

            const resp = await axios.post(apiKey.callback_url, testData)
            return {
                code: resp.status,
                data: testData,
            }
        }
    }
}
