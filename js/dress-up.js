(function (angular) {

    'use strict';

    var MARKETING_TEAM = ['none', 'male_1', 'male_2', 'female_1', 'female_2'];

    var BODY_PARTS = ['hair', 'face', 'body', 'legs'];

    var app = angular.module('dress-up', []);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when(
            build_url_pattern(),
            {
                templateUrl: 'partials/figure.html',
                controller: 'FigureController'
            }
        );
        $routeProvider.otherwise({redirectTo: build_default_url_pattern()});
    }]);

    app.controller('FigureController', function ($scope, $routeParams) {
        var selected_body_parts = angular.copy($routeParams);
        $scope.selected_body_parts = selected_body_parts;
        $scope.body_parts = BODY_PARTS;
        $scope.marketing_team = MARKETING_TEAM;
        $scope.replace_body_part = function (body_part, team_member) {
            return get_body_part_url(selected_body_parts, body_part, team_member);
        }
    });

    var get_body_part_url = function (selected_body_parts, body_part_to_override, team_member_to_select) {
        var url_parts = [];
        angular.forEach(BODY_PARTS, function (body_part) {
            if (body_part === body_part_to_override) {
                url_parts.push(team_member_to_select);
            } else {
                url_parts.push(selected_body_parts[body_part]);
            }
        });
        return '#/' + url_parts.join('-');
    };

    var build_url_pattern = function () {
        var url_parts = [];
        angular.forEach(BODY_PARTS, function (body_part) {
           url_parts.push(':' + body_part);
        });

        return '/' + url_parts.join('-');
    };

    var build_default_url_pattern = function () {
        var url_parts = [];
        angular.forEach(BODY_PARTS, function () {
           url_parts.push('none');
        });

        return '/' + url_parts.join('-');
    };

})(window.angular);
