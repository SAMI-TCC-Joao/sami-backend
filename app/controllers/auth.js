import models from '../model';
import tokenLib from '../../lib/tokenLib';
import { error } from '../errorHandlers/customErrorList';
import CustomError from '../errorHandlers/CustomError';
import { validateData, validateCredentials } from '../services/helper';

const { User } = models;

const login = (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  return validateCredentials(email, password)
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
      return User.update({ ...user, token }, { where: { id: user.id } });
    })
    .then(({ password: userPassword, ...user }) =>
      res.status(200).json({ user })
    )
    .catch(next);
};

const logout = (req, res, next) => {
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
    .then((user) => res.json({ logout: !!user }))
    .catch(next);
};

export { login, logout };
