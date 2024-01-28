import { Body, Controller as NestController, Get, HttpCode, Post, Query, Delete, Param, Req, UnauthorizedException } from '@nestjs/common';
import { Service } from './service';
import BaseController from 'src/common/controller/base.controller';
import { CreateTemplateDto } from 'src/user/template/dto/create';
import { TemplateFilterPaginated } from 'src/user/template/dto';
import { AuthenticatedDto } from 'src/common/dto/authenticated';

@NestController('/client/template')
export class Controller extends BaseController {
  constructor(private readonly service: Service) {
    super()
  }

  @Get('/')
  async index(@Query() query: TemplateFilterPaginated) {
    const { data, meta } = await this.service.index(query);
    return this.sendData(data, meta);
  }

  @Post('/')
  async store(@Req() req: AuthenticatedDto, @Body() body: CreateTemplateDto) {
    const token = await this.service.store(req, body);
    return this.sendOK()
  }

  @Delete('/:id')
  async delete(@Param('id') id: number, @Req() req: AuthenticatedDto ) {
    console.log(id)
    console.log(req.user.id)
    if(!(await this.service.isTemplateOwnership(id, req.user?.id))) {
      throw new UnauthorizedException();
    }
    await this.service.delete(id);
    return this.sendOK();
  }
}
