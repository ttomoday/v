'use strict';

angular.
  module('bpApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/books', {
          template: '<book-list></book-list>'
        }).
        when('/books/:bookId', {
          template: '<book-detail></book-detail>'
        }).
        when('/genres/', {
          template: '<bp-genres></bp-genres>'
        }).
        when('/authors/', {
          template: '<bp-authors></bp-authors>'
        }).
        when('/news/', {
          template: '<bp-news></bp-news>'
        }).
        otherwise('/books');
    }
  ]);
