import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserDTO } from './dtos/users.dto';
import { TweetDTO } from './dtos/tweets.dto';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getHealth(): string {
    return "I'm okay!";
  }

  createUser(body: UserDTO) {
    const { username, avatar } = body;
    this.users.push(new User(username, avatar));
  }

  createTweet(body: TweetDTO) {
    const { username, tweet } = body;
    const user = this.users.find((user) => user._findUsername === username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.tweets.push(new Tweet(user, tweet));
  }
}
