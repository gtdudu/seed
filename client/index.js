import uiRouter from 'angular-ui-router';
import './assets/style/index.scss';
import HomePage from './components/home.js';

const myApp = angular
  .module('myApp', [uiRouter]);

myApp.config(['$stateProvider', '$locationProvider', ($stateProvider, $locationProvider) => {

  $locationProvider.html5Mode({
    enabled: true,
  });

  $stateProvider.state(HomePage);
}]);
