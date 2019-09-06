const express = require('express');

const Post = require('../posts/postDb'); // import postDb

const router = express.Router('express');

// import middleware
const validatePostId = require('../middleware/validatePostId');

// get all posts
router.get('/', (req, res) => {
    Post.get()
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error retrieving posts." });
        });
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

module.exports = router;