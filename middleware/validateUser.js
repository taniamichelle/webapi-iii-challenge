function validateUser(req, res, next) {
    let { name } = req.body;
    // console.log(validateUser);
    if (!req.body) {
        res.status(400).json({ error: "Missing user data." });
    } else if (!name) {
        res.status(400).json({ error: "Missing required name field." });
    } else {
        next();
    }
};

module.exports = validateUser;