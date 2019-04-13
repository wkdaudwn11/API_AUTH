const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const usersRouter = require('./routers/usersRouter');

const app = express();
const db = require('./config/key').mongoURI;


mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log('MongoDb Connected...'))
    .catch(err => console.log(err));

mongoose.Promise = global.Promise; //  안해도 상관없는데 에러나서 걍 추가함
mongoose.set('useCreateIndex', true);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json()); // 바디부분을 JSON으로 뿌려줌

//Routes
app.use('/users', usersRouter);

//Start On Server
const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log(`Server Listening st ${PORT}`);