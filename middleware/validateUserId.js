const User = require('../users/userDb');

function validateUserId(req, res, next) {
    const { id } = req.params;
    User.getById(id) // check if user with specified id exists
        .then(user => {
            if (user) {
                req.user = user;
                next()
            } else {
                res.status(400).json({ error: "Invalid user id." });
            }
        })
};

module.exports = validateUserId;
