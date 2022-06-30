import express from 'express';
import models from '../model';
import {
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  logout,
} from '../controllers/auth';

const router = express.Router();

router.get('/me', (req, res) => {
  return models.User.findByPk(req.session?.user?.id).then((user) => {
    res.status(200).json({ user });
  });
});
router.post('/login', login);
router.get('/logout', logout);
router.put('/forget-password', forgetPassword);
router.put('/reset-password', resetPassword);
router.put('/:idUser', changePassword);

export default router;
