import authRoutes from './routes/auth';

export default (app) => {
  app.use(`/auth`, authRoutes);
};
