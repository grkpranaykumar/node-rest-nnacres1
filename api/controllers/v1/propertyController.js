const express = require('express');
const obj = require("../../config/constants");
const utils = require('../../config/utils');
const https = require('https');
const axios = require('axios');
const request = require('request');
const async = require('async');
const session = require('express-session');

let propertyController = {

		fetchById : function(req,callback){
				return propertyController.apiRequest(req)
				.then((response)=>{
						callback(null,response);
				}).catch((error)=>{
					callback(error,null);
				});
		},

		apiRequest: function(req){
			 return new Promise(function(resolve,reject){
							var items=[
									{
										  url: obj.API_URL+utils.buildPropertyDetailPath(req.params.id),
											method:'GET',
											responseType:'json',
											httpsAgent: new https.Agent({ rejectUnauthorized: false }),
											withCredentials: true
									}
							];
							var responses = [];
							async.forEachOf(items,function(item,index,callback){
									performRequest(item,function(err,response){
											if(err){
												responses.push({code:500, body: null, o:index });
											}
											else{
												responses.push({code: response.status, body: response.data, o: index});
											}
											callback();
									});
								},function(err){
									if(err){
										return reject (err);
									}
									responses.sort(utils.keysrt('o'));
									return resolve(responses);
							});

							function performRequest(item,callback){
								return axios(item).then((response)=>{
									callback(null,response);
								}).catch((error)=>{
									callback(error,null);
								});
							}
				});
		}
};

module.exports = propertyController;
