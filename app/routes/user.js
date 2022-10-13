import express from 'express';
import { createUser, updateUser, deleteUser } from '../controllers/user';

const router = express.Router();

router.post('/', createUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

export default router;
