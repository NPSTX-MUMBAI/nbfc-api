import * as admin from 'firebase-admin';
import * as serviceAccount from './google.service.json'; // Replace with your service account key file path
import { Logger } from '@nestjs/common';

const move = () => {
  return serviceAccount
}

Logger.log(move());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;