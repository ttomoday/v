'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('bpHeader').
  component('bpHeader', {
    templateUrl: 'bp-header/bp-header.template.html',
    controller: function BpHeaderController() {
      console.log("HEADER");
    }
  });
