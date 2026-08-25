/* eslint-disable react/no-unknown-property, react-hooks/purity */
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = ["#b91c2e", "#b91c2e", "#b91c2e", "#e85d75", "#f59e6b"];

export default function Particles({ count = 1000 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 5;
      temp.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        scale: 0.01 + Math.random() * 0.02,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }
    return temp;
  }, [count]);

  const colorArray = useMemo(() => {
    const arr = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      const c = new THREE.Color(p.color);
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    });
    return arr;
  }, [particles, count]);

  useFrame((_, delta) => {
    /* v8 ignore next */
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.03;
    meshRef.current.rotation.x += delta * 0.01;
  });

  useMemo(() => {
    /* v8 ignore start */
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      dummy.position.set(...p.position);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    /* v8 ignore stop */
  }, [particles, dummy]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial toneMapped={false}>
        <instancedBufferAttribute
          attach="geometry-attributes-color"
          args={[colorArray, 3]}
        />
      </meshBasicMaterial>
    </instancedMesh>
  );
}
