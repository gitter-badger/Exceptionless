(function() {
    'use strict';

    angular.module('exceptionless.projects', [
        'exceptionless.dialog',
        'exceptionless.link',
        'exceptionless.notification',
        'exceptionless.project'
    ])
    .directive('projects', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                settings: "="
            },
            templateUrl: 'components/projects/projects-directive.tpl.html',
            controller: ['$rootScope', '$scope', '$window', '$state', 'dialogService', 'linkService', 'notificationService', 'projectService', function ($rootScope, $scope, $window, $state, dialogService, linkService, notificationService, projectService) {
                var settings = $scope.settings;
                var vm = this;

                function get(options) {
                    settings.get(options).then(function (response) {
                        vm.projects = response.data.plain();

                        var links = linkService.getLinksQueryParameters(response.headers('link'));
                        vm.previous = links['previous'];
                        vm.next = links['next'];
                    });
                }

                function hasProjects() {
                    return vm.projects && vm.projects.length > 0;
                }

                function open(id, event) {
                    // TODO: implement this.
                    if (event.ctrlKey || event.which === 2) {
                        $window.open('/#/project/dashboard/' + id, '_blank');
                    } else {
                        $state.go('app.project.dashboard', { id: id });
                    }
                }

                function nextPage() {
                    get(vm.next);
                }

                function previousPage() {
                    get(vm.previous);
                }

                function remove(project) {
                    return dialogService.confirmDanger('Are you sure you want to remove the project?', 'REMOVE PROJECT').then(function() {
                        function onSuccess() {
                            vm.projects.splice(vm.projects.indexOf(project), 1);
                        }

                        function onFailure() {
                            notificationService.error('An error occurred while trying to remove the project.');
                        }

                        return projectService.remove(project.id).then(onSuccess, onFailure);
                    });
                }

                var unbind = $rootScope.$on('ProjectChanged', function(e, data){
                    if ($scope.previous === undefined)
                        get($scope.settings.options);
                });

                $scope.$on('$destroy', unbind);

                vm.hasProjects = hasProjects;
                vm.nextPage = nextPage;
                vm.open = open;
                vm.previousPage = previousPage;
                vm.projects = [];
                vm.remove = remove;

                get(settings.options);
            }],
            controllerAs: 'vm'
        };
    });
}());
