'use strict';
angular.
  module('bookList').
  component('bookList', {
    templateUrl: 'book-list/book-list.template.html',
    controller: ['Book',
      function BookListController(Book) {
        var that = this;
        
        that.books = Book.query();
        that.orderProp = 'year';

        that.getNumber = function(num) {
          return new Array(num);
        }
      }
    ]
  });
