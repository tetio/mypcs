(function () {
    'use strict';

    angular
        .module('pcsManagement')
        .controller('ExportFileListCtrl',
            ['exportFileResource', '$scope', '$timeout',
                ExportFileListCtrl]);

    function ExportFileListCtrl(exportFileResource, $scope, $timeout) {
        var vm = this;

        vm.search = '';
        vm.selectedExportFile = null;

        vm.findExportFiles = function () {
            console.log('findExportFiles');
            exportFileResource.query(function (data) {
                vm.gridOptions.data = data;
                if (data.length > 0) {
                    vm.gridApi.grid.modifyRows(vm.gridOptions.data);
                    vm.gridApi.selection.selectRow(vm.gridOptions.data[0]);
                }
            });
        };


        vm.showSelected = function () {
            console.log('getCurrentSelection code: ' + vm.selectedExportFile.code);
        };


        vm.gridOptions = {
            enableSorting: false,
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
                vm.selectedExportFile = row.entity;
                console.log('getCurrentSelection code: ' + vm.selectedExportFile.code);
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
            { field: 'last_modification', cellFilter: 'date:"dd/MM/yyyy HH:mm"', type: 'date', width: 150 }
        ];
    }
} ());
