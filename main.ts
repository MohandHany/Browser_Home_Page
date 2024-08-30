import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// create a scene
const scene = new THREE.Scene();

// create a mesh
const geometry = new THREE.SphereGeometry(2, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: 0xf9e400 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// create a light
const light = new THREE.PointLight(0xffffff, 10, 100);
light.position.set(0, 3, 3);
scene.add(light);

// create a camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight - 164,
};
const camera = new THREE.PerspectiveCamera(45, aspect.width / aspect.height);
camera.position.z = 10;
scene.add(camera);

// create a renderer
const canvas = document.querySelector(".three") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(aspect.width, aspect.height);
renderer.render(scene, camera);

// create an orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// Resize
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();
  renderer.setSize(aspect.width, aspect.height);
  controls.update();

  renderer.render(scene, camera);
}

// Animate
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
