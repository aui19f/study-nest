import { User } from 'src/auth/user.entity';
import { BoardStatus } from 'src/board/board.model';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamptz' })
  updateAt?: Date;

  @Column()
  status: BoardStatus;

  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;
}
