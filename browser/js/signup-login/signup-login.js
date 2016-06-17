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
            $state.go('membersOnly'); // NEED TO CHANGE to wherever we want to redirect MEMBERS
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
                $scope.error = 'There was an error with your request.';
            });
    }
});

app.factory('SignupLoginFactory', function($http) {

    var SignupLoginFactory = {};

    (function(obj) {
        function getData(result) {
            return result.data;
        }

        obj.createUser = function(user) {
            return $http.post('api/users', user)
            .then(getData);
        }

    })(SignupLoginFactory);

    return SignupLoginFactory;

}); 