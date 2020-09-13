import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const User = require('./database/models/User');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());

app.get('/', (req, res) => {
  User.findAll()
    .then((users: any) => res.status(200).json({ users }))
    .catch((err: Error) => res.status(500).json({ err: ['oops', err] }));
});

app.post('/post', (req, res) => {
  User.create({
    display_name: 'tester',
    email: 'test@gmail.com',
    password: '123',
  })
    .then((user: any) => res.status(201).json({ user }))
    .catch((err: Error) => res.status(500).json({ err: ['oops', err] }));
});

export default app;
