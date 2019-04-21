let express = require('express');
let bodyParser = require('body-parser');
let request = require('request');
let app = express();
let jokeresponse = require('./jokeresponse');
let router = express.Router();

app.use('/', jokeresponse);
app.use(bodyParser.urlencoded({ extended: true }));



app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
  });

app.post("/", (req, res) => {
    let url = 'http://api.icndb.com/jokes/random?escape=javascript';
    request(url, function (err, resp, body) {
      if(err){
        res.render('index', {joke: null, error: 'Error!'});
      } else {
        let joke = JSON.parse(body);
        console.log(joke);
        if(joke == undefined){
          res.render('index', {joke: null, error: 'Error!'});
        } else {
          let jokeText = `Joke: ${joke.value.joke}`;
          res.render('index', {joke: jokeText, error: null});
        }
      } });
});



module.exports = router;

app.listen(3000, () => console.log('Server ready'))

