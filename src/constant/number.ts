const crypto = require('crypto');

export const generateRandomString = (length: number): string => {
    const bytes = crypto.randomBytes(length);
    return bytes.toString('hex');
  };

  export function generateRandomNumber() {
    const min = 1000000000; 
    const max = 9999999999; 
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

  const randomNum = generateRandomNumber();
  console.log(randomNum);