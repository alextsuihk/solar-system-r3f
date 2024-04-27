/**
 * Earth with cloud
 */
import { useRef } from 'react';

import { OrbitControls, Stars } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import EarthCloudsMap from '../assets/textures/8k_earth_clouds.jpg';
import EarthDayMap from '../assets/textures/8k_earth_day_map.jpg';
import EarthNormalMap from '../assets/textures/8k_earth_normal_map.jpg';
import EarthSpecularMap from '../assets/textures/8k_earth_specular_map.jpg';

const earthDiameter = 12742;
const cloudHeight = 10;

interface Props {
  visible?: boolean;
  trail?: boolean;
}

const Earth = ({ visible = true }: Props) => {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [
    EarthDayMap,
    EarthNormalMap,
    EarthSpecularMap,
    EarthCloudsMap,
  ]);

  const earthRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (earthRef.current) earthRef.current.rotation.y = (elapsedTime * Math.PI) / 10;
  });

  return (
    <>
      <group ref={earthRef} position={[0, 0, 3]} visible={visible}>
        <mesh>
          <sphereGeometry args={[1 + cloudHeight / earthDiameter, 32, 32]} />
          <meshPhongMaterial map={cloudsMap} opacity={0.4} depthWrite transparent side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial specularMap={specularMap} />
          <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.4} roughness={0.7} />
        </mesh>
      </group>
    </>
  );
};

export default Earth;
