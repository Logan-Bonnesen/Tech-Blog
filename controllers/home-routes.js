const router = require('express').Router();
const { User, Comment, Post }  = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        include: [User]
    }).then(data => {
        const posts = data.map(post => {
            post.get({plain: true})
        });
        res.render('all-posts', {posts});
    }).catch(err => {
        if (err) throw err
        res.status(500);
    });
});

router.get('/post/:id', (req, res) => {
    Post.findOne(req.params.id, {
        include: [User, {model: Comment, include: [User]}]
    }).then(data => {
        const post = data.map(post => {
            post.get({plain: true})
        });
        res.render('single-post', {post});
    }).catch(err => {
        if (err) throw err
        res.status(500);
    });
});

router.get('/login', (req, res) => {
    if(req.sessions.loggedIn) {
        res.redirect('/')
        return
    }
    res.render('login')
});

router.get('/signup', (req, res) => {
    if(req.sessions.loggedIn) {
        res.redirect('/')
        return
    }
    res.render('signup')
})


module.exports = router;