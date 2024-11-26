import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/auth/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/JwtStrategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'Secret1234', // 토큰을 만들때 이용하는 텍스트 (아무문구상관없음) secretOrKey
      signOptions: {
        expiresIn: 60 * 60, // 정해진 시간 이후에는 유효하지 않음 (60*60 은 한시간)
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], //
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
