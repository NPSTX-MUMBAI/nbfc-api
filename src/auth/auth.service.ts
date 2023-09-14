import { Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

import admin from './firebase-admin.service';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }


  async sendNotificationToDevice(token: string, title: string, body:any) {
    const message = {
      notification: {
        title,
        body,
      },
      token,
    };

    try {
      const response = await admin.messaging().send(message);
      Logger.log('Successfully sent notification:' + response, 'authService');
    } catch (error) {
      console.error('Error sending notification:' + error, 'authService');
    }
  }
  
}
