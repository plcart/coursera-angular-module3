
(function () {
    'use strict';

    angular.module("NarrowItDownApp", [])
        .constant('urlBase', 'https://davids-restaurant.herokuapp.com/')
        .controller('NarrowItDownController', ['MenuSearchService', function (MenuSearchService) {
            var ctrl = this;
            ctrl.searchTerm = "";
            ctrl.found = [];

            ctrl.search = function () {
                if (ctrl.searchTerm)
                    MenuSearchService.getMatchedMenuItems(ctrl.searchTerm).then(function (items) {
                        ctrl.found = items;
                        ctrl.message = ctrl.found.length == 0 ? "Nothing found" : "";
                    });
                else
                    ctrl.message = "Nothing found";
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
                restrict: 'E',
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