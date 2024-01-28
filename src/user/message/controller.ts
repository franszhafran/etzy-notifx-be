import { Body, Controller as NestController, Get, HttpCode, Post, Query, Delete, Param, Req, UnauthorizedException } from '@nestjs/common';
import { Service } from './service';
import BaseController from 'src/common/controller/base.controller';
import { TemplateFilterPaginated } from 'src/user/template/dto';
import { AuthenticatedDto } from 'src/common/dto/authenticated';
import { CreateMessageDto } from 'src/user/message/dto/create';

@NestController('/client/template')
export class Controller extends BaseController {
  constructor(private readonly service: Service) {
    super()
  }

  @Get('/:id')
  async detail(@Req() req: AuthenticatedDto, @Param('id') id: number) {
    if(!(await this.service.isMessageOwnership(id, id))) {
      throw new UnauthorizedException();
    }
    const data = await this.service.detail(id);
    return this.sendData(data);
  }

  @Post('/')
  async store(@Req() req: AuthenticatedDto, @Body() body: CreateMessageDto) {
    const token = await this.service.store(req, body);
    return this.sendOK()
  }
}
