angular.module('gu')
	.controller('rootCtrl', [
		'$rootScope',
		'$timeout',
		'characters',
		'worlds',
		function ($rootScope, $timeout, characters, worlds) {
			// webglCheck
			if(!feature.webGL) {
				$rootScope.webGlDisabled = true;
				return;
			}
			// characters
			$rootScope.characters = characters;
			$rootScope.selectCharacter = function (ch) {
				if ($rootScope.selectedWorld) {
					$rootScope.selectedWorld = null;
				}
				$rootScope.selectedCharacter = ch;
			};
			// worlds
			$rootScope.worlds = worlds;
			$rootScope.selectWorld = function (world) {
				if ($rootScope.selectedCharacter) {
					$rootScope.selectedCharacter = null;
				}
				if (world) {
					lookAt(world ? getStarPosition(world.starKey) : galaxy.controls.position0)
						.onComplete(function () {
							$timeout(function () { $rootScope.selectedWorld = world });
						});
				} else {
					$rootScope.selectedWorld = null;
					lookAt(galaxy.controls.position0);
				}

			};

			// orbit controls and camera
			$rootScope.orbitControls = false;
			$rootScope.toggleOrbitControls = function () {
				$rootScope.orbitControls = !$rootScope.orbitControls;
				galaxy.controls.enabled = $rootScope.orbitControls;
			};
			$rootScope.resetCamera = function () {
				lookAt(galaxy.controls.position0);
			};

			// generateUniverse(10, { canvas: angular.element('#main-canvas')[0], controls: true });
			var galaxy = generateSpiralGalaxy({
				controls: $rootScope.orbitControls,
				container: angular.element('#canvas-container')[0],
				scale: 1.1
			});

			// look at and tween
			function lookAt(position) {
				var offset = position.clone().normalize().multiplyScalar(.45);
				var target = position.clone().add(offset);

				return new TWEEN.Tween(galaxy.camera.position)
					.to(target, 3000)
					.start()
			}

			function getStarPosition(starKey) {
				var starType = galaxy.starTypes[starKey];
				var localPosition = starType.position.clone();
				var actualPosition = galaxy.particleSystem.localToWorld(localPosition).clone();
				return actualPosition;
			}

			requestAnimationFrame(animate);

			function animate(time) {
				requestAnimationFrame(animate);
				TWEEN.update(time);
			}
		}
	]);

