let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let Profile = require('./models/profile');
let cors = require('cors');
let mongoose = require('mongoose');

let request = require('request');
let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//let jokeresponse = require('./jokeresponse');

mongoose.connect('mongodb://localhost:27017/profile', {useNewUrlParser: true}, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    }
});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});


//app.use('/', jokeresponse);
//app.use('/', router);

app.set('view engine', 'ejs');

router.route('/profile').get((req, res) => {
    Profile.find((err, profile) => {
        if (err)
            console.log(err);
        else
            res.json(profile);
    });
});

router.route('/profile/:id').get((req, res) => {
    Profile.findById(req.params.id, (err, profile) => {
        if (err)
            console.log(err);
        else
            res.json(profile);
    })
});

router.route('/profile/add').post((req, res) => {
    let profile = new Profile({first_name : req.body.first_name, last_name: req.body.last_name, favorite_category : req.body.favorite_category})
    profile.save()
        .then(profile => {
            res.status(200).json({'profile': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});
router.route('/profile/update/:id').post((req, res) => {
    Profile.findById(req.params.id, (err, profile) => {
        if (!profile)
            return next(new Error('Could not load Document'));
        else {
            profile.first_name = req.body.first_name;
            profile.last_name = req.body.last_name;
            profile.favorite_category = req.body.favorite_category;
            profile.save().then(profile => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/profile/delete/:id').get((req, res) => {
    Profile.findByIdAndRemove({_id: req.params.id}, (err, profile) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

//router.get('/', function (req, res) {
  //  res.render('index');
 // })
  
//router.post('/joke', function (req, res) {
router.route('/').get((req, res) => {
    console.log('hey!')
    let url = 'http://api.icndb.com/jokes/random?escape=javascript';
    request(url, function (err, resp, body) {
      if(err){
        res.render({joke: null, error: 'Error!'});
      } else {
        let joke = JSON.parse(body);
        console.log(joke);
        if(joke == undefined){
          res.render({joke, joke: null, error: 'Error!'});
        } else {
          let jokeText = `Joke: ${joke.value.joke}  Category: ${joke.value.categories}`;
         // let category = `Category: ${joke.value.categories}`;
          //res.render({'joke', joke: jokeText, error: null});
          res.json({"joke": jokeText});
        }
      } });
    
  });

module.exports = router;

app.use('/', router);

app.listen(4201, () => console.log('Server ready'))

