import models from '../model';
import { error } from '../errorHandlers/customErrorList';
import CustomError from '../errorHandlers/CustomError';

const { Session } = models;

const validateData = async (data) => {
  if (!data) {
    throw new CustomError(error.BAD_REQUEST.invalidCredentials);
  }

  return data;
};

const validateResetPassword = ({ newPassword, confirmNewPassword }) => {
  if (!newPassword || !confirmNewPassword) {
    throw new CustomError(error.BAD_REQUEST.noNewPassword);
  }

  if (newPassword !== confirmNewPassword) {
    throw new CustomError(error.BAD_REQUEST.noPasswordMatch);
  }
};

const controlUserSessions = (user) =>
  Session.findAll({
    where: { userId: user?.id },
    order: [['createdAt', 'ASC']],
  }).then((sessions) => {
    if (sessions.length >= 6) {
      const [oldestSession] = sessions;
      oldestSession.destroy();
    }

    return user;
  });

const emailResetPassword = (user) => {
  if (!user || !user.email) {
    throw new CustomError(error.BAD_REQUEST.noUser);
  }

  return {
    recipients: [
      {
        email: user.email,
        name: user.name,
      },
    ],
    variables: {
      title: 'Alteração de senha',
      address: process.env.ADDRESS,
      customer_name: user.name,
      expiration: 48,
      password_url: `${process.env.PLATFORM_URL}/login/alterar-senha?token=${user.passwordToken}`,
    },
  };
};

export {
  validateData,
  validateResetPassword,
  emailResetPassword,
  controlUserSessions,
};
