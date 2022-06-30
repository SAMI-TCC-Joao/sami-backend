import models from '../model';
import tokenLib from '../tokenLib';
import { error } from '../errorHandlers/customErrorList';
import CustomError from '../errorHandlers/CustomError';
import helper from '../../lib/helper';
import {
  validateData,
  validateResetPassword,
  controlUserSessions,
} from '../services/auth';

const { User } = models;

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
    .then(controlUserSessions)
    .then((user) => {
      req.session.user = helper.prepareSession(user);
      return user;
    })
    .then((user) => user.update(user))
    .then((user) => res.status(200).json({ user }))
    .catch(next);
};

const changePassword = (req, res, next) => {
  const { params, body } = req;
  const { idUser: paramIdUser } = params;
  const {
    password,
    newPassword,
    confirmNewPassword,
    lastModifiedBy,
    skipPasswordValidation,
    userId,
  } = body;
  const idUser = skipPasswordValidation ? userId : paramIdUser;

  return validateData(idUser)
    .then(() => validateResetPassword({ newPassword, confirmNewPassword }))
    .then(() => User.findOne({ where: { id: idUser } }))
    .then(validateData)
    .then((user) =>
      skipPasswordValidation
        ? user
        : tokenLib.verifyPassword(password, user.password).then((isValid) => {
            if (isValid) return user;
            throw new CustomError(error.BAD_REQUEST.invalidCredentials);
          })
    )
    .then((user) => {
      return user.update({ password: newPassword, lastModifiedBy });
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(next);
};

const forgetPassword = (req, res, next) => {
  const {
    body: { email },
  } = req;

  return validateData(email)
    .then(() => res.status(200).json(true))
    .catch(next);
};

const resetPassword = (req, res, next) => {
  const { body } = req;
  const { token: passwordToken, newPassword, confirmNewPassword } = body;

  return validateData(passwordToken)
    .then(() => validateResetPassword({ newPassword, confirmNewPassword }))
    .then(() =>
      User.findOne({
        where: {
          passwordToken,
          isActive: true,
        },
      })
    )
    .then(validateData)
    .then((user) => user.update({ password: newPassword, passwordToken: null }))
    .then((data) => res.status(200).json(data))
    .catch(next);
};

const logout = (req, res) => {
  req.session.user = null;
  req.session.deviceInfo = null;
  req.session.destroy();
  return res.json({ logout: true });
};

export { login, logout, forgetPassword, resetPassword, changePassword };
