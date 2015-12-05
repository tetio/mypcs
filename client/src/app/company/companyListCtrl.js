(function () {
    'use strict';
    angular
        .module('pcsManagement')
        .controller('CompanyListCtrl',
            ['companyResource', '$scope', '$timeout', 'ngDialog',
                CompanyListCtrl]);

    function CompanyListCtrl(companyResource, $scope, $timeout, ngDialog) {
        var vm = this;

        vm.search = '';
        vm.selectedCompany = null;

        vm.findCompanies = function () {
            vm.gridOptions.data = [];
            console.log('findCompanies');
            companyResource.query(function (data) {
                vm.gridOptions.data = data;
                if (data.length > 0) {
                    vm.gridApi.grid.modifyRows(vm.gridOptions.data);
                    // vm.gridApi.selection.selectRow(vm.gridOptions.data[0]);
                }
            });
        };

        vm.createCompany = function () {
            vm.newCompany = null;
            ngDialog.open({ template: 'app/company/companyCreate.html' });
        };

        vm.editCompany = function () {
            ngDialog.openConfirm({
                template: 'app/company/companyEdit.html',
                className: 'ngdialog-theme-default',
                controller: 'CompanyEditCtrl as vm',
                resolve: {
                    companyResource: 'companyResource',
                    company: function (companyResource) {
                        return companyResource.get({ companyId: vm.selectedCompany._id }).$promise;
                    }
                }
            }).then(function (value) {
                value.lastModification = new Date();
                value.$save(function (data) {
                    vm.findCompanies();
                });
            }, function (reason) {
                console.log('Modal promise rejected. Reason: ', reason);
            });
        };

        vm.showSelected = function () {
            console.log('getCurrentSelection code: ' + vm.selectedCompany.code);
        };

        vm.isSelected = function () {
            return vm.selectedCompany !== null;
        };


        vm.gridOptions = {
            enableSorting: true,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            modifierKeysToMultiSelect: false,
            noUnselect: true
        };
        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                var msg = 'row selected ' + row.isSelected;
                console.log(msg);
                vm.selectedCompany = row.entity;
                console.log('getCurrentSelection code: ' + vm.selectedCompany.code);

            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                var msg = 'rows changed ' + rows.length;
                console.log(msg);
            });
        };
        //vm.gridOptions.data = 'vm.companies';
        vm.gridOptions.columnDefs = [
            { field: '_id', displayName: 'id' },
            { field: 'name' },
            { field: 'code', width: 100 },
            { field: 'situation', width: 100 },
            { field: 'lastModification', cellFilter: 'date:"dd/MM/yyyy HH:mm"', type: 'date', width: 150 }
        ];
    }
} ());
