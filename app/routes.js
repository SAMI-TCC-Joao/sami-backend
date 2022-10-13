import authRoutes from './routes/auth';
import userRoutes from './routes/user';

export default (app) => {
  app.use(`/auth`, authRoutes);
  app.use(`/user`, userRoutes);
};
