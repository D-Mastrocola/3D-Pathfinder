import * as THREE from "three";
import randomColor from "../helpers/randomColor";

class Node {
  constructor(x, y, z, scene) {
    //A*
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.connections = [];

    this.neighbors = [];
    this.previous = null;
    this.selected = false;

    const color = new THREE.Color(randomColor());

    this.geometry = new THREE.SphereGeometry(1, 32, 16);
    this.material = new THREE.MeshPhongMaterial({ color: color });
    this.sphere = new THREE.Mesh(this.geometry, this.material);

    this.sphere.position.set(x, y, z);

    scene.add(this.sphere);
  }
  connect(network, index, scene) {
    let makeConnections = Math.round(Math.random() * 2) + 1;

    while (this.connections.length < makeConnections) {
      let newConnectionIndex = Math.floor(Math.random() * network.length);
      for (let i = 0; i < this.connections.length; i++) {
        if (
          network[newConnectionIndex] === this.connections[i] ||
          newConnectionIndex === index
        )
          continue;
      }

      network[newConnectionIndex].connections.push(this);
      this.connections.push(network[newConnectionIndex]);

      let connectingTo = network[newConnectionIndex].sphere;

      //create a blue LineBasicMaterial
      const material = new THREE.LineBasicMaterial({ color: 0xffffff });
      const points = [];
      points.push(this.sphere.position);
      points.push(connectingTo.position);

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const line = new THREE.Line(geometry, material);
      scene.add(line);
    }
    console.log(this.connections);
  }

  update() {
    this.sphere.rotation.x += 0.01;
    this.sphere.rotation.y += 0.01;
  }
}

export default Node;
