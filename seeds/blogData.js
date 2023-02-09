const { Blog } = require ('../models');

const blogData = [
    {
        name:'testing blogger name',
        title: 'title test',
        contents: 'content test',

    },

];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;