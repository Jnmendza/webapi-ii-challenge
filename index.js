const express = require('express');

// 1
const postsRouter = require('./posts/posts-router.js')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
        <h2> Web API Challenge II </h2>
    `)
});

// 2
server.use('/api/posts', postsRouter)

server.listen(4000, () => {
    console.log('\n Server running on local host 4000 \n')
})