import { Module } from '@nestjs/common';
import { Controller } from './controller';
import { Service } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from 'src/entities/template';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { User } from 'src/entities/user';
import { Message } from 'src/entities/message';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Template,
      User,
      Message,
    ]),
  ],
  controllers: [Controller],
  providers: [
    Service,
  ],
})
export class TemplateModule {}
