require('dotenv').config();
const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./router/routes');

const { error500 } = require('./middlewares/error');
// подключение к серверу монго
const mongoDB = 'mongodb://127.0.0.1:27017/mestodb';
mongoose.connect(mongoDB); // {
// useNewUrlParser: true,
// useCreateIndex: true,
// useUnifiedTopology: true,
// useFindAndModify: false
// });

mongoose.Promise = global.Promise;

// CORS
app.use(cors({
  origin: ['http://localhost: 3000'], // порт
  credentials: true, // куки
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DEL'],
}));

app.use(express.json()); // создает наполнение req.body

// харкорный код заменен
// app.use((req, res, next) => { // код из брифа по добавлению юзера, _id сгенерирован Монго
//  req.user = {
//    _id: '64c5612f0532fa646207d6cd',
//  };
//  next();
// });
app.use(helmet());

app.use(routes);

app.use(errors());

app.use(error500);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
