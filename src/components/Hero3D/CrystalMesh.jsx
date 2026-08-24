/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function CrystalMesh() {
  const meshRef = useRef();
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));

  useFrame((state, delta) => {
    /* v8 ignore next */
    if (!meshRef.current) return;
    const { pointer } = state;
    targetRotation.current.x = pointer.y * 0.3;
    targetRotation.current.y = pointer.x * 0.3;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x,
      delta * 2
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.current.y,
      delta * 2
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 4]} />
        <MeshDistortMaterial
          color="#b91c2e"
          emissive="#7c1d2e"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.7}
          distort={0.3}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}
