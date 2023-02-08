const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blogs extends Model {}

Blogs.init(
    {

        id: {

            type: DataTypes, INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blog: {
            type: DataTypes.STRING,
            allowNuell: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelNamr: 'blogs',
    }
);

module.exports = Blogs;

