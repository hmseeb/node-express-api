import express from 'express';
import {
  createUser,
  deleteUser,
  findUser,
  getUsers,
  updateUser,
} from '../controllers/users.js';

import { ensurePermissions } from '../api/users.js';

const router = express.Router();
// all routes in here are staring with /users
router.get('/', getUsers);

router.post('/', ensurePermissions, createUser);

router.get('/:id', ensurePermissions, findUser);

router.patch('/:id', ensurePermissions, updateUser);

router.delete('/:id', ensurePermissions, deleteUser);

export default router;
