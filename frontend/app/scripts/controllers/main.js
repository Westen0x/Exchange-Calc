'use strict';

angular.module('app')
    .controller('MainCtrl', ['$scope', 'MainService', function($scope, MainService) {
        //Var
        $scope.currency_in_val = "100.00";
        $scope.currency_out_val = "";
        $scope.type_exchange = 0;


        $scope.$watch('currency_in_val', function(newVal, oldVal) {
            $scope.currency_in_val = newVal.replace('.', ',');
            let _tmpVal = newVal.replace('.', ',');
            if($scope.currency_in_out !== undefined) {
              get_exchange_rate($scope.currency_in_out.currency_in.name, $scope.currency_in_out.currency_out.name);
            }
        });

        $scope.$watch('currency_out_val', function(newVal, oldVal) {
            $scope.currency_out_val = newVal.replace('.', ',');
            if($scope.currency_in_out !== undefined) {
              get_exchange_rate($scope.currency_in_out.currency_in.name, $scope.currency_in_out.currency_out.name);
            }
        });

        $scope.$watch('country_in', function(newVal, oldVal) {
            if (oldVal !== undefined && newVal !== oldVal) {
                get_target_countries(newVal.id);
            }
        });

        $scope.$watch('country_out', function(newVal, oldVal) {
            if (oldVal !== undefined && newVal !== oldVal) {
                get_currencies($scope.country_in, newVal);
            }
        });

        $scope.$watch('currency_in_out', function(newVal, oldVal) {
            if (oldVal !== undefined && newVal !== oldVal) {
              $scope.type_exchange = 0;
              get_exchange_rate(newVal.currency_in.name, newVal.currency_out.name);
            }
        });


        //Init
        get_avaible_source_countries();



        function get_avaible_source_countries() {
            MainService.get_avaible_source_countries()
                .then(function(res) {
                    $scope.source_countries = res.data;
                    $scope.country_in = res.data[1];
                    get_target_countries($scope.country_in.id)
                }, function(err) {
                    console.log(err);
                });
        }

        function get_target_countries(countryInID) {
            MainService.get_target_countries({
                    id: countryInID
                })
                .then(function(res) {
                    $scope.dest_countries = res.data;
                    $scope.country_out = res.data[0];
                    get_currencies($scope.country_in, $scope.country_out);
                }, function(err) {
                    console.log(err);
                });
        }

        function get_currencies(countryIn, countryOut) {
            MainService.get_currencies({
                    countryInID: countryIn.id,
                    countryOutID: countryOut.id
                })
                .then(function(res) {
                    $scope.currencies = res.data;
                    $scope.currency_in_out = res.data[0];
                    get_exchange_rate($scope.currency_in_out.currency_in.name, $scope.currency_in_out.currency_out.name);
                }, function(err) {
                    console.log(err);
                });
        }

        function get_exchange_rate(currencyInName, currencyOutName) {
            MainService.get_exchange_rate({
                    currencyInName: currencyInName,
                    currencyOutName: currencyOutName
                })
                .then(function(res) {
                  let rate = res.data.rate;
                  if(res.data.is_inverse) {
                    rate = 1/rate;
                  }
                    $scope.currency_out_val = (Math.round(($scope.currency_in_val.replace(',', '.') * rate) * 100) / 100).toString().replace('.', ',');
                    console.log(res);
                }, function(err) {
                    console.log(err);
                });
        }
    }]);
