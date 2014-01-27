/*function AlertDemoCtrl($scope, $timeout) {
  $scope.alerts = [];

  $scope.addAlert = function() {
    
    var alert = {msg: "Another alert!"};    
    $scope.alerts.push(alert);
    
      $timeout(function(){
        $scope.closeAlert($scope.alerts.indexOf(alert));
      }, 1500);

  };

  $scope.closeAlert = function(index) {
    alert.expired = true;
    $scope.alerts.splice(index, 1);
  };

}*/

