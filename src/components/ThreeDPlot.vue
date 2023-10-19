<template>
  <div ref="sceneContainer"></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default {
  mounted() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      800 / 600,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);
    this.$refs.sceneContainer.appendChild(renderer.domElement);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    const circleRadius = 1;
    const circleSegments = 10;
    const circleShape = new THREE.Shape();
    circleShape.moveTo(circleRadius, 0);
    for (let i = 1; i <= circleSegments; i++) {
      const theta = (i / circleSegments) * Math.PI * 2;
      const x = circleRadius * Math.cos(theta);
      const y = circleRadius * Math.sin(theta);
      circleShape.lineTo(x, y);
    }

    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: false,
    };

    const circleGeometry = new THREE.ExtrudeGeometry(circleShape, extrudeSettings);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.rotation.x = -Math.PI / 2
    scene.add(circle);
    
    scene.fog = new THREE.Fog(0x000000, 5, 15);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', () => {
      camera.lookAt(circle.position);
    });
    controls.update();

    const objectBoundingSphere = new THREE.Sphere();
    const objectBounding = new THREE.Box3().setFromObject(circle);
    objectBounding.getBoundingSphere(objectBoundingSphere);
    
    // Set the camera's position based on the object's bounding sphere
    camera.position.copy(objectBoundingSphere.center)
      .add(new THREE.Vector3(0, 0, objectBoundingSphere.radius * 2));

    camera.lookAt(objectBoundingSphere.center);

    // Create a grid based on the object's dimensions
    const gridHelper = new THREE.GridHelper(
      objectBounding.getSize(new THREE.Vector3()).length() * 2,
      objectBounding.getSize(new THREE.Vector3()).length() / 10
    );
    scene.add(gridHelper);

    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>