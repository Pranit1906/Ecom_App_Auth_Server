const userTokenRepo = require('../DAO/Repository/userToken.repository');
const jwt = require('jsonwebtoken');
const serverConfig = require('../Configs/serverConfig');
const crypto = require('crypto');

exports.accessToken = (req, res)=>{
    const payload = req.body
    const refreshToken = getRefreshToken(payload);
    const accessToken = getAccessToken(payload); 
    userTokenRepo.addToken({
        userName: payload.userName,
        refreshToken: refreshToken
    })
    .then(result=>{
        console.log('TOken has been Saved in Db SuccessFully!',result);
        res.status(200).send({
            accessToken:accessToken,
            refreshToken: refreshToken
        })
    })
    .catch((error)=>{
        console.log('Error Occured in token Creation', error);
        res.status(500).send({
            message:'Token Creation Failure, Please try Again Later!'
        })
    })
}

const getAccessToken = (payload) => {
const jitter = parseInt(Math.random()*120); //2min gap creation
const expireIn = 600 + jitter;//10min + (2 min buffer);
return jwt.sign(payload, serverConfig.ACCESS_TOKEN, {expiresIn:`${expireIn}s`});
}

const getRefreshToken = () =>{
    return crypto.randomBytes(64).toString('hex');
}