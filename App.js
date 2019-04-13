const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json()); // 바디부분을 JSON으로 뿌려줌

//Start On Server
const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log(`Server Listening st ${PORT}`);