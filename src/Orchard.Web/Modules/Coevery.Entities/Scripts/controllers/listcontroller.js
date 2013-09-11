﻿'use strict';

define(['core/app/detourService', 'Modules/Coevery.Entities/Scripts/services/entitydataservice'], function (detour) {
    detour.registerController([
      'EntityListCtrl',
      ['$rootScope', '$scope', 'logger', '$detour', '$resource', '$stateParams', 'entityDataService', 
      function ($rootScope, $scope, logger, $detour, $resource, $stateParams, entityDataService) {
          var cellTemplateString = '<div class="ngCellText" ng-class="col.colIndex()" title="{{COL_FIELD}}">' +
              '<ul class="row-actions pull-right hide">' +
              '<li class="icon-edit" ng-click="edit(row.entity.Name)" title="Edit"></li>' +
              '<li class="icon-remove" ng-click="delete(row.entity.Name)" title="Delete"></li>' +
              '</ul>' +
              '<span class="btn-link" ng-click="view(row.entity.Name)">{{COL_FIELD}}</span>' +
              '</div>';
          $scope.selectedItems = [];

          var t = function (str) {
              var result = i18n.t(str);
              return result;
          };

          var metadataColumnDefs = [
              { field: 'DisplayName', displayName: t('DisplayName'), cellTemplate: cellTemplateString },
              { field: 'IsDeployed', displayName: t('IsDeployed') }];

          $scope.pagingOptions = {
              pageSizes: [50, 100, 200],
              pageSize: 50,
              currentPage: 1
          };

          $scope.totalServerItems = 2;

          $scope.gridOptions = {
              data: 'myData',
              enablePaging: true,
              showFooter: true,
              multiSelect: true,
              enableRowSelection: true,
              showSelectionCheckbox: true,
              selectedItems: $scope.selectedItems,
              columnDefs: metadataColumnDefs,
              pagingOptions: $scope.pagingOptions
          };

          angular.extend($scope.gridOptions, $rootScope.defaultGridOptions);

          $scope.delete = function (entityName) {
              $scope.entityName = entityName;
              $('#myModalEntity').modal({
                  backdrop: 'static',
                  keyboard: true
              });
          };

          $scope.deleteEntity = function () {
              $('#myModalEntity').modal('hide');
              entityDataService.delete({ name: $scope.entityName }, function () {
                  if ($scope.selectedItems.length != 0) {
                      $scope.selectedItems.pop();
                  }
                  $scope.getAllMetadata();
                  logger.success("Delete the entity successful.");
              }, function (reason) {
                  logger.error("Failed to delete the entity:" + reason);
              });
          };

          $scope.add = function () {
              $detour.transitionTo('EntityCreate', { Module: 'Entities' });
          };

          $scope.view = function (entityName) {
              $detour.transitionTo('EntityDetail.Fields', { Id: entityName });
          };

          $scope.edit = function (entityName) {
              $detour.transitionTo('EntityEdit', { Id: entityName });
          };

          $scope.getAllMetadata = function () {
              var metadatas = entityDataService.query(function () {
                  $scope.myData = metadatas;
                  $scope.totalServerItems = metadatas.length;
              }, function () {
                  logger.error("Failed to fetched Metadata.");
              });
          };

          $scope.getAllMetadata();
      }]
    ]);
});