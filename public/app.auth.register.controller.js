(function() {
  'use strict';
    angular.module('app.auth')
    .controller('registerController', registerController);

    registerController.$inject = ['$location', 'AuthService'];

    function registerController($location, AuthService) {
      var vm = this;
      vm.error = false;
      vm.disabled = true;
      vm.register = register;
      console.log('Init registerCtrl...');

      /////////////////////////////
      function register() {
        vm.error = false;
        vm.disabled = true;
          console.log('registering...');
          console.log(AuthService);
          console.log(vm.registerForm);
        AuthService.register(vm.registerForm.username, vm.registerForm.password)
          .then(function() {
            $location.path('/login');
            vm.disabled = false;
            vm.registerForm = {};
          })
          .catch(function(error) {
            vm.error = true;
            vm.errorMessage = error.err.message;
            vm.disabled = false;
            vm.registerForm = {};
          })
      }
    }
}());
