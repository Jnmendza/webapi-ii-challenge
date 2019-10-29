const router = require('express').Router();
const db = require('../data/db.js');


// POST /api/posts/:id/comments - creates a comment for the post with a specific ID inside req body
router.post('/:id/comments', (req, res) => {
    

    if(!req.body.postId) {
        return res.status(404).json({ message: "The post with the specified ID does not exist." })
    
    } else if(!req.body.text) {
        return res.status(400).json({ errorMessage: "Please provide text for the comment." })
    
    } else if(req.body.postId && req.body.tex) {
        db.insertComment(req.body)
        .then(comment => {
            res.status(201).json(comment)
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the comment to the database." })
        })
    }
})