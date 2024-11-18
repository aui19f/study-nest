import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from 'src/board/board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any, metadata: ArgumentMetadata) {
    const word = value.toUpperCase().replace(/ /gi, '');
    if (!this.StatusOptions.includes(word)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }
    // console.log('value', value); //수정하려는 값
    // console.log('metadata', metadata);
    return value;
  }
}
