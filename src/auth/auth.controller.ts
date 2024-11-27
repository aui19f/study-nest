import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCreateDto } from 'src/auth/dto/auth-create.dto';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('all')
  getUserAll(): Promise<User[]> {
    return this.authService.userAll();
  }

  @Post('/signup')
  signup(@Body(ValidationPipe) authCreateDto: AuthCreateDto): Promise<void> {
    return this.authService.signup(authCreateDto);
  }
  //ValidationPipe - 다시 공부

  @Post('/signin')
  signin(
    @Body() authCreateDto: AuthCreateDto,
  ): Promise<{ accesstoken: string }> {
    return this.authService.signin(authCreateDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  // authTest(@Req() req) {
  authTest(@GetUser() user: User) {
    console.log(user);
  }

  // req.user 가 아닌, user라는 파라미터로 가져올수 있는 방법->커스텀
}
