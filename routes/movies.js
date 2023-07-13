var express = require('express');
var router = express.Router();

const Movie = require('../models/Movie')
const Celebrity = require('../models/Celebrity')

/* GET home page. */
router.get('/', function(req, res, next) {

    Movie.find()
    .then((foundMovies) => {
        res.render('movies/movies.hbs', { foundMovies })
    })
    .catch((err) => {
        console.log(err)
    })

});

router.get('/create', (req, res, next) => {

    Celebrity.find()
    .then((foundCelebrities) => {
        console.log("Celebrities", foundCelebrities)
        res.render('movies/new-movie.hbs', { foundCelebrities })
    })
    .catch((err) => {
        console.log(err)
    })

})

router.post('/create', (req, res, next) => {

    console.log("Body", req.body)

    const { title, genre, plot, cast } = req.body

    Movie.create({
        title,
        genre,
        plot,
        cast
    })
    .then((createdMovie) => {
        console.log("New Movie:", createdMovie)
        res.redirect('/movies')
    })
    .catch((err) => {
        console.log(err)
    })

})

router.get('/details/:id', (req, res, next) => {

    Movie.findById(req.params.id)
    .populate('cast')
    .then((foundMovie) => {
        console.log("Found Movie", foundMovie)
        res.render('movies/movie-details.hbs', foundMovie)
    })
    .catch((err) => {
        console.log(err)
    })

})

router.get('/delete/:id', (req, res, next) => {

    Movie.findByIdAndDelete(req.params.id)
    .then((deletedResult) => {
        console.log("Deleted:", deletedResult)
        res.redirect('/movies')
    })
    .catch((err) => {
        console.log(err)
    })

})

router.get('/edit/:id', (req, res, next) => {

    Movie.findById(req.params.id)
    .populate('cast')
    .then((foundMovie) => {

        Celebrity.find()
        .then((foundCelebrities) => {

            let remainingCelebrities = foundCelebrities.filter(celebrity=> !foundMovie.cast.find(castMember => castMember._id.toString() == celebrity._id.toString())) 

            res.render('movies/edit-movie.hbs', {movie: foundMovie, celebrities: remainingCelebrities })

        })
        .catch((err) => {
            console.log(err)
        })
    })
    .catch((err) => {
        console.log(err)
    })

})

router.post('/edit/:id', (req, res, next) => {

    console.log
    
    let {title, genre, plot, cast} = req.body

    Movie.findByIdAndUpdate(
        req.params.id,
        {
            title,
            genre,
            plot,
            cast
        }, 
        {new: true}
        )
        .then((updatedMovie) => {
            console.log("Updated:", updatedMovie)
            res.redirect(`/movies/details/${updatedMovie._id}`)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router;