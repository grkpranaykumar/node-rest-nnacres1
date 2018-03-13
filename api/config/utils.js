const obj = require('./constants');

let Util={

  buildPropertyDetailPath(response){
    let dummy_id='000000000';
    if(response===undefined || response===''){
      return `/99mobapi/v0/propertyDetail/${obj.API_TOKEN}/${dummy_id}?rtype=${obj.CONTENT_TYPE}&moduleName=${obj.MODULE_NAME}`;
    }
    return `/99mobapi/v0/propertyDetail/${obj.API_TOKEN}/${response}?rtype=${obj.CONTENT_TYPE}&moduleName=${obj.MODULE_NAME}`;
  },

  buildtrendingProjectsPath(response){
    let dummy_id='000000000';
    if(response===undefined || response===''){
      return `/99mobapi/v0/trendingprojects/${obj.API_TOKEN}/R/${dummy_id}?rtype=${obj.CONTENT_TYPE}&moduleName=${obj.MODULE_NAME}`;
    }
    return `/99mobapi/v0/trendingprojects/${obj.API_TOKEN}/R/${response}?rtype=${obj.CONTENT_TYPE}&moduleName=${obj.MODULE_NAME}`;
  },

  buildSimilarPropertiesPath(response){
    let dummy_id='000000000';
    if(response===undefined || response===''){
      return `/99mobapi/v0/getsimilarproperties/${obj.API_TOKEN}/${dummy_id}?rtype=${obj.CONTENT_TYPE}&moduleName=${obj.MODULE_NAME}`;
    }
    return `/99mobapi/v0/getsimilarproperties/${obj.API_TOKEN}/${response}?rtype=${obj.CONTENT_TYPE}&moduleName=${obj.MODULE_NAME}`;
  },

  checkforId(input){
    let pattern = '^([A-Z0-9_]){9}$';
    if (input.match(pattern)) {
        return true;
    } else {
        return false;
    }
  },

  keysrt(key, desc) {
    return function(a,b){
        return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    };
  }

}

module.exports = Util;
