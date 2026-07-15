'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function RotatingMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Constant rotation
            meshRef.current.rotation.x += delta * 0.15;
            meshRef.current.rotation.y += delta * 0.25;
            
            // Subtle mouse following effect
            const targetX = state.pointer.x * 0.5;
            const targetY = state.pointer.y * 0.5;
            meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
            meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
        }
    });

    return (
        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
            <mesh
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={hovered ? 1.1 : 1.0}
            >
                <torusKnotGeometry args={[0.9, 0.28, 150, 16, 3, 4]} />
                <meshPhysicalMaterial
                    color={hovered ? "#ff007a" : "#00f6ff"}
                    emissive={hovered ? "#330018" : "#002b3d"}
                    wireframe
                    roughness={0.2}
                    metalness={0.9}
                    clearcoat={1.0}
                    clearcoatRoughness={0.1}
                />
            </mesh>
        </Float>
    );
}

function SmallParticles() {
    const ref = useRef<any>(null);
    const [sphere] = useState(() => {
        const positions = new Float32Array(200 * 3);
        for (let i = 0; i < 200 * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 5;
        }
        return positions;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.05;
            ref.current.rotation.x += delta * 0.02;
        }
    });

    return (
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00d2ff"
                size={0.035}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    );
}

export default function Hero3D() {
    return (
        <div className="w-full h-[400px] md:h-[550px] relative">
            {/* Soft background glow underneath canvas */}
            <div className="absolute inset-0 bg-gradient-to-tr from-devops-blue/10 via-webdev-cyan/5 to-marketing-purple/10 rounded-full blur-[100px] opacity-40"></div>
            
            <Canvas
                camera={{ position: [0, 0, 3.2], fov: 50 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.7} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <spotLight position={[-10, -10, -10]} intensity={1} color="#bd00ff" />
                <RotatingMesh />
                <SmallParticles />
            </Canvas>
        </div>
    );
}
