// origin: https://github.com/lucasdnd/spiral-galaxy

var generateSpiralGalaxy = (function () {
    var mouseX = 0, mouseY = 0,
        windowHalfX = window.innerWidth / 2,
        windowHalfY = window.innerHeight / 2,
        camera, scene, renderer, particleSystem;
    var PI2 = Math.PI * 2;
    var starTypes = this.starTypes = {
        default: {
            color: '#fff'
        },
        sun: {
            color: '#FFFCB6'
        },
        blackHole: {
            color: '#000',
            position: new THREE.Vector3(0, 0, 0),
            size: 4
        },
        corpWorld: {
            color: '#8E6C14',
            position: new THREE.Vector3(-2, 0, -8),
            size: .5
        },
        techWorld: {
            color: '#653834',
            position: new THREE.Vector3(5, 0, -1.5),
            size: .8
        },
        teoWorld: {
            color: '#92DA8B',
            position: new THREE.Vector3(1, 0, -0.5),
            size: .4
        },
        magicWorld: {
            color: '#123666',
            position: new THREE.Vector3(2, 0, 3),
            size: .3
        },
        caosWorld: {
            color: '#FF2C2C',
            position: new THREE.Vector3(-2, 0, 8),
            size: 2
        },
        summaWorld: {
            color: '#A9BDE4',
            position: new THREE.Vector3(.6, 0, .6),
            size: 1
        },
        seaWorld: {
            color: '#A9BDE4',
            position: new THREE.Vector3(6, 0, 6),
            size: 1
        }
    };

    function generateSpiralGalaxy(opts) {
        this.opts = opts || {};
        init();
        animate();
        return this;
    }

    generateSpiralGalaxy.VERTEX_SHADER =
        'attribute float size;' +
        'attribute vec3 ca;' +
        'varying vec3 vColor;' +
        'void main() {' +
        'vColor = ca;' +
        'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );' +
        'gl_PointSize = size;' +
        'gl_PointSize = size * ( 100.0 / length( mvPosition.xyz ) );' +
        'gl_Position = projectionMatrix * mvPosition;' +
        '}';

    generateSpiralGalaxy.FRAGMENT_SHADER =
        'uniform vec3 color;' +
        'uniform sampler2D texture;' +
        'uniform sampler2D starTexture;' +
        'varying vec3 vColor;' +
        'void main() {' +
        'gl_FragColor = vec4( color * vColor, 1);' +
        'gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );' +
        '}';

    function init() {
        var galaxy, container;
        container = this.opts.container ? this.opts.container : document.createElement('div');
        !this.opts.container && document.body.appendChild(container);

        camera = this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        camera.position.x = 0;
        camera.position.z = 3.5;
        camera.position.y = 9.3;

        var controls = this.controls = new THREE.OrbitControls(camera, container);
        controls.addEventListener('change', render);
        controls.enabled = typeof opts.controls !== 'undefined' ? opts.controls : true;
        controls.maxDistance = 15;
        controls.noPan = true;
        controls.rotateSpeed = 0.04;
        controls.zoomSpeed = 0.1;
        scene = new THREE.Scene();

        renderer = feature.webGL ? new THREE.WebGLRenderer() : document.textContent = "Your browser does not support WebGL.";
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        // Generate the circle texture
        var circleTexture = new THREE.Texture(generateCircleTexture());
        var starTexture = new THREE.Texture(drawStar(4, 64, 16));
        circleTexture.needsUpdate = true;
        starTexture.needsUpdate = true;
        // Set up the shaders
        attributes = {
            size: { type: 'f', value: [] },
            ca: { type: 'c', value: [] }
        };
        uniforms = {
            amplitude: { type: "f", value: 1.0 },
            color: { type: "c", value: new THREE.Color(0xffffff) },
            texture: { type: "t", value: circleTexture },
            starTexture: { type: "t", value: starTexture },
        };
        uniforms.texture.value.wrapS = uniforms.texture.value.wrapT = THREE.RepeatWrapping;
        var circleShaderMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            attributes: attributes,
            vertexShader: generateSpiralGalaxy.VERTEX_SHADER,
            fragmentShader: generateSpiralGalaxy.FRAGMENT_SHADER,
            transparent: true,
            fog: true
        });
        // Galaxy properties
        var galaxy = new THREE.Geometry();
        var starsPerArm = 300;
        var arms = 5;
        var armAngle = 270 / arms;
        // Create the galaxy structure
        for (arm = 0; arm < arms; arm++) {
            for (i = 0; i <= starsPerArm; i++) {
                radius = i / 40;
                angle = i / 100 + (armAngle * (arm + 1));
                x = radius * Math.cos(angle) + rand();
                y = rand() / 5;
                z = radius * Math.sin(angle) + rand();
                // Add stars
                randResult = Math.random() * (starsPerArm);
                if (randResult < i * i) {
                    galaxy.vertices.push(new THREE.Vector3(x + rand(), y + rand(), z + rand()));
                }
                // Add about 50% more stars with some position variation for a better result
                galaxy.vertices.push(new THREE.Vector3(x, y, z));
                if (rand() >= 0) {
                    galaxy.vertices.push(new THREE.Vector3(x + rand(), y + rand(), z + rand()));
                }
            }
        }
        // universe background
        var starsInBg = 5000;
        for (var i = 0; i < starsInBg; i++) {
            x = rand() * 25;
            y = rand() * 25;
            z = rand() * 25;
            galaxy.vertices.push(new THREE.Vector3(x, y, z));
        }
        // Create the particle system
        particleSystem = this.particleSystem = new THREE.ParticleSystem(galaxy, circleShaderMaterial);
        particleSystem.sortParticles = true;

        // Data to send to the shader
        var vertices = particleSystem.geometry.vertices;
        var values_size = attributes.size.value;
        var values_color = attributes.ca.value;

        // Size/Color variation
        var scale = this.opts.scale || 1;
        for (var v = 0; v < vertices.length; v++) {
            // suns
            if (Math.random() > 0.999) {
                values_size[v] = scale * 4 * rand();
                values_color[v] = new THREE.Color(starTypes.sun.color);
            } else {
                values_size[v] = scale * 1.2 * rand();
                values_color[v] = new THREE.Color(starTypes.default.color);
            }
        }
        // giant black hole
        galaxy.vertices.push(starTypes.blackHole.position);
        attributes.size.value.push(scale * 4);
        attributes.ca.value.push(new THREE.Color(starTypes.blackHole.color));
        // unique worlds
        Object.keys(starTypes).forEach(function (sTypeName) {
            if (sTypeName != 'default' && sTypeName != 'sun') {
                var sType = starTypes[sTypeName];
                galaxy.vertices.push(sType.position);
                attributes.size.value.push(scale * sType.size);
                attributes.ca.value.push(new THREE.Color(sType.color));
            }
        });
        // skybox
        var imagePrefix = "imgs/skybox/BlueNebular-";
        var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
        var imageSuffix = ".jpg";
        var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );	
        var materialArray = [];
        for (var i = 0; i < 6; i++)
            materialArray.push( new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
                side: THREE.BackSide
            }));
        var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
        var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
        // scene.add( skyBox );
        var skybox = createSkyBox('imgs/galaxy3.jpg', scene);
        // yggdrasil
        var yggdrasilTexture = THREE.ImageUtils.loadTexture("imgs/objects/yggdrasil-bg-2.png");
        var yggdrasilMaterial = new THREE.MeshLambertMaterial({ map: yggdrasilTexture, transparent: true, side: THREE.DoubleSide, opacity: 0.8});
        yggdrasilMaterial.map.needsUpdate = true;
        var yggdrasil = this.yggdrasil = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), yggdrasilMaterial);
        yggdrasil.rotateX(Math.PI / 2);
        yggdrasil.rotateZ(Math.PI);
        renderer.sortObjects = false;
        scene.add(yggdrasil);
        // Add the particle system to the scene
        scene.add(particleSystem);
        // Resize listener
        window.addEventListener('resize', onWindowResize, false);
    }
    function generateCircleTexture() {
        // draw a circle in the center of the canvas
        var size = 64;
        // create canvas
        var canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        // get context
        var context = canvas.getContext('2d');
        // draw circle
        var centerX = size / 2;
        var centerY = size / 2;
        var radius = size / 2;
        for (var i = 1; i < 33; i++) {
            context.beginPath();
            context.arc(centerX, centerY, (radius / 2) + (i / 2), 0, 2 * Math.PI, false);
            context.fillStyle = "rgba(255, 255, 255, " + (1 / i) + ")";
            context.fill();
        }
        return canvas;
    }
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function animate() {

        particleSystem.rotation.y += 0.00001;
        // this.yggdrasil.rotation.z -= 0.0001;
        controls.update();
        requestAnimationFrame(animate);
        render();
    }
    function render() {
        // camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
    function rand() {
        return Math.random() - 0.5;
    }
    function getRandomColor() {
        var whiteStars = 20;
        var colors = [starTypes.sun.color];
        for (var i = 0; i < whiteStars; i++) {
            colors.push(starTypes.default.color);
        }
        return colors[Math.floor(Math.random() * colors.length)];
    }

    return generateSpiralGalaxy;
})();