import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  getAllTweets(page: number) {
    if (page < 1) {
      throw new BadRequestException();
    }
    if (page >= 1) {
      const itemsPerPage = 15;
      const endIndex = itemsPerPage * page;
      const startIndex = endIndex - itemsPerPage;
      const pagination = this.tweets.slice(startIndex, endIndex).reverse();
      const tweets = pagination.map((tweet) => ({
        username: tweet._findUser._findUsername,
        avatar: tweet._findUser._findAvatar,
        tweet: tweet._findTweet,
      }));
      return tweets;
    }
    const itemsPerPage = this.tweets.slice(-15);
    const tweets = itemsPerPage.reverse().map((tweet) => ({
      username: tweet._findUser._findUsername,
      avatar: tweet._findUser._findAvatar,
      tweet: tweet._findTweet,
    }));
    return tweets;
  }
}
