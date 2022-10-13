import models from '../model';
import { error } from '../errorHandlers/customErrorList';
import CustomError from '../errorHandlers/CustomError';
import { validateData } from '../services/helper';

const getAll = (req, res, next) => {
  const {
    query = {},
    params: { parseModel },
  } = req;
  const { [parseModel]: model } = models;

  if (!model) {
    return res.json({});
  }

  return model
    .findAndCountAll(query)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

const getById = (req, res, next) => {
  const {
    query = {},
    params: { parseModel, id },
  } = req;
  const { [parseModel]: model } = models;

  if (!model) {
    return res.json({});
  }

  if (!id) {
    throw new CustomError(error.BAD_REQUEST.noData);
  }

  return model
    .findByPk(id, query)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

const create = (req, res, next) => {
  const {
    body,
    query = {},
    params: { parseModel },
  } = req;
  const { [parseModel]: model } = models;

  return validateData(body)
    .then(() => model.create(body, query))
    .then(validateData)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

const update = (req, res, next) => {
  const {
    body,
    params: { parseModel, id },
  } = req;
  const { [parseModel]: model } = models;

  if (!id) {
    throw new CustomError(error.BAD_REQUEST.noData);
  }

  return validateData(body)
    .then(() => model.update(body, { where: id }))
    .then(validateData)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

const remove = (req, res, next) => {
  const {
    body,
    params: { parseModel, id },
  } = req;
  const { [parseModel]: model } = models;

  if (!id) {
    throw new CustomError(error.BAD_REQUEST.noData);
  }

  return validateData(body)
    .then(() => model.delete(body, { where: id }))
    .then(validateData)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

export { getAll, getById, create, update, remove };
