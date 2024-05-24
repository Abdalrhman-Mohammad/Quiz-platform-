const express = require('express');

const app = express();

const morgan = require('morgan');

const bodyParser = require('body-parser');

const userRoutes = require('./api/routes/user');
var userApi = require('./modules/users/routes/user_routes')
var quizzesApi = require('./modules/quizzes/routes/quiz_routes')
var quizApi = require('./modules/quiz/routes/quiz_routes')
app.use(morgan('dev'));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }



  next();
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/', userApi);
app.use('/user', userRoutes);
app.use('/quizzes', quizzesApi);
app.use('/quiz', quizApi);

app.use((req, res, next) => {
  const error = new Error('Page not found!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({error: {message: error.message}});
})
module.exports = app;