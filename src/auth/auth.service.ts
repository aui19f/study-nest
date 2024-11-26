import { Injectable, Post, Req, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCreateDto } from 'src/auth/dto/auth-create.dto';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async userAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async signup({ username, password }: AuthCreateDto): Promise<void> {
    const salt = await bcrypt.genSalt(); // 솔트값
    const hashedPw = await bcrypt.hash(password, salt);

    try {
      await this.userRepository.save(
        await this.userRepository.create({ username, password: hashedPw }),
      );
    } catch (error) {
      console.log('중복된이름');
    }
  }

  async signin({ username, password }: AuthCreateDto) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      //토큰생성 (Secret, payload)

      const payload = {
        username,
      };
      const accesstoken = await this.jwtService.sign(payload);
      return { accesstoken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
