'use strict';

/* Directives angularjs */
var app = angular.module('kmerApp.filters', []);

/* Filtrer sur une collection d'object
 * @Return List<Object>
 * @Auteur : phendji
 */
app.filter('limitToOnCollection', [function(){
  return function(obj, limit){
    var keys = Object.keys(obj);
    if(keys.length < 1){
        return [];
    }

    var ret = new Object,
    count = 0;
    var endIndex = keys.length;
    angular.forEach(keys, function(key, arrayIndex){
      if(limit > 0){
        if(count >= limit){
          return false;
        }else{
          ret[key] = obj[key];
          count++;
        }
      }else{
        if(count <= limit){
          return false;
        }else{
          ret[key] = obj[endIndex];
          endIndex--;
          count--;
        }
      }  
    });
    return ret;
  };
}]);