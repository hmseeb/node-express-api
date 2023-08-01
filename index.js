import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import usersRoutes from './routes/users.js';

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use(morgan('common'));

app.use(helmet());

app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Hello, users!');
});

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
