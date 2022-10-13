import cors from 'cors';

const origin = [/localhost/];

export default app => {
    app.options(
        '*',
        cors({
          origin,
          credentials: true
        })
      );
      app.use(
        cors({
          origin,
          credentials: true
        }))
}