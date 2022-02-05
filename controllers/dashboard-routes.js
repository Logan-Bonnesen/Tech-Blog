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

router.get('/update/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.findByPk(req.params.id);

    if (updatedPost) {
      const post = updatedPost.get({ plain: true });

      res.render('update-posts', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/newpost', withAuth, (req, res) => {
    res.render('new-post', {layout: 'dashboard'})
});

module.exports = router;