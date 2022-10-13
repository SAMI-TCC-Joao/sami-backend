import User from '../models/user';
import tokenLib from '../../lib/tokenLib';
import { error } from '../errorHandlers/customErrorList';
import CustomError from '../errorHandlers/CustomError';
import { validateData } from '../services/auth';

const login = (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  return validateData(email)
    .then(() => validateData(password))
    .then(() =>
      User.findOne({
        where: {
          email: email.toLowerCase(),
        },
      })
    )
    .then(validateData)
    .then((user) =>
      tokenLib.verifyPassword(password, user.password).then((isValid) => {
        if (isValid) return user;
        throw new CustomError(error.BAD_REQUEST.invalidCredentials);
      })
    )
    .then((user) => {
      const token = tokenLib.generateToken(user);
      return User.update({ ...user, token }, { where: { email: user.email } })
    })
    .then(({password, ...user}) => res.status(200).json({ user }))
    .catch(err => next(err));
};

const logout = (req, res) => {
  const { body } = req;
  const { email } = body;

  return validateData(email)
    .then(() =>
      User.findOne({
        where: {
          email: email.toLowerCase(),
        },
      })
    )
    .then((user) =>
      User.update({ ...user, token: '' }, { where: { email: user.email } })
    )
    .then((user) => res.json({ logout: !!user }));
};

export { login, logout };
