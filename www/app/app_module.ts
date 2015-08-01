import angular from 'angular'
import 'angular-ui-router'
import 'angular-animate'
import '../common/coNotification'
import 'calleboketoft/coDebug'
import 'calleboketoft/coSelectableItems'
import httpInterceptors from '../common/coHttpInterceptors'

import ListController from './ListController'
import listTemplate from './listTemplate.html!text'
import ItemController from './ItemController'
import itemTemplate from './itemTemplate.html!text'
import RecipeService from './RecipeService'

export default angular.module('app', ['ui.router', 'coNotification', 'ngAnimate', 'coSelectableItems'])
.config(appConfigFun)
.config(httpInterceptors) // Add http interceptors
.run(appRunFunction)
.controller('ListController', ListController)
.controller('ItemController', ItemController)
.service('recipeService', RecipeService)

appConfigFun.$inject = ['$stateProvider', '$urlRouterProvider']
function appConfigFun ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/')
  $stateProvider.state('root', {
    url: '/',
    controller: 'ListController as vm',
    template: listTemplate,
    resolve: {
      allFiles: ['recipeService', function (recipeService) {
        return recipeService.fetchFiles()
      }]
    }
  })

  $stateProvider.state('root.item', {
    url: ':itemId',
    controller: 'ItemController as vm',
    template: itemTemplate,
    resolve: {
      recipe: ['recipeService', '$stateParams', 'allFiles', (recipeService, $stateParams, allFiles) => {
        return recipeService.getRecipe($stateParams.itemId)
      }]
    }
  })
}

/*****************
 * ROUTING DEBUG *
 *****************/
appRunFunction.$inject = ['$rootScope', '$window']
function appRunFunction ($rootScope, $window) {
  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
    $window.console.debug('stateChangeStart:   ' + toState.name)
  })
  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    $window.console.error('stateChangeError:   ' + toState.name, error)
  })
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $window.console.debug('stateChangeSuccess: ' + toState.name)
  })
}