import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDTO } from './dtos/users.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  createuser(@Body() body: UserDTO) {
    return this.appService.createUser(body);
  }
}
