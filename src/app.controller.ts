import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDTO } from './dtos/users.dto';
import { TweetDTO } from './dtos/tweets.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }
  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  createuser(@Body() body: UserDTO) {
    return this.appService.createUser(body);
  }

  @Post('/tweets')
  createTweet(@Body() body: TweetDTO) {
    return this.appService.createTweet(body);
  }

  @Get('/tweets')
  getAllTweets(@Query('page') page: number) {
    return this.appService.getAllTweets(page);
  }

  @Get('/tweets/:username')
  getTweetsByUser(@Param('username') username: string) {
    return this.appService.getTweetsByUser(username);
  }
}
