/**
 * Planet & nested moons
 *
 * props.textures: [planet, ...moons, ring]
 */

import { useTexture } from '@react-three/drei';
import PlanetTexture from '../assets/textures/8k_saturn.jpg';
import PlanetRingTexture from '../assets/textures/8k_saturn_ring.png';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DoubleSide, Vector3 } from 'three';
import { SUN_RADIUS, ONE_AU } from '../data';
import type { Planet } from '../data';
import { useControls } from 'leva';
import { initialControls } from '../App';

type Props = typeof initialControls & Planet & { textures: string[] };

export default ({ speed, trueScale = true, textures, ...celestial }: Props) => {
  const {
    name,
    description,
    scale,
    mass,
    radius,
    rotationPeriod,
    tilt,
    moons,
    ring,
    orbitalPeriod,
    axis,
    inclination,
  } = celestial;

  // const { hide, trail } = useControls(name.enUS, { hide: false, trail: false });
  const { hide } = useControls(name.enUS, { hide: false });
  const [planetTexture, ...otherTextures] = useTexture(textures);

  const ref = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (ref.current) ref.current.rotation.y = ((elapsedTime * 2 * Math.PI) / 60 / rotationPeriod) * speed;
    if (orbitRef.current) orbitRef.current.rotation.y = ((elapsedTime * 2 * Math.PI) / 60 / orbitalPeriod) * speed;
  });

  let displayRadius = radius / SUN_RADIUS;
  let displayAxis = (axis * ONE_AU) / SUN_RADIUS;

  if (!trueScale) {
    displayRadius = displayRadius * scale[0];
    displayAxis = displayAxis / scale[1];
  }

  console.log(name.enUS, displayRadius, displayAxis);

  return hide ? null : (
    <mesh ref={orbitRef}>
      <group ref={ref} position={new Vector3(displayAxis, 0, 0)}>
        <mesh>
          <sphereGeometry args={[displayRadius, 32, 32]} />
          <meshStandardMaterial map={planetTexture} />
        </mesh>
        {/* <mesh rotation={[Math.PI / 2 + 0.05, 0, 0]}>
          <ringGeometry args={[0.5, 0.8]} />
          <meshBasicMaterial map={saturnRingTexture} side={DoubleSide} />
        </mesh> */}
      </group>
    </mesh>
  );
};
