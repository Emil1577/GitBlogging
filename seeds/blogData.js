const { Blog } = require ('../models');

const blogData = [
    {
        id: 1,
        name:'testing blogger name',
        title: 'title test',
        contents: 'content test',
        created_date:  'March 19, 2021 19:00:00',

    },

];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;