const express = require('express');
const { accessToken } = require('../Controllers/userToken.controller');
const router = express.Router();

router.post('/getAccessToken',accessToken)