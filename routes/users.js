import express from 'express';
import {
  createUser,
  deleteUser,
  findUser,
  getUsers,
  updateUser,
} from '../controllers/users.js';

const router = express.Router();
// all routes in here are staring with /users
router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', findUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
