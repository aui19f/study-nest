import { CreateBoardDto } from './dto/create-board.dto';
import { BoardService } from './board.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board, BoardStatus } from 'src/board/board.model';
import { title } from 'process';
import { BoardStatusValidationPipe } from 'src/board/pipes/board-status-validation.pipe';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  getAllBaords(): Board[] {
    return this.boardService.getAllBaords();
  }

  @Get(':id')
  getBoard(@Param('id') id: string): Board {
    return this.boardService.getBoard(id);
  }

  @Post()
  // insertBoard(
  //   @Body('title') title: string,
  //   @Body('discrition') discrition: string,
  // ):
  insertBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardService.createBoard(createBoardDto);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  deleteBaord(@Param('id') id: string) {
    return this.boardService.deleteBoard(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardService.updateStatus(id, status);
  }
}
