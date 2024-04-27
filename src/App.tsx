/**
 * Solar System
 *
 * References:
 *  - https://en.wikipedia.org/wiki/Solar_System
 *
 * ! note: NOT in scale, wrong speed, wrong size,....
 *
 * inspired by:
 * ! https://www.youtube.com/watch?v=XXzqSAt3UIw&t=2s
 */

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import "./App.css";
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import styled from 'styled-components';
import Sun from './components/Sun';
// import TopSection from './components/TopSelection';
import { OrbitControls, Stars, Stats } from '@react-three/drei';
import { useControls } from 'leva';
import Planet from './components/Planet';
import { earth, mercury, neptune, sun, venus, ONE_AU, SUN_RADIUS, mar, jupiter, saturn, uranus } from './data';

import EarthTexture from './assets/textures/8k_earth_day_map.jpg';
import MercuryTexture from './assets/textures/8k_mercury.jpg';
import SunTexture from './assets/textures/8k_sun.jpg';
import VenusTexture from './assets/textures/8k_venus_surface.jpg';
import MarTexture from './assets/textures/8k_mars.jpg';
import JupiterTexture from './assets/textures/8k_venus_surface.jpg';
import SaturnTexture from './assets/textures/8k_saturn.jpg';
import SaturnRingTexture from './assets/textures/8k_saturn_ring.png';
import UranusTexture from './assets/textures/2k_uranus.jpg';
import NeptuneTexture from './assets/textures/2k_neptune.jpg';

export const initialControls = { speed: 100, trueScale: false, star: false };

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

// const CameraHelper = () => {
//   const camera = new PerspectiveCamera(60, 1, 1, 50);
//   return <cameraHelper args={[camera]} />;
// };

// TODO: wrap useControls to context

const App = () => {
  const controls = useControls(initialControls);

  // reload Button to re-render canvas

  const [hideOtherPlanets, setHideOtherPlanets] = useState(false);
  const [hideMoon, setHideMoon] = useState(false);

  return (
    <CanvasContainer>
      {/* <TopSection /> */}

      <Canvas
        camera={{
          position: [0, 0, 10],
          near: 0.5,
          far: (neptune.axis * ONE_AU) / SUN_RADIUS + 1,
          rotation: [1.7, 1.7, 1.3],
        }}
      >
        {/* <Canvas> */}
        {/* <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={70} near={0.1} far={20} rotation={[0.3, 0.3, 0.3]} /> */}

        {/* <ambientLight intensity={1} /> */}
        <pointLight color='#FFFFFF' position={[0, 0, 0]} intensity={1.2} />

        <Suspense fallback={null}>
          {controls.star && <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />}
          <Sun {...controls} {...sun} textures={[SunTexture]} />
          <Planet {...controls} {...mercury} textures={[MercuryTexture]} />
          <Planet {...controls} {...venus} textures={[VenusTexture]} />
          <Planet {...controls} {...earth} textures={[EarthTexture]} />
          <Planet {...controls} {...mar} textures={[MarTexture]} />
          <Planet {...controls} {...jupiter} textures={[JupiterTexture]} />
          <Planet {...controls} {...saturn} textures={[SaturnTexture, SaturnRingTexture]} />
          <Planet {...controls} {...uranus} textures={[UranusTexture]} />
          <Planet {...controls} {...neptune} textures={[NeptuneTexture]} />

          {/* <Mercury /> */}
          {/* <Earth /> */}
          {/* <Saturn /> */}
          <OrbitControls enableZoom enablePan enableRotate zoomSpeed={0.6} panSpeed={0.5} />
          <Stats />
          {/* <CameraHelper /> */}
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
};

export default App;
