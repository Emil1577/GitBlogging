const router = require('express').Router();
const { Blog, Comment } = require('../models');

router.get('/', async (req, res) => {
    try{

        const dbBlogData = await Blog.findAll({
            attributes: [
                'id',
                'name',
                'title',
                'contents',
                'created_date'
            ],
            include: [
                {
                    model: Comment,
                    attribute: ['commenter', 'comment'],
                },
            ],
        });
        const blogs = dbBlogData.map((blog) =>
        blog.get({ plain: true })
        );
        console.log("blogs:", 'blogs');
        //console.log("blogs[0].comments[0].comment:", blogs[1].comments[1].comment);
        res.render('homepage', {
            blogs,
            loggedIn: req.session.loggedIn,
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    } 
});

//Get one comment

// router.get('/blog/:id', async (req, res) => {
//     try {
//       const dbBlogData = await Blog.findByPk(req.params.id, {
//         include: [
//           {
//             model: Comment,
//             attributes: [
//               'id',
//               'commenter',
//               'comment',
//             ],
//           },
//         ],
//       });
  
//       const gallery = bdBlogData.get({ plain: true });
//       res.render('blog', { blog, loggedIn: req.session.loggedIn });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });

// // Get one comment

// router.get('/comment/:id', async (req,res) => {
//     try{
//         const dbCommentData = await Comment.findByPak(req.params.id);
//         res.render('comment', { comment, loggedIn: req.session.loggedIn });
//     } catch (err) {
//         console.log (err);
//         res.status(500).json(err);
//     }
// });

// Login Route

router.get('/login', (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

router.get('/signup', (req,res) => {

    res.render('signup');
})

module.exports = router;