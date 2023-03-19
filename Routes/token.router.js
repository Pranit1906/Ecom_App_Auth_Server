const express = require('express');
const { accessToken, refreshAccessToken, validateAccessTokens } = require('../Controllers/userToken.controller');

const router = express.Router();

router.post('/getAccessToken',accessToken);
router.post('/getRefreshToken',refreshAccessToken);
router.get('/authorize',validateAccessTokens);
module.exports= router;