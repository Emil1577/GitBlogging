const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    Blog,
    User,
    Comment
} = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {

    console.log(req.session.loggedIn);
    console.log(req.session);
console.log('im in blog')
    try{ 
        console.log (req.session.loggedIn)
        console.log('am i in')
        const dbBlogData = await Blog.findAll({
            attributes: [
                'id',
                'name',
                'title',
                'contents',
                'created_date'
            ],
            // include: [
            //     {
            //         model: Comment,
            //         attribute: ['commenter', 'comment'],
            //     },
            // ],
        });
        const blogs = dbBlogData.map((blog) =>
            blog.get({ plain: true })
        );
        console.log("comments:", 'blogs');

        // res.render('comments', {
        // loggedIn: req.session.loggedIn,
        res.render('blogs', { layout: 'dashboard' })

    }
     catch (err) {
        res.status(500).json(err);
      }

    });


 
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }

            const post = dbPostData.get({
                plain: true
            });

            res.render('edit-post', {
                post,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.get('/new', (req, res) => {
    res.render('add-post', {
        loggedIn: true
    })
})

module.exports = router;