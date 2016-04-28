angular.module('gu')
    .controller('rootCtrl',
    function (
        $rootScope
    ) {
        generateUniverse(15);
    });

