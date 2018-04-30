var module = angular.module("ngDairyApp", []);

// one controller for project
module.controller('itemCtrl', function ($scope) {

  // array for storing items with comments
  $scope.items = [];
  
  // index of selected item
  $scope.currentIndex;

  // btn click "Add new"
  $scope.addNewItem = function () {
    $scope.items.push({ "name": $scope.newItem, "comments": [] });
    $scope.newItem = "";
    $scope.save();
  };

  // mouse click on item
  $scope.setItem = function ($index) {
    $scope.currentIndex = $index;
  };

  // add css class to highlight selected item row  
  $scope.isCurrent = function ($index) {
    if ($index == $scope.currentIndex)
      return "current";
  };

  // btn click "Delete"
  $scope.deleteItem = function (item) {
    var index = $scope.items.indexOf(item);
    $scope.items.splice(index, 1);
    // Save changes in Local Storage
    $scope.save();
  };

  // Save application data in Local Storage 
  $scope.save = function () {
    localStorage.setItem('items', angular.toJson($scope.items));
  }

  // Load application data from Local Storage
  $scope.load = function () {
    var items = angular.fromJson(localStorage.getItem('items'));

    if (items) {
      $scope.items = [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].name) {
          $scope.items.push(items[i]);
        }
      }
    }
  }

  // Check "Ctrl + Enter" keys pressed in comment input textarea 
  $scope.checkCtrlEnterKeyPressed = function ($event) {
    var keyCode = $event.which || $event.keyCode;


    // "Ctrl + Enter" pressed
    if ($event.ctrlKey && (keyCode === 13 || keyCode === 10)) {

      $scope.items[$scope.currentIndex].comments.push({ 'text': $scope.newComment });
      $scope.newComment = "";
      // Save changes in Local Storage
      $scope.save();
    }
  }

  // add css class to change avatar placeholder color
  $scope.getColor = function ($currentIndex) {
    if ($currentIndex % 2 == 0)
      return "orange";
    else
      return "blue";
  };

  // disable comment input textarea if parent item not selected 
  $scope.disableTextArea = function ($currentIndex) {    
    if (typeof ($currentIndex) === 'number')
      return 0;
    else
      return 1;
  };

});










