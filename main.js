import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

// Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("lightblue");

// import font from loader
const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {createText(font)}); 

function createText(font) {
  // create the text geometry
  const textGeometry = new TextGeometry('THREE', {
    font: font,
    size: 1,
    height: 0.1,
    curveSegments: 12, 
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.01,
    bevelOffset: 0, 
    bevelSegments: 10
  })
const textMaterial = new THREE.MeshNormalMaterial({flatShading: true});

const textMesh = new THREE.Mesh(textGeometry, textMaterial);
scene.add(textMesh);
}




// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Create a few objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial({flatShading: true});
const cube = new THREE.Mesh(geometry, material);
cube.position.x = 6;
cube.position.y = 4;
cube.position.z = -3;

const box2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshNormalMaterial({flatShading: true});
const cube2 = new THREE.Mesh(box2, material2);
cube2.position.x = -2;
cube2.position.y = 2;

const sphereGeometry = new THREE.SphereGeometry();
const material3 = new THREE.MeshNormalMaterial({flatShading: true});
const sphere = new THREE.Mesh(sphereGeometry, material3);
sphere.position.set(5, -3, 2);

// Add objects to the scene
scene.add(cube);
scene.add(cube2);
scene.add(sphere);

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create the animate function
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
    cube.rotation.z += 0.025;

    cube2.rotation.x += 0.03;
    cube2.rotation.y += 0.02;
    cube2.rotation.z += 0.025;

    sphere.rotation.x += 0.03;
    sphere.rotation.y += 0.02;
    sphere.rotation.z += 0.025;



    // Update controls
    controls.update();

    // Render inside the animate function
    renderer.render(scene, camera);
}

// Call the animate function
animate();

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}