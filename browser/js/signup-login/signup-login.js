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
    $scope.signup = $state.current.name === 'splash-signup';

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        function authLogin(userInfo) {
            return AuthService.login(userInfo)
            .then(function () {
                $state.go('membersOnly'); // NEED TO CHANGE to wherever we want to redirect MEMBERS
            });
        }

        if ($scope.signup) {
            SignupLoginFactory.createUser(loginInfo)
            .then(function(user) {
                authLogin(loginInfo);
            });

        } else {
            authLogin(loginInfo)
            .catch(function () {
                $scope.error = 'Invalid login credentials.';
            });
        }
    };
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