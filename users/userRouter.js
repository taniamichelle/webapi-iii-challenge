const express = require('express');
const router = express.Router('express');
const db = require('../users/userDb');

// get all users
router.get('/', (req, res) => {
    db.get()
        .then(user => res.status(200).json(user))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The users could not be retrieved." });
        });
});

// router.post('/', (req, res) => {

// });

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

// router.delete('/:id', (req, res) => {

// });

// router.put('/:id', (req, res) => {

// });

// router.get('/:id/posts', (req, res) => {

// });

// router.post('/:id/posts', (req, res) => {

// });

//custom middleware

// function validateUserId(req, res, next) {

// };

// function validateUser(req, res, next) {

// };

// function validatePost(req, res, next) {

// };

module.exports = router;
