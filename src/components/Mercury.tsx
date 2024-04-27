/**
 * Mercury
 */

import { useTexture } from '@react-three/drei';
import MercuryTexture from '../assets/textures/8k_mercury.jpg';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

interface Props {
  visible?: boolean;
  trail?: boolean;
}

const Mercury = ({ visible = true }: Props) => {
  const [mercuryTexture] = useTexture([MercuryTexture]);

  const mercuryRef = useRef<THREE.Mesh>(null);
  const mercuryOrbitRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (mercuryOrbitRef.current) mercuryOrbitRef.current.rotation.y = (elapsedTime * Math.PI) / 20;
    if (mercuryRef.current) mercuryRef.current.rotation.y = (elapsedTime * Math.PI) / 10;
  });

  return (
    <mesh ref={mercuryOrbitRef}>
      <mesh ref={mercuryRef} position={new Vector3(2, 0, 0)}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial map={mercuryTexture} />
      </mesh>
    </mesh>
  );
};

export default Mercury;
