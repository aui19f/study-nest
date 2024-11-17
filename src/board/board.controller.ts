import { BoardService } from './board.service';
import { Controller } from '@nestjs/common';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}
}
