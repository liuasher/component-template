<template>
  <div class="home" id="threejs-container"></div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    // dom
    const container = document.querySelector("#threejs-container");

    const STATIC_WIDTH = container.clientWidth - 20 * 2;
    const STATIC_HEIGHT = container.clientHeight - 20 * 2;

    // render
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(STATIC_WIDTH, STATIC_HEIGHT);
    container.appendChild(renderer.domElement);
    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x444444);
    // camera
    const camera = new THREE.PerspectiveCamera(
      75,
      STATIC_WIDTH / STATIC_HEIGHT,
      0.1,
      1500
    );

    /**
     *
     *
     */
    const twoPi = Math.PI * 2;
    const data = {
      radius: 10,
      widthSegments: 8,
      heightSegments: 6,
      phiStart: 0,
      phiLength: twoPi,
      thetaStart: 0,
      thetaLength: Math.PI,
    };
    const geometry = new THREE.SphereGeometry(
      data.radius,
      data.widthSegments,
      data.heightSegments,
      data.phiStart,
      data.phiLength,
      data.thetaStart,
      data.thetaLength
    );
    const material = new THREE.MeshBasicMaterial({
      color: "#0076f6",
      opacity: 0.8,
      transparent: true,
      side: THREE.BackSide,
      visible: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    //
    sphere.position.x = 0;
    sphere.position.y = 0;
    sphere.position.z = 0;

    // light
    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    // group
    const group = new THREE.Group();
    const geometry2 = new THREE.BufferGeometry();
    geometry2.setAttribute("position", new THREE.Float32BufferAttribute([], 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    const meshMaterial = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true,
    });

    group.add(new THREE.LineSegments(geometry, lineMaterial));
    group.add(new THREE.Mesh(geometry, meshMaterial));
    group.add(sphere);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    //
    scene.add(group);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 20;
    /**
     *
     *
     */
    function render() {
      requestAnimationFrame(render);

      group.rotation.x += 0.005;
      group.rotation.y += 0.005;

      renderer.render(scene, camera);
    }
    render();
  },
  components: {},
  methods: {},
};
</script>
<style scoped>
#threejs-container {
  flex-grow: 1;
  height: calc(100% - 20px * 2);
  padding: 20px;
}
</style>