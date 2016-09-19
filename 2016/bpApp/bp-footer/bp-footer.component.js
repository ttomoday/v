'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('bpFooter').
  component('bpFooter', {
    templateUrl: 'bp-footer/bp-footer.template.html',
    controller: function BpFooterController() {
		console.log("FOOTER");
	}
  });
