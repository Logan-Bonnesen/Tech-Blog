const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try{
        const newPost = await Post.create({
            title: req.body.title,
            post_text: req.body.post_text,
            user_id: req.session.user_id
        })
        res.json(newPost);
    }catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try{
        const [updatedData] = await Post.update(req.body, {
            
            where: {id: req.params.id},
        })
        if(updatedData > 0) {
            res.status(200).end();
        } else {
            res.status(404).end()
        }

    }catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try{
        const [updatedData] = await Post.destroy({
            
            where: {id: req.params.id},
        })
        if(updatedData > 0) {
            res.status(200).end();
        } else {
            res.status(404).end()
        }
        
    }catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;