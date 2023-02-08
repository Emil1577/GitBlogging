const sequelize = require('../config/connection');
const seedBlog = require('./blogData');
const seedComment = require('./commentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBlog();

  await seedComment();

  process.exit(0);
};

seedAll();