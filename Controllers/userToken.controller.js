const userTokenRepo = require('../DAO/Repository/userToken.repository');
const jwt = require('jsonwebtoken');
const authConfig = require("../Configs/authConfig")
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

exports.refreshAccessToken = (req, res) => {
    //1. the expired access token - will have the username
    //2. the refreshToken
    const accessToken = req.body.accessToken;
    const decodedToken = jwt.decode(accessToken);
    console.log(decodedToken);

   /*
    if(decodedToken.exp < Date.now()){
      return  res.sendStatus(204);
    }
    */

    //if the token has expired - validate the refreshtoken and the user.
    userTokenRepo.isTokenValid({
        userName: decodedToken.userName,
        refreshToken: req.body.refreshToken
    })
    .then(result=>{
        //console.log(result);
        if(result){
            return res.status(200).send({
                accessToken: getAccessToken({
                    userName: result.userName,
                    permission: result.permission
                }),
                refreshToken: req.body.refreshToken
            })
        }
        return res.status(401).send({
            message:'Unauthorized'
        })
    })
    .catch(error=>{
        console.log('Error Occured in Refreshing Token', error);
        res.status(500).send({
            message:'Error Occured In Refresh Token!'
        })
    })
}

exports.validateAccessTokens = (req, res)=>{
    const authHeader = req.headers['authorization']
    if(typeof authHeader === 'string'){
        var token = authHeader.split(' ')[1];
    }
    console.log(token)
    if(!token){
        return res.status(401).send({
            message:'Unauthorized, Token Not Found!'
        })
    }
    jwt.verify(token, authConfig.ACCESS_TOKEN_SECRET, (err, payload)=>{
        if(err){
            return res.status(403).send({
                message:'Forbidden, Invalid or Expired Token'
            })
        }
        return res.status(200).send(payload.data);

    })
}


const getAccessToken = (payload) => {
const jitter = parseInt(Math.random()*120); //2min gap creation
const expireIn = 600 + jitter;//10min + (2 min buffer);
return jwt.sign(payload, authConfig.ACCESS_TOKEN_SECRET, {expiresIn:`${expireIn}s`});
}

const getRefreshToken = () =>{
    return crypto.randomBytes(64).toString('hex');
}

exports.tokenTableInitializer = ()=>{
  userTokenRepo.userTokenTable({forceCreation : false});
}