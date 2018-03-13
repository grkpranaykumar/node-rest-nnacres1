var secret = require('./config/secret');
var request = require('request');
const express = require('express');
const router = express.Router();
var authData = {
  client_id: secret.NON_INTERACTIVE_CLIENT_ID,
  client_secret: secret.NON_INTERACTIVE_CLIENT_SECRET,
  grant_type: 'client_credentials',
  audience: 'https://nnacres.com'
};
var options={
  url: 'https://test1auth.auth0.com/oauth/token',
  method:'POST',
  headers:{'content-type': 'application/json'},
  body:authData,
  json:true
};

router.get('/authorize',function(req,res){
  request(options,function(error,response,body){
    res.access_token=body.access_token;
    //res.send({'access_token': body.access_token});
    //res.cookie('access_token',body.access_token);
    res.send(body.access_token);
  });
});

module.exports = router;
