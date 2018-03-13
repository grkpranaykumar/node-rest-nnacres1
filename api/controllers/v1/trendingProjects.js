const express = require('express');
const obj = require("../../config/constants");
const utils = require('../../config/utils');
const https = require('https');
const axios = require('axios');
const request = require('request');
const async = require('async');


let trendingProjects = {

		fetchById : function(req,callback){
				//console.log("fetch by id");
				//console.log(req.headers);
				return trendingProjects.apiRequest(req)
				.then((response)=>{
						callback(null,response);
				}).catch((error)=>{
					callback(error,null);
				});
		},

		apiRequest: function(req){
			//console.log("api request");
			 return new Promise(function(resolve,reject){
					var items=[
						// {
						// 	  url: obj.API_URL+utils.buildPropertyDetailPath(req.params.id),
						// 		method:'GET',
						// 		responseType:'json',
						// 		httpsAgent: new https.Agent({ rejectUnauthorized: false }),
						// 		withCredentials: true
						// },
						{
							url: obj.API_URL+utils.buildtrendingProjectsPath(req.params.id),
							method:'GET',
							responseType:'json',
							httpsAgent: new https.Agent({ rejectUnauthorized: false }),
							withCredentials: true
						}
						// {
						// 	url: obj.API_URL+utils.buildSimilarPropertiesPath(req.params.id),
						// 	method:'GET',
						// 	responseType:'json',
						// 	httpsAgent: new https.Agent({ rejectUnauthorized: false }),
						// 	withCredentials: true,
						// 	cookie:req.headers.cookie
						// }
					];
				//return axios(options);
					var responses = [];
					async.forEachOf(items,function(item,index,callback){
					//	console.log("item Is:",item);
							performRequest(item,function(err,response){
									//console.log(response);
									//console.log("respnse",Object.keys(response));
									if(err){
										//callback(err);
										responses.push({code:500, body: null, o:index });
									}
									else{
										responses.push({code: response.status, body: response.data, o: index});
									}
									callback();
							});
						},function(err){
							if(err)
								return reject (err)
							//callback which is called when all iteratee functions have finished, or an error occurs.
							//console.log("Errr",err)
							responses.sort(utils.keysrt('o'));
							return resolve(responses);
					});

						function performRequest(item,callback){
							//console.log("perfoem request");
							return axios(item).then((response)=>{
								callback(null,response);
							}).catch((error)=>{
								callback(error,null);
							});
						}
				});
		}
};

module.exports = trendingProjects;
