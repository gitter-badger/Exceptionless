(function () {
    'use strict';

    angular.module('app.project')
        .controller('project.Configure', ['$stateParams', 'notificationService', 'tokenService', function ($stateParams, notificationService, tokenService) {
            var projectId = $stateParams.id;

            function getDefaultApiKey() {
                function onSuccess(response) {
                    vm.apiKey = response.data.id;
                }

                function onFailure() {
                    notificationService.error('An error occurred while getting the API key for your project.');
                }

                tokenService.getProjectDefault(projectId).then(onSuccess, onFailure);
            }

            function getProjectTypes() {
                return [
                    { key: 'Exceptionless.Mvc', name: 'ASP.NET MVC', config: 'web.config' },
                    { key: 'Exceptionless.WebApi', name: 'ASP.NET Web API', config: 'web.config' },
                    { key: 'Exceptionless.Web', name: 'ASP.NET Web Forms', config: 'web.config' },
                    { key: 'Exceptionless.Windows', name: 'Windows Forms', config: 'app.config' },
                    { key: 'Exceptionless.Wpf', name: 'Windows Presentation Foundation (WPF)', config: 'app.config' },
                    { key: 'Exceptionless.Nancy', name: 'Nancy', config: 'app.config' },
                    { key: 'Exceptionless', name: 'Console', config: 'app.config' }
                ];
            }

            var vm = this;
            vm.apiKey = null;
            vm.currentProjectType = null;
            vm.projectId = projectId;
            vm.projectTypes = getProjectTypes();

            getDefaultApiKey();
        }
    ]);
}());
