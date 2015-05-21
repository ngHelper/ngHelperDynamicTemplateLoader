'use strict';

/**
 * The module contains a HTTP interceptor which is focused on loading
 * templates from the origin server. The interceptor allows to
 * manipulate the URL which can be used to avoid caching issues
 * when loading angular templates.
 */
var ngHelperDynamicTemplateLoader = angular.module('ngHelperDynamicTemplateLoader', ['ngHelperDynamicTemplateLoaderCachingStrategies']);

function DynamicTemplateLoaderService(defaultCachingServiceObject) {
  var self = this;
  var templatePattern = /(.*)(views\/)(.*)(\.html)$/i;
  var cachingStrategyServiceObject = defaultCachingServiceObject;

  self.setTemplateUrlPattern = function(overrideTemplatePattern) {
    templatePattern = overrideTemplatePattern;
  };

  self.setCachingStrategyService = function(strategyServiceObject) {
    cachingStrategyServiceObject = strategyServiceObject;
  };

  self.isTemplateRequest = function(requestConfig) {
    var result = (templatePattern.test(requestConfig.url));
    //console.log("Checking request: " + requestConfig.url + " -> " + result);
    return result;
  };

  self.patchTemplateRequest = function(requestConfig) {
    return cachingStrategyServiceObject.processRequest(requestConfig);
  }
 }

ngHelperDynamicTemplateLoader.factory('ngHelperDynamicTemplateLoaderRequestInterceptor', [ '$dynamicTemplateLoader', function ($dynamicTemplateLoader) {
  return {
    // the handler for all requests done by $http
    'request': function(config) {

      // check if we have a template request
      if ($dynamicTemplateLoader.isTemplateRequest(config)) {
        // patch the request
        return $dynamicTemplateLoader.patchTemplateRequest(config);
      } else {
        // don't tocuh the config
        return config;
      }
    }
  };
}]);

ngHelperDynamicTemplateLoader.provider('$dynamicTemplateLoader', [ '$httpProvider', function($httpProvider) {
  var self = this;

  self.registerInterceptors = function() {
    $httpProvider.interceptors.push('ngHelperDynamicTemplateLoaderRequestInterceptor');
  };

  self.$get = ['$dynamicTemplateLoaderDefaultCachingStrategy', function($dynamicTemplateLoaderDefaultCachingStrategy) {
    return new DynamicTemplateLoaderService($dynamicTemplateLoaderDefaultCachingStrategy);
  }];
}]);
