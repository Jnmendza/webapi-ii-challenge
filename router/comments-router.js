const router = require('express').Router();
const db = require('../data/db.js');


// POST /api/posts/:id/comments - creates a comment for the post with a specific ID inside req body
router.post('/:id/comments', (req, res) => {
    const id = req.params.id

    
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
            .catch(err => {
                res.status(500).json({ error: "The comments info could not be retrieved." })
            })
        }
})

module.exports = router;