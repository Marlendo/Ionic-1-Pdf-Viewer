angular.module('starter', ['ionic','starter.controllers','pdf'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {   
    if(window.cordova && window.cordova.plugins.Keyboard) {
  
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })

    .state('pdftest', {
      url: '/pdftest',
      templateUrl: 'templates/pdftest.html',
      controller: 'PdfTestCtrl',
      params:{
        pdf_name: null
      }
    });

    $urlRouterProvider.otherwise('/home');
})