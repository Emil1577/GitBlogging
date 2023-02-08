const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {

        id: {
            type: DataTypes, INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contents: {
            type: DataTypes.STRING,
            allowNuell: false,
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
          },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelNamr: 'comments',
    }
);

module.exports = Comment;