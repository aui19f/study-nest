import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from 'src/board/board.controller';
import { BoardService } from 'src/board/board.service';
import { Board } from 'src/board/board.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Board]), AuthModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
