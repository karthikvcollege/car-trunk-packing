import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const TrunkVisualization = ({ trunkDims, packedItems }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    if (!mountRef.current || !trunkDims) return;

    if (rendererRef.current) {
      mountRef.current.removeChild(rendererRef.current.domElement);
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(trunkDims.width / 2, trunkDims.height / 2, trunkDims.depth / 2);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);

    const trunkGeometry = new THREE.BoxGeometry(trunkDims.width, trunkDims.height, trunkDims.depth);
    const trunkMaterial = new THREE.MeshBasicMaterial({
      color: 0x333333,
      wireframe: true,
      opacity: 0.2,
      transparent: true
    });
    const trunkMesh = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunkMesh.position.set(trunkDims.width / 2, trunkDims.height / 2, trunkDims.depth / 2);
    scene.add(trunkMesh);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    camera.position.set(trunkDims.width * 1.5, trunkDims.height * 1.5, trunkDims.depth * 1.5);
    camera.lookAt(trunkDims.width / 2, trunkDims.height / 2, trunkDims.depth / 2);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, [trunkDims]);

  // 🧠 Animate when animationStarted becomes true
  useEffect(() => {
    if (!animationStarted || !sceneRef.current || packedItems.length === 0) return;

    let itemIndex = 0;

    const addNextItem = () => {
      if (itemIndex >= packedItems.length) return;

      const item = packedItems[itemIndex];
      const geometry = new THREE.BoxGeometry(...item.dims);
      const material = new THREE.MeshLambertMaterial({
        color: item.color,
        opacity: 0.75,
        transparent: true
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        item.pos[0] + item.dims[0] / 2,
        item.pos[1] + item.dims[1] / 2,
        item.pos[2] + item.dims[2] / 2
      );
      sceneRef.current.add(mesh);

      if (item.fragile || item.frequent) {
        const edges = new THREE.EdgesGeometry(geometry);
        const outlineColor = item.fragile ? 0xff0000 : 0x0000ff;
        const wireframe = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: outlineColor }));
        wireframe.position.copy(mesh.position);
        sceneRef.current.add(wireframe);
      }

      itemIndex++;
      setTimeout(addNextItem, 400);
    };

    addNextItem();
  }, [animationStarted, packedItems]);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">3D Trunk Visualization</h3>
      {!animationStarted && (
        <div className="text-center mt-6">
          <button
            onClick={() => setAnimationStarted(true)}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
          >
            Start Packing Animation
          </button>
        </div>
      )}

      <div ref={mountRef} className="w-full h-96 border border-gray-300 rounded-lg" />

      <div className="mt-4 text-sm text-gray-600">
        <p>• Wireframe shows the trunk boundaries</p>
        <p>• Colored boxes represent packed luggage</p>
        <p>• Red outline = Fragile, Blue outline = Frequently Used</p>
        <p>• Rotate manually with mouse drag (OrbitControls)</p>
      </div>
    </div>
  );
};

export default TrunkVisualization;
