import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { AuthModule } from 'src/user/auth/auth.module';
import { TemplateModule } from 'src/user/template/module';
import { Template } from 'src/entities/template';
import { APIKey } from 'src/entities/api_key';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'user',
      password: 'user',
      database: 'notifx',
      entities: [User, Template, APIKey],
      logging: true,
      synchronize: true,
    }),
    AuthModule,
    TemplateModule,
],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
