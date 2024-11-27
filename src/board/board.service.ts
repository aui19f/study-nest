import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from 'src/board/board.model';
import { v1 as uuid } from 'uuid';

import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/board/board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: BoardRepository,
  ) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getMyBoards(user) {
    return await this.boardRepository.find({ where: { id: user.id } });
  }

  async getBoard(id: number): Promise<Board> {
    const found = this.boardRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }
  //
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const boardData = {
      title,
      description,
      updateAt: new Date(),
      status: BoardStatus.PUBLIC,
      user,
    };

    console.log('boardData', boardData);

    return await this.boardRepository.save(
      await this.boardRepository.create({ ...boardData }),
    );
  }

  async deleteBoard(id, user) {
    // const board = this.getBoard(id);
    const result = await this.boardRepository.delete({ id, user });
    if (result.affected === 0) {
      // throw
    }
  }

  async updateStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoard(id);
    if (board) {
      board.status = status;
      await this.boardRepository.save(board);
    }
    return board;
  }
}
