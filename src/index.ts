import dotenv from 'dotenv';
import { api } from './api';

dotenv.config();

const PORT = process.env.PORT;

api.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
