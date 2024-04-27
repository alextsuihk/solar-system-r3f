/**
 * Saturn
 */

import { useTexture } from '@react-three/drei';
import SaturnTexture from '../assets/textures/8k_saturn.jpg';
import SaturnRingTexture from '../assets/textures/8k_saturn_ring.png';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DoubleSide, Vector3 } from 'three';

interface Props {
  visible?: boolean;
  trail?: boolean;
}

const Saturn = ({ visible = true }: Props) => {
  const [saturnTexture, saturnRingTexture] = useTexture([SaturnTexture, SaturnRingTexture]);

  const saturnRef = useRef<THREE.Group>(null);
  const saturnOrbitRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (saturnOrbitRef.current) saturnOrbitRef.current.rotation.y = (elapsedTime * Math.PI) / 40;
    if (saturnRef.current) saturnRef.current.rotation.y = (elapsedTime * Math.PI) / 20;
  });

  return (
    <mesh ref={saturnOrbitRef}>
      <group ref={saturnRef} position={new Vector3(4, 0, 0)}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial map={saturnTexture} />
        </mesh>
        <mesh rotation={[Math.PI / 2 + 0.05, 0, 0]}>
          <ringGeometry args={[0.5, 0.8]} />
          <meshBasicMaterial map={saturnRingTexture} side={DoubleSide} />
        </mesh>
      </group>
    </mesh>
  );
};

export default Saturn;
