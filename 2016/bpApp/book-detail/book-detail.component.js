'use strict';

angular.
  module('bookDetail').
  component('bookDetail', {
    templateUrl: 'book-detail/book-detail.template.html',
    controller: ['$routeParams', 'Book',
      function BookDetailController($routeParams, Book) {
        var that = this;
        that.book = Book.get({bookId: $routeParams.bookId}, {});
      }
    ]
  });
