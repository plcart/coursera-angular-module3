
(function () {
    'use strict';

    angular.module("NarrowItDownApp", [])
        .constant('urlBase', 'https://davids-restaurant.herokuapp.com/')
        .controller('NarrowItDownController', ['MenuSearchService', function (MenuSearchService) {
            var ctrl = this;
            ctrl.searchTerm = "";
            ctrl.found = [];

            ctrl.search = function () {
                MenuSearchService.getMatchedMenuItems(ctrl.searchTerm).then(function (items) {
                    ctrl.found = items;
                });
            };

            ctrl.removeItem = function (index) {
                ctrl.found.splice(index, 1);
            };

        }])
        .service('MenuSearchService', ['$http', 'urlBase', function ($http, urlBase) {
            this.getMatchedMenuItems = function (searchTerm) {
                return $http.get(urlBase + "menu_items.json").then(function (result) {
                    var foundItems = result.data.menu_items.filter(function (data) {
                        return -1 != data.description.indexOf(searchTerm);
                    });
                    return foundItems;
                });
            }
        }])
        .directive('foundItems', [function () {
            return {
                templateUrl: "template/item-template.html",
                restrict: 'A',
                scope: {
                    foundItems: '<',
                    onRemove: '&'
                },
                controller: [function () {

                }],
                controllerAs: "ctrl",
                bindToController: true
            }
        }]);

})();