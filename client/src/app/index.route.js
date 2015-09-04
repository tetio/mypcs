(function() {
  'use strict';

  angular
    .module('pcsManagement')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .state('companyList', {
        url: '/company',
        templateUrl: 'app/company/companyListView.html',
        controller: 'CompanyListCtrl',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
