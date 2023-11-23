import { Router } from 'express';

export const router = Router();

router.post('/users', (request, response) => {
    return response.status(200).send();
});