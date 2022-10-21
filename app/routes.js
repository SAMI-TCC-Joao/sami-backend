import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import basicRoutes from './routes/basicRoutes';

export default (app) => {
  app.use(`/auth`, authRoutes);
  app.use(`/user`, userRoutes);
  app.use(`/:parseModel`, basicRoutes);
};
