const router = require('express').Router();
const { json } = require('body-parser');
const { Blog } = require('../../models');


router.get('/', async (req, res) => {


    try {
      // console.log(req.session.loggedIn)
      // console.log('am i in')
      const dbBlogData = await Blog.findAll({
        // attributes: [
        //   'id',
        //   'name',
        //   'title',
        //   'contents',
        //   'created_date'
        // ],
        // include: [
        //     {
        //         model: Comment,
        //         attribute: ['commenter', 'comment'],
        //     },
        // ],
      });

        res.status(200).json(dbBlogData);

      const blogs = dbBlogData.map((blog) =>
        blog.get({ plain: true })
      
      );
    
    }
    catch (err) {
      res.status(500).json(err);
    }

  });


  router.post('/', async (req, res) => {
    try {
      const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });

      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

      if (!BlogData) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }

      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
