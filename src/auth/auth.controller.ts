import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    Logger.log('hii');
    return this.authService.create(createAuthDto);
  }

  @Post('test')
  create2(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }



  @Post('send')
  sendNotification(@Body() token: string, title: string, body: string) {
    return this.authService.sendNotificationToDevice(token,title,body);
  }


  // @Post('send')
  // async sendNotification(
  //   @Body('token') token: string,
  //   @Body('title') title: string,
  //   @Body('body') body: string,
  // ) {
  //   await this.authService.sendNotificationToDevice(token, title, body);
  //   return { success: true, message: 'Notification sent successfully' };
  // }
 
}
