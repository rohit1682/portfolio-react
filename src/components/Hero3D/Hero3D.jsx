/* eslint-disable react/no-unknown-property */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import CrystalMesh from "./CrystalMesh";
import Particles from "./Particles";
import useDeviceCapability from "../../hooks/useDeviceCapability";

function Scene({ particleCount }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[2, 3, 4]} color="#e85d75" intensity={1.5} />
      <pointLight position={[-3, -2, 2]} color="#b91c2e" intensity={0.8} />
      <CrystalMesh />
      <Particles count={particleCount} />
    </>
  );
}

export default function Hero3D() {
  const { tier } = useDeviceCapability();

  if (tier === "low") return null;

  const particleCount = tier === "high" ? 1000 : 400;

  return (
    <Canvas
      camera={{ fov: 60, position: [0, 0, 5], near: 0.1, far: 100 }}
      dpr={[1, 2]}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <Scene particleCount={particleCount} />
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
}
