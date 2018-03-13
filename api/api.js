const express = require('express');
const app = express();
const router = express.Router();
const ResponseTemplate = require('./errorTemplates/error');
const validationObject = require('./middlewares/validateRequest');
const fs = require('fs');
const jwt = require('jsonwebtoken');


let obj={
  "properties":["v1","v2"],
  "trendingProjects":["v1"]
}

router.get('/:version/properties/:id',validationObject.validateId,function(req,res){
  if(obj.hasOwnProperty('properties')){
    var version = (obj["properties"].indexOf(req.params.version) > -1) ? req.params.version : obj["properties"][obj["properties"].length-1];
    var propertyController=require(`./controllers/${version}/propertyController`);
    propertyController.fetchById(req, function(err, propertyData) {
        if (err) {
            res.json(ResponseTemplate.error(err.code, err.message));
        } else {
            return res.json(propertyData);
        }
    });
  }
});


router.get('/:version/trendingProjects/:id',validationObject.validateId,function(req,res){
  if(obj.hasOwnProperty('trendingProjects')){
    var version = (obj["trendingProjects"].indexOf(req.params.version) > -1) ? req.params.version : obj["trendingProjects"][obj["trendingProjects"].length-1];
    var propertyController=require(`./controllers/${version}/trendingProjects`);
    propertyController.fetchById(req, function(err, propertyData) {
        if (err) {
            res.json(ResponseTemplate.error(err.code, err.message));
        } else {
            return res.json(propertyData);
        }
    });
  }
});

module.exports = router;
