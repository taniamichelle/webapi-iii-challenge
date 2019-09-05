
function validatePost(req, res, next) {
    const { id: user_id } = req.params;
    const { text } = req.body;
    if (!req.body) {
        return res.status(400).json({ error: "Body is required." });
    }
    if (!text) {
        return res.status(400).json({ error: "Please add text to post." });
    }
    req.body = { user_id, text };
    next();
};

module.exports = validatePost;