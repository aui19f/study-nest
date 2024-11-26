import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';

import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
