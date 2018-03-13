const utils = require('../config/utils');
const ResponseTemplate = require('../errorTemplates/error');
const jwt = require('jsonwebtoken');
const fs = require('fs');

let validationObject={
    validateId : (req, res, next) => {
        if (req.method === 'GET') {
            let id = req.params.id;
            if (!id || !utils.checkforId(id)) {
                res.json(ResponseTemplate.errorContent());
            } else {
                next()
            }
        } else {
            next();
        }
    },

    validateToken : (req,res,next)=>{
          //console.log(req.cookies);
         var token = req.body.token || req.query.token || req.headers['x-access-token'];
         if(token){
            var cert = fs.readFileSync(require('path').resolve(__dirname,'../config/secret.txt'),'utf8');
            jwt.verify(token,cert,function(err,data){
                if (err){
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                }
                else {
                  req.data = data;
                  next();
                }
            });
         }
         else{
            return res.json({ success: false, message: 'No token provided.' });
         }
    }

}
module.exports = validationObject;
