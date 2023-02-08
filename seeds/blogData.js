const { Blog } = require ('../models');

const blogData = [
    {
        name:'testing blogger name',
        title: 'title test',
        contents: 'content test',
        created_date: 'September 22, 2021 22:00:00',

    },

];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;