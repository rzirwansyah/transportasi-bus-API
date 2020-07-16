import express from 'express';

import { createUser, signInUser, searchFirstnameOrLastname } from '../controllers/usersController';

const router = express.Router();

router.post('/auth/signup', createUser);
router.post('/auth/signin', signInUser);
router.get('/users/first_name', searchFirstnameOrLastname);

export default router;