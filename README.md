# ngHelperDynamicTemplateLoader

This simples allows to apply different startegies ot load templates without caching. To install the component in your existing angular app follow these steps:

### Install ng-helper-busy 
```
bower install ng-helper-dynamic-template-loader --save
```

### Include the angular module
```javascript
angular.module('appApp', [
    'ngHelperDynamicTemplateLoader'
]);
```

### Activate the interceptor
To activate the standard interceptor which is a generic cache buster which add a timestamp to every template/partial request. Just add the following lines of code in the configuration section:
```javascript
.config(function ($dynamicTemplateLoaderProvider) {

  // Register the HTTP interceptors
  $dynamicTemplateLoaderProvider.registerInterceptors();
})
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :)

## Contributors

* [CSS3 activity indicators](https://github.com/lukehaas/css-loaders)

## License

[MIT License](https://github.com/lukehaas/css-loaders/blob/step2/LICENSE)
