const User = require('./User');
const Comment = require('./Comment');
const Blog = require('./Blog');

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
});

module.exports = { User, Comment, Blog };