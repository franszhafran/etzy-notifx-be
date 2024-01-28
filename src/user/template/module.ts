import { Module } from '@nestjs/common';
import { Controller } from './controller';
import { Service } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from 'src/entities/template';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        Template,
    ]),
  ],
  controllers: [Controller],
  providers: [
    Service,
  ],
})
export class TemplateModule {}
