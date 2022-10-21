import cors from 'cors';

const origin = process.env.CURRENT_ENV === 'local' ? [/localhost/] : [/sami-frontend/];

export default (app) => {
  app.options(
    '*',
    cors({
      origin,
      credentials: true,
    })
  );
  app.use(
    cors({
      origin,
      credentials: true,
    })
  );
};
