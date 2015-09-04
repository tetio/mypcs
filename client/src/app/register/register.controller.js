(function () {
	'use strict';

	angular
		.module('pcsManagement')
		.controller('RegisterController', RegisterController);

	function RegisterController() {
		var vm = this;
		vm.name = "";
		vm.surname = "";

		vm.sections = [
			{value:0, name:'None'},
			{value:1, name:'Home'},
			{value:2, name:'Administration'},
			{value:3, name:'Reports'}
		];

		vm.selectedSection = 3;
		vm.selectedUserType = 1;


		vm.submit = function() {
			vm.message = "Welcome "+vm.name+" "+vm.surname+"!";
		};

	}

})();