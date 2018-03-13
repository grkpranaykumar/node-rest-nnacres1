var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var api = require('./api/api');
var jwt = require('jsonwebtoken');
// var jwt = require('express-jwt');
var jwksClient = require('jwks-rsa');
var session = require('express-session');
var app = express();
var cors = require('cors');
var cookieParser = require('cookie-parser');
var swaggerUi = require('swagger-ui-express');
var YAML = require('yamljs');
var swaggerDocument = YAML.load('./api/swagger/swagger.yaml');
var authorize = require('./api/authorize');
var secret = require('./api/config/secret');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api',authorize);
//making server CORS enable
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 10,
  jwksUri: 'https://test1auth.auth0.com/.well-known/jwks.json'
});

var jwtCheck = function(req,res,next){
  var token = req.cookies.access_token;
  const kid=secret.kid;
  client.getSigningKey(kid,(err,key)=>{
      const signingKey = key.publicKey || key.rsaPublicKey;
      if(token){
          jwt.verify(token,signingKey,{ audience: 'https://nnacres.com',
                                  issuer: 'https://test1auth.auth0.com/',
                                  algorithms: ['RS256'] },function(err,decoded){
            if(err){
              return res.json({ code:401, success: false, message: 'Failed to authorize token.'});
            }
            else{
              req.decoded=decoded;
              next();
            }
          });
      }
      else{
        return res.status(403).json({code:403, success: false, message: 'No token provided.'});
      }
  });
}

var gaurd = function(req,res,next){
  var pattern = new RegExp("\/api.*");
  if(pattern.test(req.path)){
      var permissions = ['general'];
      for(var i = 0; i < permissions.length; i++){
        if(req.decoded.scope.includes(permissions[i])){
          next();
        } else {
          return res.status(403).json({code:403, message:'Forbidden'});
        }
      }
  }
}

app.use(jwtCheck);
app.use(gaurd);
app.use(session({
    secret: 'noida',
    saveUninitialized: true,
    resave: false
}));

app.use('/api', api);

module.exports = app;
