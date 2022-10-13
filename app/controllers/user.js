import User from '../models/user';
import tokenLib from '../../lib/tokenLib';
import { error } from '../errorHandlers/customErrorList';
import CustomError from '../errorHandlers/CustomError';
import { validateData, validateCredentials } from '../services/helper';

const createUser = (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  return validateCredentials(email, password)
    .then(() => tokenLib.generatePasswordHash(password))
    .then((passwordHash) =>
      User.create({
        ...body,
        password: passwordHash,
      })
    )
    .then(validateData)
    .then(({ password: userPassword, ...user }) =>
      res.status(200).json({ user })
    )
    .catch((err) => next(err));
};

const updateUser = (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  if (!id) {
    throw new CustomError(error.BAD_REQUEST.noUser);
  }

  return validateData(body)
    .then(() => User.update(body, { where: id }))
    .then(validateData)
    .then(({ password: userPassword, ...user }) =>
      res.status(200).json({ user })
    )
    .catch((err) => next(err));
};

const deleteUser = (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  if (!id) {
    throw new CustomError(error.BAD_REQUEST.noUser);
  }

  return validateData(body)
    .then(() => User.delete(body, { where: id }))
    .then(validateData)
    .then(({ password, ...user }) => res.status(200).json({ user }))
    .catch((err) => next(err));
};

export { createUser, updateUser, deleteUser };
