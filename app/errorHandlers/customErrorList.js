import locale from './en.json' assert {type: "json"};

const error = {};

const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;

error.NOT_FOUND = {
  userNotFound: {
    statusCode: NOT_FOUND,
    code: 'NF-00001',
    message: locale.userNotFound,
  },
  pageNotFound: {
    statusCode: NOT_FOUND,
    code: 'NF-00002',
    message: locale.pageNotFound,
  },
};

error.BAD_REQUEST = {
  invalidCredentials: {
    statusCode: BAD_REQUEST,
    code: 'BR-00001',
    message: locale.invalidCredentials
  }
};

error.UNAUTHORIZED = {
  notAuthorized: {
    statusCode: UNAUTHORIZED,
    code: 'UA-00001',
    message: locale.notAuthorized,
  },
  tokenExpired: {
    statusCode: UNAUTHORIZED,
    code: 'UA-00002',
    message: locale.tokenExpired,
  },
  invalidToken: {
    statusCode: UNAUTHORIZED,
    code: 'REF-00003',
    message: locale.invalidToken,
  },
};

export {
  error,
  NOT_FOUND,
  UNAUTHORIZED
};
