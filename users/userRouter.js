const express = require('express');
const User = require('../users/userDb'); // import userDb
const Post = require('../posts/postDb'); // import postDb

const router = express.Router('express');

// import middleware
const validateUser = require('../middleware/validateUser');
const validateUserId = require('../middleware/validateUserId');
const validatePost = require('../middleware/validatePost');

// get all users
router.get('/', (req, res) => {
    User.get()
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The users could not be retrieved." });
        });
});

// add new user
router.post('/', validateUser, (req, res) => {
    const { name } = req.body;
    User.insert({ name })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log('add user', err);
            res.status(500).json({ error: "Cannot add user." });
        });
});

// get user by id
router.get('/:id', validateUserId, (req, res) => {
    // console.log('get user');
    res.status(200).json(req.user);
    // const { id } = req.params;
    // User.getById(id)
    //     .then(user => {
    //         if (user) {
    //             res.status(200).json(user);
    //         } else {
    //             res.status(404).json({ error: "Invalid user id." });
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({ error: "Cannot get user by id." });
    //     });
});

// delete user by id
router.delete('/:id', validateUserId, (req, res) => {
    const { id } = req.user; // can get id from validateUserId middleware 
    User.remove(id)
        .then(() => {
            res.status(204).end();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Could not delete user." });
        });
});

// update user by id. using custom middleware locally
router.put('/:id', validateUserId, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    User.update(id, { name })
        .then(updated => {
            if (updated) {
                User.getById(id)
                    .then(user => res.status(200).json(user))
                    .catch(err => {
                        console.log('update user', err);
                        res.status(500).json({ error: "Could not get user." });
                    });
            }
        })
        .catch(err => {
            console.log('update user', err);
            res.status(500).json({ error: "Could not update user." });
        });
});

// get posts for user specified by id
router.get('/:id/posts', validateUserId, (req, res) => {
    const { id } = req.params;
    User.getUserPosts(id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Cannot get posts by specified user id." });
        });
});

// create new post for user specified by id
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const post = req.body; // user_id and text assigned to req.body in validatePost middleware
    Post.insert(post)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error adding post." });
        });
});

module.exports = router;

/*
HENRY'S:

// insomnia body can add extra field like so: {"name": "name" "test": "test"}
router.post('/', validateUser, (req, res) => {
    const user = req.body; // set req.body to an object called 'name' in validateUser middleware
    User.insert(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log('add user', err);
            res.status(500).json({ error: "Cannot add user." });
        });
});
*/