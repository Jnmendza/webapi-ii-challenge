const router = require('express').Router();
const Posts = require('../data/db')

router.get('/', (req, res) => {
    const query = req.query;

    Posts.find(query)
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

module.exports = router;