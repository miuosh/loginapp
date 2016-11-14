(function() {
  'use strict';
    angular.module('app.auth')
    .factory('AuthService', AuthService);

    /* @ngInject */
    AuthService.$inject = ['$q', '$timeout', '$http'];

    function AuthService($q, $timeout, $http) {

      var user = null;

        return ({
          isLoggedIn: isLoggedIn,
          getUserStatus: getUserStatus,
          login: login,
          logout: logout,
          register: register,
          resetPassword: resetPassword
        });


        function isLoggedIn() {
          if (user) {
            return true;
          } else {
            return false;
          }
        }

        function getUserStatus() {
          return $http.get('/user/status')
                  .success(function (data) {
                    if(data.status) {
                      user = true;
                    } else {
                      user = false;
                    }
                  })
                  .error(function (data) {
                    user = false;
                    console.log('error:' +' user: false');
                  })

        }

        function login(username, password) {
          // create a new instance of deferred
          var deferred = $q.defer();
          $http.post('/user/login', {
            username: username,
            password: password
          }).success(function (data, status) {
            if (status === 200 && data.status) {
              user = true;
              deferred.resolve();
            } else {
              user = false;
              deferred.reject();
            }
          }).error(function(err) {
            user = false;
            deferred.reject(err);
          })

          // return promise object
          return deferred.promise;
        } // #login

        function logout() {
          var deferred = $q.defer();

        $http.get('/user/logout')
          .success(function (data) {
            user = false;
            deferred.resolve();
          })
          .error(function (err) {
            user = false;
            deferred.reject(err);
          })

          return deferred.promise;
        }// #logout

        function register(username, password) {

          var deferred = $q.defer();

          $http.post('/user/register', {
            username: username,
            password: password

          })
          .success(function (data, status) {
            if(status === 200 && data.status) {
              deferred.resolve();
            } else {
              deferred.reject();
            }
          })
          .error(function (err) {
            deferred.reject(err);
          });

          return deferred.promise;
        }

        function resetPassword(email) {
          var deffered = $q.defer();

          $http.post('/user/resetPassword', { email })
            .success(function (data, status) {
              if(status === 200 && data.status) {
                deferred.resolve();
              } else {
                deffered.reject(data.status);
              }
            })
            .error(function(err) {
              deffered.reject(err);
            });

            return deffered.promise;
        }// #resetPassword

    }// #AuthService

}());
