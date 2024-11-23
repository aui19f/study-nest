import { CreateBoardDto } from './dto/create-board.dto';
import { BoardService } from './board.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from 'src/board/board.model';
import { title } from 'process';
import { BoardStatusValidationPipe } from 'src/board/pipes/board-status-validation.pipe';
import { Board } from 'src/board/board.entity';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards();
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
  async insertBoard(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardService.createBoard(createBoardDto);
  }

  @Delete(':id')
  // @UsePipes(ValidationPipe)
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardService.deleteBoard(id);
  }
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateStatus(id, status);
  }
}
