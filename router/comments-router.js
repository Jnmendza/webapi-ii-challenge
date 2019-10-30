const router = require('express').Router();
const db = require('../data/db.js');


// POST /api/posts/:id/comments - creates a comment for the post with a specific ID inside req body
router.post('/:id/comments', (req, res) => {
    
    if(!req.body.id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    
    } else if (!req.body.text){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
        db.insertComment(req.body)
        .then(comment => {
            res.status(201).json({comment})
        })
        .catch(error => {
            console.log("error", error)
            res.status(500).json({ error: "There was an error while saving the comment to the database." })
        })
    }

    
})

// GET /api/posts/:id/comments
router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    
        if(!id) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            db.findPostComments(id)
            .then(comment => {
                res.status(200).json(comment)
            })
            .catch(error => {
                console.log("get error", error)
                res.status(500).json({ error: "The comments info could not be retrieved." })
            })
        }
})

module.exports = router;