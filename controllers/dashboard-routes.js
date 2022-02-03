const router = require('express').Router();
const { User, Comment, Post }  = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
       where: {userId: req.session.userId}
    }).then(data => {
        const posts = data.map(post => {
            post.get({plain: true})
        });
        res.render('user-posts', {layout: "dashboard", posts});
    }).catch(err => {
        if (err) throw err
        res.redirect('/login')
    });
});

router.get('/update/:id', withAuth, (req,res) => {
    Post.findByPk(req.params.id)
}).then(data => {
    const updatedPost =  data.get({plain: true})
    res.render('update-posts', {layout: "dashboard", updatedPost});
}).catch(err => {
    if (err) throw err
    res.status(500)
});

router.get('/newpost', withAuth, (req, res) => {
    res.render('new-post', {layout: 'dashboard'})
});

module.exports = router;