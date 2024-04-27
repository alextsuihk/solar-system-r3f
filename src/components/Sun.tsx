/**
 * Sun
 */

import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Sun } from '../data';
import { SUN_RADIUS } from '../data';
import { initialControls } from '../App';
import { useControls } from 'leva';

type Props = typeof initialControls & Sun & { textures: string[] };

export default ({ speed, trueScale, textures, ...sun }: Props) => {
  const { hide } = useControls(sun.name.enUS, { hide: false });
  const [sunTexture] = useTexture(textures);

  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (sunRef.current) sunRef.current.rotation.y = ((elapsedTime * 2 * Math.PI) / 60 / sun.rotationPeriod) * speed;
  });

  console.log(sun.name.enUS, sun.radius / SUN_RADIUS);

  return hide ? null : (
    <mesh ref={sunRef}>
      <sphereGeometry args={[sun.radius / SUN_RADIUS, 32, 32]} />
      <meshBasicMaterial map={sunTexture} />
    </mesh>
  );
};
