const router = require('express').Router();
const db = require('../data/db');

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

    db.find()
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
    const id = req.params.id

    if(!id){
        return res.status(404).json({ message: "The post with the specified ID does not exist."})
    } else {
        db.findById(id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "The post info could not be retrieved." })
        })
    }
    
})

// DELETE /api/posts/:id - Removes the post with the specified id and returns the deleted post object.
router.delete('/:id', (req, res) => {
    const id = req.params.id
    
    db.remove(id)
    .then(post => {
        if(post) {
            res.status(200).json({ message: "Deleted post " })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "The post could not be removed." })
    })
})

// PUT /api/posts/:id - Updates post with specified id using data form req body
router.put('/:id', (req, res) => {
    const {title, contents} = req.body;
    const id = req.params.id;
    if (!title || !contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    } else {
        db.update(id, req.body)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                error: "The post information could not be modified."
            })
        })
    }
})

module.exports = router;