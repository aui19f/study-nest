//entity로 이름 지정해도 상관없음

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
  updateAt: number;
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
