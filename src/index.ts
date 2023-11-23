import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

const PORT = process.env.API_PORT;

app.listen(PORT, () => {
  console.log(`Server runing in ${PORT} 🚀`);
});
