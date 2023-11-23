import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.API_PORT;

app.listen(PORT, () => {
  console.log(`Server runing in ${PORT} 🚀`);
});
