import * as THREE from "three";
import Node from "./objects/node";


const NETWORK_SIZE = 20;

let nodeNetwork = [];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function addLight(x, y, z) {
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(x, y, z);
  scene.add(light);
}
addLight(-1, 2, 4);
addLight(1, -1, -2);


camera.position.z = 30;
camera.position.x = 10;
camera.position.y = 10;

for(let i = 0; i < 50; i++) {

    let newNode = new Node(Math.round(Math.random() * NETWORK_SIZE),Math.round(Math.random() * NETWORK_SIZE), Math.round(Math.random() * NETWORK_SIZE), scene);

    nodeNetwork.push(newNode);
}

nodeNetwork.forEach((node, index) => {
    node.connect(nodeNetwork, index, scene);
})



function animate() {
  requestAnimationFrame(animate);

  nodeNetwork.forEach(node => {
    node.update();
  });
  //camera.rotation.y += .01;
  renderer.render(scene, camera);

}

animate();
