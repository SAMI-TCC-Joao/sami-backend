export default (app) => {
  app.use((e, req, res,next) => {
    const {name, message,  code, statusCode } = e;

    if(name === 'CustomError') {
        return res.status(statusCode).json({ message, code, logout: true });
    }

    return next();
  });
};