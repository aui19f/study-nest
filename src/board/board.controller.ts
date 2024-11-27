import { CreateBoardDto } from './dto/create-board.dto';
import { BoardService } from './board.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from 'src/board/board.model';
import { title } from 'process';
import { BoardStatusValidationPipe } from 'src/board/pipes/board-status-validation.pipe';
import { Board } from 'src/board/board.entity';

import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  constructor(private boardService: BoardService) {}

  private logger = new Logger('BoardController');

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  @Get('myboard')
  getMyBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all board`);
    return this.boardService.getMyBoards(user);
  }

  @Get(':id')
  async getBoard(@Param('id') id: string): Promise<Board> {
    return this.boardService.getBoard(+id);
  }

  @Post()
  // insertBoard(
  //   @Body('title') title: string,
  //   @Body('discrition') discrition: string,
  // ):
  @UsePipes(ValidationPipe)
  async insertBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ) {
    console.log('[[user]]', user);
    return await this.boardService.createBoard(createBoardDto, user);
  }

  @Delete(':id')
  // @UsePipes(ValidationPipe)
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.deleteBoard(id, user);
  }
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateStatus(id, status);
  }
}
