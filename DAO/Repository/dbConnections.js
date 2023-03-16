const {Sequelize, DataTypes} =  require('sequelize');
const config = require('../../Configs/dbConfigs');
const connections = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        dialect: config.dialect,
        HOST: config.HOST,
        pool:{
            max:config.pool.max,
            min:config.pool.min,
            acquire:config.pool.acquire,
            idle:config.pool.idle
        }
    });

module.exports = {
    connections:connections,
    DataTypes: DataTypes
}