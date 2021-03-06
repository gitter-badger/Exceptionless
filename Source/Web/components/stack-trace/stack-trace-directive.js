(function() {
    'use strict';

    angular.module('exceptionless.stack-trace', [
        'angular-filters',
        'exceptionless.error'
    ])
    .directive('stackTrace', ['errorService', function(errorService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                exception: "="
            },
            templateUrl: 'components/stack-trace/stack-trace-directive.tpl.html',
            controller: ['$scope', function ($scope) {
                var vm = this;
                vm.exceptions = errorService.getExceptions($scope.exception);
            }],
            controllerAs: 'vm'
        };
    }]);
}());
