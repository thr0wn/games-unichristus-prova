// url http://codepen.io/citylims/pen/vNRPxK

// generateUniverse(15);
function generateUniverse(galaxies, opts) {
    opts = opts || {};

    // setting the scene
    var space = "#151718";
    var canvas_height = window.innerHeight;
    var canvas_width = window.innerWidth;
    var scene = new THREE.Scene();

    //cam
    var camera = new THREE.PerspectiveCamera(75, canvas_width / canvas_height, 0.1, 1000);
    camera.position.set(0, 50, 1200);
    camera.lookAt(new THREE.Vector3(0, 50, 0));

    //renderer
    var renderer = new THREE.WebGLRenderer({
        alpha: true,
        canvas: opts.canvas
    });
    renderer.setSize(canvas_width, canvas_height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(space, 1);
    document.body.appendChild(renderer.domElement);

    //window
    window.onresize = function () {
        canvas_height = window.innerHeight;
        canvas_width = window.innerWidth;
        camera.aspect = canvas_width / canvas_height;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas_width, canvas_height);
    }

    //controls
    if (opts.controls) {
        controls = new THREE.OrbitControls(camera);
        controls.damping = 0.2;
        controls.maxDistance = 900;
    }

    //particle objects
    THREE.ImageUtils.crossOrigin = true;

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return '#FFF';
    }

    function Particles(num) {
        this.particleArray = []
        for (var i = 0; i < num; i++) {
            var c = getRandomColor();
            var o = Math.floor(Math.random() * (100 - 0 + 1)) / 100;
            var s = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
            var particleCount = Math.floor(Math.random() * (1000 - 250 + 1)) + 250;
            var particle = {
                color: c,
                opacity: o,
                size: s,
                number: particleCount
            }
            this.particleArray.push(particle);
        }
    }

    function ParticleMaterial(c, s, o) {
        this.material = new THREE.PointsMaterial({
            color: c,
            size: s,
            transparent: true,
            opacity: o,
            map: new THREE.TextureLoader().load(
                "imgs/gradient.png"
            )
        });
    }

    function ParticleSystem(number) {
        this.particles = new THREE.Geometry();
        for (var i = 0; i < number; i++) {
            var x = (Math.random() - 0.5) * 2000;
            var y = (Math.random() - 0.5) * 1100;
            var z = (Math.random() - 0.5) * 2000;
            this.particles.vertices.push(new THREE.Vector3(x, y, z));
        }
    };

    function ParticleUniverse(particles) {
        this.galaxies = [];
        var pArr = particles.particleArray;
        for (var i = 0; i < pArr.length; i++) {
            var customParticle = new ParticleMaterial(pArr[i].color, pArr[i].size, pArr[i].opacity);
            var pMaterial = customParticle.material;
            var customSystem = new ParticleSystem(pArr[i].number);
            var pSystem = customSystem.particles;
            var pObject = {
                material: pMaterial,
                system: pSystem
            };
            this.galaxies.push(pObject);
        }
    }

    function createUniverse(universe) {
        var galaxies = universe.galaxies;
        for (var i = 0; i < galaxies.length; i++) {
            var galaxy = new THREE.Points(galaxies[i].system, galaxies[i].material);
            scene.add(galaxy);
        }
    };

    var particles = new Particles(galaxies);
    var universe = new ParticleUniverse(particles);

    createUniverse(universe);

    // render
    var render = function () {
        requestAnimationFrame(render);
        animation();
        renderer.render(scene, camera);
    };
    //animations
    function animation() {
        scene.rotation.y -= .00002;
    };

    render();
};