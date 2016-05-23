'use strict';

angular.module('app')
    .factory('MainService', function($q, $http) {

        return {

            get_avaible_source_countries: function() {
                var deffered = $q.defer();

                $http.get('http://localhost:3000/countries')
                    .then(function(response) {
                        deffered.resolve(response);
                    }, function(error, status) {
                        if (status == 404) {
                            deffered.resolve(null);
                        } else {
                            deffered.reject(error);
                        }
                    });

                return deffered.promise;
            },

            get_target_countries: function(data) {
                var deffered = $q.defer();

                $http.post('http://localhost:3000/countries/destinations', {
                        countryIn: data.id
                    })
                    .then(function(response) {
                        deffered.resolve(response);
                    }, function(error, status) {
                        if (status == 404) {
                            deffered.resolve(null);
                        } else {
                            deffered.reject(error);
                        }
                    });

                return deffered.promise;
            },

            get_currencies: function(data) {
                var deffered = $q.defer();

                $http.post('http://localhost:3000/currencies', {
                        countryIn: data.countryInID,
                        countryOut: data.countryOutID
                    })
                    .then(function(response) {
                        deffered.resolve(response);
                    }, function(error, status) {
                        if (status == 404) {
                            deffered.resolve(null);
                        } else {
                            deffered.reject(error);
                        }
                    });

                return deffered.promise;
            },

            get_exchange_rate: function(data) {
                var deffered = $q.defer();

                $http.post('http://localhost:3000/exchange-rate', {
                        currencyIn: data.currencyInName,
                        currencyOut: data.currencyOutName
                    })
                    .then(function(response) {
                        deffered.resolve(response);
                    }, function(error, status) {
                        if (status == 404) {
                            deffered.resolve(null);
                        } else {
                            deffered.reject(error);
                        }
                    });

                return deffered.promise;
            }
        };
    });
