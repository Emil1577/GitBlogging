const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    Blog,
    User,
    Comment
} = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
      // Get all users, sorted by name
      const blogData = await Blog.findAll({
        // attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      });
    //  console.log("userData", blogData);
      // Serialize user data so templates can read it
      const blogs = blogData.map((blog) => blog.get({ plain: true }));
    //  const blogs = blogData.map((blog) => blog.dataValues);
    //  console.log("blogs", blogs);
    // //    console.log("blogsi dontknow", blog.name[1]);
    // //   // Pass serialized data into Handlebars.js template
    // //  res.render('blogs', { blogs: blogData });

    // res.json(blogs)
  //res.render('blogs', {layout:'dashboard'})

    res.render('blogs', {
        layout:'dashboard',
        blogs,
        logged_in: req.session.logged_in,
      });

    } catch (err) {
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