var express = require('express');
var router = express.Router();

const Celebrity = require('../models/Celebrity')

/* GET home page. */
router.get('/', function(req, res, next) {

    Celebrity.find()
    .then((foundCelebrities) => {
        res.render('celebrities/celebrities.hbs', { foundCelebrities })
    })
    .catch((err) => {
        console.log(err)
    })
    
});

router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity.hbs')
})

router.post('/create', (req, res, next) => {
    
    const { name, occupation, catchPhrase } = req.body
    
    Celebrity.create({
        name,
        occupation,
        catchPhrase
    })
    .then((createdCelebrity) => {
        console.log("New Celebrity:", createdCelebrity)
        res.redirect('/celebrities')
    })
    .catch((err) => {
        console.log(err)
        res.render('celebrities/new-celebrity.hbs', { errorMessage: 'Error creating celebrity.  Please try again.'})
    })

})

module.exports = router;