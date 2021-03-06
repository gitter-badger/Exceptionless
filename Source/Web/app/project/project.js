(function () {
    'use strict';

    angular.module('app.project', [
        'exceptionless.dialog',
        'exceptionless.project',
        'exceptionless.projects',
        'exceptionless.stack',
        'exceptionless.stacks',
        'exceptionless.stat',
        'exceptionless.token',
        'exceptionless.web-hook',

        'angular-rickshaw',
        'ui.router',
        'checklist-model',
        'debounce',

        // Custom dialog dependencies
        'ui.bootstrap',
        'dialogs.main',
        'dialogs.default-translations'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app.project', {
            abstract: true,
            url: '/project',
            template: '<ui-view/>'
        });

        $stateProvider.state('app.project.add', {
            url: '/add',
            controller: 'project.Add',
            controllerAs: 'vm',
            templateUrl: 'app/project/add.tpl.html'
        });

        $stateProvider.state('app.project.configure', {
            url: '/:id/configure',
            controller: 'project.Configure',
            controllerAs: 'vm',
            templateUrl: 'app/project/configure.tpl.html'
        });

        $stateProvider.state('app.project.dashboard', {
            url: '/:id/dashboard',
            controller: 'project.Dashboard',
            controllerAs: 'vm',
            templateUrl: 'app/project/dashboard.tpl.html',
            params: {
                id: function() {
                    // TODO: Resolve current project id from service.
                    return '537650f3b77efe23a47914f4';
                }
            }
        });

        $stateProvider.state('app.project.frequent', {
            url: '/:id/frequent',
            controller: 'project.Frequent',
            controllerAs: 'vm',
            templateUrl: 'app/project/frequent.tpl.html'
        });

        $stateProvider.state('app.project.list', {
            url: '/:id/list',
            controller: 'project.List',
            controllerAs: 'vm',
            templateUrl: 'app/project/list.tpl.html'
        });

        $stateProvider.state('app.project.manage', {
            url: '/:id/manage',
            controller: 'project.Manage',
            controllerAs: 'vm',
            templateUrl: 'app/project/manage/manage.tpl.html'
        });

        $stateProvider.state('app.project.new', {
            url: '/:id/new',
            controller: 'project.New',
            controllerAs: 'vm',
            templateUrl: 'app/project/new.tpl.html'
        });

        $stateProvider.state('app.project.recent', {
            url: '/:id/recent',
            controller: 'project.Recent',
            controllerAs: 'vm',
            templateUrl: 'app/project/recent.tpl.html'
        });
    })
    .run(['$urlMatcherFactory', function($urlMatcherFactory){
        // Required for default params.
    }]);
}());
