const dbConnection = require('./dbConnections');
const tokenCreation = require('../Models/userToken.model');
const { Op } = require('sequelize');

const UserToken = tokenCreation(dbConnection.connections, dbConnection.DataTypes);

 exports.addToken = async(userToken)=>{
    return await UserToken.create({
        userName: userToken.userName,
        refreshToken: userToken.refreshToken,
        //expiryTime: Date.now() + (24*60*60*1000*10)
    });
}

exports.isTokenValid = async(userToken)=>{
    const storedToken = await UserToken.findOne({
        where:{
            [Op.and]:[
                {
                userName: userToken.userName
                },{
                refreshToken: userToken.refreshToken
                }
            ]
        }
    });
    return !storedToken ? false : true;
}