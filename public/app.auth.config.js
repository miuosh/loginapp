(function() {
  'use strict';
  angular.module('app.auth')
  .config(configure)

  /* @ngInject */
configure.$inject = ['$routeProvider'];

  function configure($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/partials/home.html',
      access: {restricted: true},
    })
    .when('/login', {
      templateUrl: '/partials/login.html',
      controller: 'loginController',
      controllerAs: 'vm',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      controllerAs: 'vm',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: '/partials/register.html',
      controller: 'registerController',
      controllerAs: 'vm',
      access: {restricted: false}
    })
    .when('/one', {
      template: '<h1>This is page one!<\h1>',
      access: {restricted: true}
    })
    .when('/two', {
      template: '<h1>This is page two!<\h1>',
      access: {restricted: true}
    })
    .otherwise({
      redirectTo: '/'
    });

  }
}());
