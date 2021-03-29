<template>
  <div class="home" id="threejs-container"></div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    // scene
    const scene = new THREE.Scene();
    // camera
    const camera = new THREE.PerspectiveCamera(
      99,
      window.innerWidth / window.innerHeight,
      0.1,
      1500
    );
    // render
    const renderer = new THREE.WebGLRenderer();
    const container = document.querySelector("#threejs-container");

    renderer.setSize(
      container.clientWidth - 20 * 2,
      container.clientHeight - 20 * 2
    );
    container.appendChild(renderer.domElement);

    let result = null;
    const animate = () => {
      requestAnimationFrame(animate);
      // result.rotation.x += 0.01;
      // result.rotation.y += 0.01;
      // result.rotation.z += 0.01;
      // result.position.x += 1;
      // result.position.y += 1;
      // result.position.z += 1;
      renderer.render(scene, camera);
    };

    const loader = new THREE.FontLoader();
    loader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      (font) => {
        //
        // geometry
        const geometry = new THREE.TextGeometry("lumi.acntic.agh02", {
          font: font,
          size: 80,
          height: 5,
        });
        // material
        const material = new THREE.MeshBasicMaterial({ color: "#91a8d0" });
        // cube
        result = new THREE.Mesh(geometry, material);
        result.position.x = -40;
        result.position.y = 0;
        result.position.z = 0;

        scene.add(result);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 400;

        animate();
      }
    );
  },
  components: {},
};
</script>
<style scoped>
#threejs-container {
  flex-grow: 1;
  height: calc(100% - 20px * 2);
  padding: 20px;
}
</style>