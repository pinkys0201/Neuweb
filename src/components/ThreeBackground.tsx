import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// import * as random from 'maath/random/dist/maath-random.cjs'; // Commented out to reduce deps if unused

function Particles(props: any) {
    const ref = useRef<any>(null);
    const [sphere] = useState(() => {
        const positions = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000 * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 4; // Spread
        }
        return positions;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#94a3b8" // Slate-400 (Light theme friendly)
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
}

export default function ThreeBackground() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }} style={{ background: 'transparent' }}>
                <Particles />
            </Canvas>
        </div>
    );
}
