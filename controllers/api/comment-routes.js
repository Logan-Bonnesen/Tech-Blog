const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try{
        const newComment = await Comment.create({
            title: req.body.title,
            comment_text: req.body.comment_text,
            user_id: req.session.user_id
        })
        res.json(newComment);
    }catch (err) {
        res.status(400).json(err);
    }
});

// ???add delete???

module.exports = router;
