const crypto = require('crypto');

export const generateRandomString = (length: number): string => {
    const bytes = crypto.randomBytes(length);
    return bytes.toString('hex');
  };