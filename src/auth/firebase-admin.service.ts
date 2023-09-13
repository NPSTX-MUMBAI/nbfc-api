import * as admin from 'firebase-admin';
import * as serviceAccount from './google.service.json'; // Replace with your service account key file path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;