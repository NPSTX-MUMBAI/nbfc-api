

import * as admin from 'firebase-admin';
import * as serviceAccount from './google.service.json'; 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;

