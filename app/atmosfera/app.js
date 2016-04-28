angular.module('app', ['youtube-embed'])

    .controller('AppController', function ($scope, $timeout) {
        $scope.playerVars = {
            initPlayer: {
                vid: '2KepR5T3fQY',
                start: 21,
                end: 65
            },
            annotationPlayer: {
                vid: '2KepR5T3fQY',
                start: 530,
                end: 605
            },
            lantern1Player: {
                vid: 'csUIkPXuy3U',
                start: 30,
                end: 50
            },
            lantern2Player: {
                vid: 'csUIkPXuy3U',
                start: 820,
                end: 880
            }
        };
        
        $scope.enableBgPlayer = typeof localStorage.getItem('enableBgPlayer') === 'string' ?
            localStorage.getItem('enableBgPlayer') === 'true' : true;

        $scope.$on('youtube.player.ready', function ($event, player) {
            if (player === $scope.bgPlayer && $scope.enableBgPlayer) {
                $scope.bgPlayer.playVideo();
            }
        });

        $scope.$on('youtube.player.playing', function ($event, player) {
            refreshBgPlayer(player);
        });

        $scope.$on('youtube.player.paused', function ($event, player) {
            refreshBgPlayer(player);
        });

        $scope.$on('youtube.player.ended', function ($event, player) {
            var playerVars = getPlayerVars(player.getVideoData().video_id);
            player.loadVideoById({
                videoId: playerVars.vid,
                startSeconds: playerVars.start,
                endSeconds: playerVars.end
            });
            player.pauseVideo();
            refreshBgPlayer(player);
        });
        
         $scope.$on('youtube.player.error', function ($event, player) {
            refreshBgPlayer(player);
        });
 
        $timeout(function() {
            angular.element('.container').fadeIn(10000);
        }, 5000);

        function getPlayerVars(vid) {
            for (key in $scope.playerVars) {
                var playerVars = $scope.playerVars[key];
                if (playerVars.vid === vid) {
                    return playerVars;
                }
            }
        }
        
        $scope.toggleEnableBgPlayer = function() {
            $scope.enableBgPlayer = !$scope.enableBgPlayer;
            if($scope.enableBgPlayer && $scope.bgPlayer) {
                $scope.bgPlayer.playVideo();
            } else if($scope.bgPlayer) {
                $scope.bgPlayer.pauseVideo();
            }
            localStorage.setItem('enableBgPlayer', $scope.enableBgPlayer);
        };

        function refreshBgPlayer(player) {
            if (player !== $scope.bgPlayer) {
                for (key in $scope.playerVars) {
                    var player = $scope[key];
                    if (player && player.getPlayerState() === 1) {
                        $scope.bgPlayer.pauseVideo();
                        return;
                    }
                }
                if($scope.enableBgPlayer) {
                    $scope.bgPlayer.playVideo();
                }
            }
        }
    });