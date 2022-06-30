import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
app.use(bodyParser.json({ limit: '2mb' }));
routes(app);

export default app;
