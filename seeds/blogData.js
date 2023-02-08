const { Blog } = require ('../models');

const blogData = [
    {
        name:'testing blogger name',
        title: 'title test',
        content: 'content test',
        created_date: 'September 22, 2021 22:00:00',

    },
    {
        name:'2nd testing blogger name',
        title: '2nd title test',
        content: '2nd content test',
        created_date: 'September 23, 2021 22:00:00',

    },
];

const seedBlog = () => Blog.bulkCreate(blogdata);

module.exports = seedBlog;