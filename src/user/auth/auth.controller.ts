import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/user/auth/dto/login.dto';
import { RegisterDto } from 'src/user/auth/dto/register.dto';
import BaseController from 'src/common/controller/base.controller';
import { Public } from 'src/common/guard/public.guard';
import { AuthenticatedDto } from 'src/common/dto/authenticated';
import { CallbackDto } from 'src/user/auth/dto/callback.dto';

@Controller('')
export class AuthController extends BaseController {
  constructor(private readonly service: AuthService) {
    super()
  }

  @Public()
  @Post('/login')
  async login(@Body() req: LoginDto) {
    const token = await this.service.login(req);
    return this.sendData({token: token})
  }

  @Post('/register')
  @Public()
  async register(@Body() req: RegisterDto) {
    await this.service.register(req);
    return this.sendOK(201);
  }

  @Get('/api-key')
  async apiKey(@Req() req: AuthenticatedDto) {
    const data = await this.service.apiKey(req.user);
    return this.sendData(data)
  }

  @Post('/api-key/callback-url')
  async updateCallback(@Req() req: AuthenticatedDto, @Body() body: CallbackDto) {
    await this.service.updateCallback(req.user, body);
    return this.sendOK()
  }

  @Post('/api-key/webhook-test')
  async testWebhook(@Req() req: AuthenticatedDto) {
    const data = await this.service.testWebhook(req.user);
    return this.sendData(data);
  }

  @Post('/mock-ok')
  @Public()
  @HttpCode(200)
  async mockOK() {
    return this.sendOK(200);
  }
}
