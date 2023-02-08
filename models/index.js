const User = require('./User');
const Comment = require('./Comment');
const Blog = require('./Blog');

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Blog.belongzTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Comment, Blog };