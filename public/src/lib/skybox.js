var createSkyBox = function (url, scene) {
    var vertexShader =
        'varying vec2 vUV;' +

        'void main() {' +
        'vUV = uv;' +
        'vec4 pos = vec4(position, 1.0);' +
        'gl_Position = projectionMatrix * modelViewMatrix * pos;' +
        '}';
    var fragmentShader =
        'uniform sampler2D texture;' +
        'varying vec2 vUV;' +

        'void main() {' +
        'vec4 sample = texture2D(texture, vUV);' +
        'gl_FragColor = vec4(sample.xyz, sample.w);' +
        '}';

    new THREE.TextureLoader().load(url, function (texture ) {
        var geometry = new THREE.SphereGeometry(3000, 60, 40);
        var uniforms = {
            texture: { type: 't', value:  texture }
        };

        var material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });

        var skyBox = new THREE.Mesh(geometry, material);
        skyBox.rotateX(Math.PI/4);
        skyBox.scale.set(-1, 1, 1);
        skyBox.eulerOrder = 'XZY';
        skyBox.renderDepth = 1000.0;
        scene.add(skyBox);
    });
};