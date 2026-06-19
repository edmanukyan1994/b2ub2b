"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import {
  INFINITY_VARIANTS,
  type InfinityVariant,
  type ShapeConfig,
  type ShapeKind,
} from "@/lib/infinity-variants";
import { cn } from "@/lib/utils";

function createGeometry(shape: ShapeConfig) {
  switch (shape.kind) {
    case "torusKnot":
      return new THREE.TorusKnotGeometry(...(shape.torusKnotArgs ?? [1, 0.32, 128, 24, 2, 3]));
    case "torus":
      return new THREE.TorusGeometry(...(shape.torusArgs ?? [1, 0.3, 64, 32]));
    case "icosahedron":
      return new THREE.IcosahedronGeometry(1, 1);
    case "octahedron":
      return new THREE.OctahedronGeometry(1, 0);
    case "dodecahedron":
      return new THREE.DodecahedronGeometry(1, 0);
    case "sphere":
      return new THREE.SphereGeometry(1, 64, 64);
    default:
      return new THREE.IcosahedronGeometry(1, 1);
  }
}

function IridescentMesh({ shape }: { shape: ShapeConfig }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => createGeometry(shape), [shape]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * shape.rotationSpeed[0];
    meshRef.current.rotation.y += delta * shape.rotationSpeed[1];
    meshRef.current.rotation.z += delta * shape.rotationSpeed[2];
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={shape.position}
      scale={shape.scale}
    >
      <meshPhysicalMaterial
        color={shape.color}
        emissive={shape.emissive ?? "#000000"}
        emissiveIntensity={shape.emissive ? 0.35 : 0}
        metalness={shape.metalness}
        roughness={shape.roughness}
        iridescence={shape.iridescence}
        iridescenceIOR={1.35}
        iridescenceThicknessRange={[120, 420]}
        transmission={shape.transmission}
        thickness={0.65}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SceneContent({ variant }: { variant: InfinityVariant }) {
  const config = INFINITY_VARIANTS[variant];

  return (
    <>
      <ambientLight intensity={0.35} />
      {config.lights.map((light) => (
        <pointLight
          key={`${light.color}-${light.position.join("-")}`}
          color={light.color}
          position={light.position}
          intensity={light.intensity}
          distance={20}
        />
      ))}
      <directionalLight position={[-4, 6, 2]} intensity={0.6} color="#ffffff" />
      {config.shapes.map((shape, index) => (
        <IridescentMesh key={`${variant}-${shape.kind}-${index}`} shape={shape} />
      ))}
    </>
  );
}

type InfinityShape3DProps = {
  variant: InfinityVariant;
  className?: string;
};

export function InfinityShape3D({ variant, className }: InfinityShape3DProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        aria-hidden
        className={cn("page-scene-fallback pointer-events-none fixed inset-0 z-[1]", `page-scene-${variant}`, className)}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={className}
      style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42, near: 0.1, far: 40 }}
        dpr={[1, 1.75]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <SceneContent variant={variant} />
      </Canvas>
    </div>
  );
}

export type { InfinityVariant, ShapeKind };
