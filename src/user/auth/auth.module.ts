import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { APIKey } from 'src/entities/api_key';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        User,
        APIKey,
    ]),
    JwtModule.register({
        global: true,
        secret: 'rahasia',
        signOptions: { expiresIn: '900s' },
    }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
    ],  
})
export class AuthModule {}
