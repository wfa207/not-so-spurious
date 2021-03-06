app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/signup-login/signup-login.html',
        controller: 'SignupLoginCtrl'
    })

    .state('splash-signup', {
        url: '/',
        templateUrl: 'js/signup-login/signup-login.html',
        controller: 'SignupLoginCtrl'
    });

});

app.controller('SignupLoginCtrl', function ($scope, AuthService, $state, SignupLoginFactory) {

    $scope.login = {};
    $scope.error = null;

    function authLogin(userInfo) {
        return AuthService.login(userInfo)
        .then(function () {
            $state.go('ConnectionState');
        });
    }

    $scope.sendLogin = function (loginInfo) {

        authLogin(loginInfo)
        .catch(function () {
            $scope.error = 'Invalid login credentials.';
        });
    };

    $scope.sendSignin = function(signinInfo) {
        SignupLoginFactory.createUser(signinInfo)
            .then(function() {
                authLogin(signinInfo);
            })
            .catch(function() {
                $scope.error = 'This user already exists!';
            });
    }
});

app.factory('SignupLoginFactory', function($http, $q) {

    var SignupLoginFactory = {};

    (function(obj) {
        function getData(result) {
            return result.data;
        }

        obj.createUser = function(user) {
            return $http.post('api/users', user)
            .then(getData)
            .catch(function() {
                return $q.reject({message: 'This user already exists!'});
            })
        }

    })(SignupLoginFactory);

    return SignupLoginFactory;

}); 