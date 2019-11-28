(function() {
    'use strict';

    angular.module('cdmp.controllers')

    .controller('VideoPlayerController', ['$scope', '$rootScope', '$window', '$document', '$timeout', 'close', '_',
        function($scope, $rootScope, $window, $document, $timeout, close, _) {

            $scope.isModal = true;

            var closeEnabled = true;

            var closeListener = $rootScope.$on('close:modal', function(event, data) {
                close();
            });


            $timeout(function() {
                console.log('picturefill');
                $window.picturefill();
            }, 100);


            $($document).on('keydown.modal', function(e) {
                if (e.keyCode === 27) {
                    $scope.close();
                }
            });

            $scope.$on('close:disable', function(event, data) {
                closeEnabled = false;
            });

            $scope.$on('close:enable', function(event, data) {
                closeEnabled = true;
            });

            $scope.$on('$destroy', function(e) {
                closeListener();

                $($document).off('.modal');
            });


            $scope.close = function() {
                if (closeEnabled) {
                    close();
                }
            };

            $scope.repaint = function($event) {

                if ($(document.activeElement).is('input')) {
                    return;
                }

                var div = $event.currentTarget;
                div.style.display = 'none';
                var tmp = div.offsetHeight;
                div.style.display = 'block';
            };

        }
    ]);

}).call(this);
