let express = require('express');
let bodyParser = require('body-parser');
let request = require('request');
let app = express();
let jokeresponse = require('./jokeresponse');

app.use('/', jokeresponse);
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.listen(3000, () => console.log('Server ready'))

