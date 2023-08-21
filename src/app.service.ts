import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserDTO } from './dtos/users.dto';

@Injectable()
export class AppService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  getHello(): string {
    return 'Hello World!';
  }

  createUser(body: UserDTO) {
    const { username, avatar } = body;
    this.users.push(new User(username, avatar));
  }
}
