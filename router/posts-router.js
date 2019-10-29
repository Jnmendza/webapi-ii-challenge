const router = require('express').Router();
const db = require('../data/db.js');

// POST /api/posts - creates a post using the info send inside the req.body
// {
//     "title": STRING,
//     "contents": STRING
// }
router.post('/', (req, res) => {

    if(!req.body.title || !req.body.contents){
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    }
    
})


// GET /api/posts - returns an array of all post objs in db
router.get('/', (req, res) => {
    const query = req.query;
    console.log("This is query",query)

    db.find(query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The posts information could not be retrieved."
            })
        })
})

// GET /api/posts/:id - Returns the post object with the specified ID
router.get('/:id', (req, res) => {

})

module.exports = router;