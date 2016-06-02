'use strict';

angular.module('app')
    .factory('MainService', function($q, $http) {

        return {

            get_avaible_source_countries: function() {
                var deffered = $q.defer();

                $http({
                    url: "http://localhost:8443/countries",
                    method: "GET"
                }).then(function(response) {
                    deffered.resolve(response);
                }, function(error) {
                    deffered.reject(error);
                });

                return deffered.promise;
            },

            get_target_countries: function(data) {
                var deffered = $q.defer();

                $http({
                    url: "http://localhost:8443/countries/destinations",
                    method: "GET",
                    params: {
                        countryIn: data.id
                    }
                }).then(function(response) {
                    deffered.resolve(response);
                }, function(error) {
                    deffered.reject(error);
                });

                return deffered.promise;
            },

            get_currencies: function(data) {
                var deffered = $q.defer();

                $http({
                    url: "http://localhost:8443/currencies",
                    method: "GET",
                    params: {
                        countryIn: data.countryInID,
                        countryOut: data.countryOutID
                    }
                }).then(function(response) {
                    deffered.resolve(response);
                }, function(error) {
                    deffered.reject(error);
                });

                return deffered.promise;
            },

            get_exchange_rate: function(data) {
                var deffered = $q.defer();

                    $http({
                        url: "http://localhost:8443/exchange-rate",
                        method: "GET",
                        params: {
                          currencyIn: data.currencyInName,
                          currencyOut: data.currencyOutName
                        }
                    }).then(function(response) {
                        deffered.resolve(response);
                    }, function(error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }
        };
    });
