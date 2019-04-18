let express = require('express');
let router = express.Router();
let request = require('request');


router.get('/', function (req, res) {
    res.render('index');
  })
  
router.post('/', function (req, res) {
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
          let jokeText = `Joke: ${joke.value.joke}  Category: ${joke.value.categories}`;
         // let category = `Category: ${joke.value.categories}`;
          res.render('index', {joke: jokeText, error: null});
        }
      } });
    
  });

module.exports = router;