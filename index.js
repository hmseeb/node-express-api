import bodyParser from 'body-parser';
import express from 'express';

import usersRoutes from './routes/users.js';

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Homepage');
});

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
