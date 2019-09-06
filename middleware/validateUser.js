function validateUser(req, res, next) {
    const { name } = req.body;
    req.body = { name }
    if (!req.body) {
        res.status(400).json({ error: "Missing user data." });
    } else if (!name) {
        res.status(400).json({ error: "Missing required name field." });
    } else {
        next();
    }
};

module.exports = validateUser;

/*
HENRY'S:
function validateUser(req, res, next) {
    const { name } = req.body;
    if (!req.body) {
        return res.status(400).json({ error: "Missing user data." });
    }
    if (!name) {
        res.status(400).json({ error: "Missing required name field." });
    }
    if(typeOf name !== 'string') {
        return res.status(400).json({error: "Name must be a string."});
    }
    req.body = {name}
    next();
};

*/