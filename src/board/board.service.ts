import { CreateBoardDto } from './dto/create-board.dto';
import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from 'src/board/board.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardService {
  // private를 사용하는 이유는 다른 컴포넌트에서 접근을 방지
  private boards: Board[] = [];

  getAllBaords(): Board[] {
    return this.boards;
  }

  getBoard(id: string) {
    const found = this.boards.find((x) => x.id === id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;
    const board = {
      id: uuid(),
      title,
      description,
      updateAt: new Date().getTime(),
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  deleteBoard(id) {
    const board = this.getBoard(id);
    this.boards = this.boards.filter((x) => x.id !== id);
    return board;
  }

  updateStatus(id: string, status: BoardStatus) {
    const board = this.getBoard(id);
    board.status = status;

    this.boards = this.boards.map((x) => {
      if (x.id === id) {
        x = board;
      }
      return x;
    });
    return board;
  }

  udpateBoard() {}
}
