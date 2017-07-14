module.controller('DatePickerCtrl', ['$scope', '$mdDialog', '$mdMedia', function ($scope, $mdDialog, $mdMedia) {
    var self = this;
    var setMoment;

    this.showPopup = false;
    this.strDate = '';
    this.format = 'YYYY-MM-DD HH:mm:ss';
    this.currentDate = new Date();
    setMoment = function () {
        this.currentDate = $scope.ngModel.$modelValue || new Date();
        this.currentMoment = moment(self.currentDate);
        this.weekDays = moment.weekdaysMin();

        this.hour = this.currentMoment.hours();
        this.minute = this.currentMoment.minutes();
        this.second = this.currentMoment.seconds();
        $scope.year = this.currentMoment.year();
        for (var i = 1900; i <= (this.currentMoment.year() + 12); i++) {
            $scope.yearsOptions.push(i);
        }
        $scope.ngModel.$modelValue && (this.strDate = moment(this.currentMoment.toDate()).format(this.format));
//        $scope.ngModel.$setViewValue(this.currentMoment.toDate());

    }.bind(this);

    $scope.$watch("$scope.ngModel.$modelValue", function () {
        setMoment();
        $scope.ngModel.$formatters.push(function(data){
            !data && (self.strDate = '');
        });
    });
    //setMoment();

    $scope.$mdMedia = $mdMedia;
    $scope.yearsOptions = [];

    this.setYear = function () {
        self.currentMoment.year($scope.year);
    };
    
    this.selectDate = function (dom) {
        self.currentMoment.date(dom);
    };
    
    this.cancel = function () {
        self.showPopup = false;
    };
    
    this.confirm = function () {

        self.currentMoment.minute(self.minute);
        self.currentMoment.hour(self.hour);
        self.currentMoment.second(self.second);

        $scope.ngModel.$setViewValue(self.currentMoment.toDate());
//        $scope.ngModel.$render();
        self.strDate = moment(self.currentMoment.toDate()).format(self.format);
        self.cancel();
    };
    
    this.getDaysInMonth = function () {
        var days = self.currentMoment.daysInMonth(),
            firstDay = moment(self.currentMoment).date(1).day();
        
        var arr = [];
        for (var i = 1; i <= (firstDay + days); i++)
            arr.push(i > firstDay ? (i - firstDay) : false);
        
        return arr;
    };
    
    this.nextMonth = function () {
        self.currentMoment.add(1, 'months');
        $scope.year = self.currentMoment.year();
    };
    
    this.prevMonth = function () {
        self.currentMoment.subtract(1, 'months');
        $scope.year = self.currentMoment.year();
    };

    this.togglePopup = function () {
        self.showPopup = true;
    };
}]);

module.provider("$mdDatePicker", function () {
    var LABEL_OK = "ok",
        LABEL_CANCEL = "cancel";

    this.setOKButtonLabel = function (label) {
        LABEL_OK = label;
    };

    this.setCancelButtonLabel = function (label) {
        LABEL_CANCEL = label;
    };

    this.$get = ["$rootScope", function ($rootScope) {
        var datePicker = function (targetEvent, currentDate) {
            if (!angular.isDate(currentDate)) {
                currentDate = Date.now();
            }

            $rootScope.$broadcast('showDialog', {
                targetEvent: targetEvent,
                currentDate: currentDate
            });
        };

        return datePicker;
    }];
});

module.directive("mdDatePicker", ["$document", "$timeout", function ($document, $timeout) {
    return {
        restrict: 'AE',
        require: '?ngModel',
        controller: 'DatePickerCtrl',
        controllerAs: 'datepicker',
        templateUrl: 'js/partials/directives/mdPickers.html',
        transclude: true,
        scope: true,
        bindToController: {
            title: '='
        },
        link: function ($scope, $ele, $attrs, ngModel) {
            $scope.ngModel = ngModel;
        },
        compile1: function ($ele, $attrs, transcludeFn) {
            return function ($scope, $ele, $attrs, ngModel) {

                $scope.ngModel = ngModel;

//                transcludeFn($scope, function (clone) {
//                    $timeout(function () {
//                        var con = $ele.find('.md-dialog-container');
//
//                        angular.element(document.body).append(con);
//
//                        $ele.append(clone);
//                    }, 10);
//                });
            };
        }
    }
}]);