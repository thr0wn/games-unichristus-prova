angular.module('gu')
    .controller('rootCtrl', [
        '$rootScope',
        function ($rootScope) {
            generateUniverse(10, { canvas: angular.element('#main-canvas')[0], controls: true });
        }
    ]);

