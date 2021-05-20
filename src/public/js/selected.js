angular.module('staticSelect', [])
 .controller('ControllerDepa', ['$scope', function($scope) {
   $scope.data = {
    singleSelect: null,
    multipleSelect: [],
    option1: 'option-1'
   };

   $scope.forceUnknownOption = function() {
     $scope.data.singleSelect = 'nonsense';
   };

   $scope.data.singleSelect="";
}]);