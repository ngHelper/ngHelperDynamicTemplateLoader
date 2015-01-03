'use strict';

var ngHelperDynamicTemplateLoaderCachingStrategies = angular.module('ngHelperDynamicTemplateLoaderCachingStrategies', []);

// a simple strategy which just adds the timestamps
ngHelperDynamicTemplateLoaderCachingStrategies.service('$dynamicTemplateLoaderDefaultCachingStrategy', [ function() {
  var self = this;

  self.processRequest = function(requestConfig) {

    // generate the timestamp
    var currentDate = new Date();
    var timeStamp = currentDate.getTime() + '.' + currentDate.getMilliseconds();

    // patch the uri
    if (requestConfig.url.indexOf('?') === -1) {
      requestConfig.url = requestConfig.url + '?v=' + timeStamp;
    } else {
      requestConfig.url = requestConfig.url + '&v=' + timeStamp;
    }

    // done
    return requestConfig;
  }
}]);
