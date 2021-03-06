import * as dotenv from 'dotenv';
dotenv.config();

const publicKey = process.env.PUBLIC_KEY;
const secretKey = process.env.SECRET_KEY;

export { publicKey, secretKey };
