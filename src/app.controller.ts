import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //用来标注方法
  getHello(): string { //function返回一个string
    return this.appService.getHello();
  }

  @Get('user:id')
  getUserById():string{
    return 'List of users'
  }
  // api/vi/users/user:id

}

//api/v1/users