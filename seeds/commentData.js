const { Comment } = require ('../models');

const commentData = [
    {
        commenter:'testing commenter name',
        comment: 'comment test',
        blog_id: 1

    },

];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;