const express = require('express');
const router = express.Router('express');
const db = require('../users/userDb');
const validateUser = require('../middleware/validateUser');

// get all users
router.get('/', (req, res) => {
    db.get()
        .then(user => res.status(200).json(user))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The users could not be retrieved." });
        });
});

// add new user
router.post('/', validateUser, (req, res) => {
    const userInfo = req.body;
    db.insert(userInfo)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log('add user', err);
            res.status(500).json({ error: "Cannot add user." });
        });
});

// get user by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.getById(id)
        .then((user) => {
            // console.log(user);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(400).json({ error: "Invalid user id." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Cannot get user by id." });
        });
});

// delete user by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(removed => {
            if (removed) {
                res.status(204).end();
            } else {
                res.status(404).json({ error: "User with that id does not exist." })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Could not delete user." });
        });
});

// update user by id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { changes } = req.body;
    if (!changes) {
        return res.status(400).json({ error: "Please add changes." });
    }
    db.update(id, { changes })
        .then(updated => {
            if (updated) {
                getUserPosts(id);
            } else {
                res.status(404).json({ error: "User with that id does not exist." });
            }
        })
        .catch(err => {
            console.log('update user', err);
            res.status(500).json({ error: "Could not update user." });
        });
});

// router.get('/:id/posts', (req, res) => {

// });

// router.post('/:id/posts', (req, res) => {

// });

//custom middleware



// function validatePost(req, res, next) {

// };

module.exports = router;
