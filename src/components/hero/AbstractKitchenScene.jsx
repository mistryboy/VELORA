import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, PresentationControls, useGLTF, Center, Html } from '@react-three/drei'
import * as THREE from 'three'

function RealKitchenModel() {
  const group = useRef()
  const { scene } = useGLTF('/models/modular-kitchen.glb')
  
  // Ensure the model casts and receives shadows for maximum luxury realism
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  // Continuous rotation & float with mouse parallax
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    // Extremely slow continuous rotation
    const baseRotationY = t * 0.015
    
    // Mouse parallax offsets
    const targetY = baseRotationY + (state.pointer.x * Math.PI) / 25
    const targetX = -(state.pointer.y * Math.PI) / 40
    
    // Smooth cinematic interpolation
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.02)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.02)
    
    // Minimal floating animation (slow up and down)
    group.current.position.y = Math.sin(t * 0.5) * 0.03
  })

  return (
    <group ref={group} rotation={[Math.PI / 32, -Math.PI / 6, 0]}>
      {/* Shift model slightly right side and scale safely to avoid any cropping */}
      <Center position={[0.6, -0.4, 0]}>
        <primitive object={scene} scale={0.8} />
      </Center>
    </group>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center gap-3">
        {/* Luxury spun gold preloader */}
        <div className="w-12 h-12 border border-white/10 border-t-[#C6A87D] rounded-full animate-spin"></div>
        <span className="font-body text-[10px] tracking-[0.3em] text-[#C6A87D] uppercase">Loading Content</span>
      </div>
    </Html>
  )
}

export default function AbstractKitchenScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-auto">
      {/* Pushed camera further back to [6, 3, 8] with fov 35 to give breathing room */}
      <Canvas shadows camera={{ position: [6, 3, 8], fov: 35 }} gl={{ antialias: true, alpha: true }}>
        {/* Soft atmospheric fog */}
        <fog attach="fog" args={['#0A0A0A', 8, 35]} />
        
        {/* Very soft ambient light */}
        <ambientLight intensity={0.4} color="#ffffff" />
        
        {/* Main top/side warm directional light */}
        <directionalLight 
          position={[7, 10, 6]} 
          intensity={4} 
          color="#FAF8F5"
          castShadow 
          shadow-mapSize={[2048, 2048]} 
          shadow-bias={-0.0001}
        />
        
        {/* Subtle rim light from behind for depth */}
        <pointLight 
          position={[-6, 5, -6]} 
          intensity={4.5} 
          color="#C6A87D" 
          distance={30}
        />
        
        {/* Soft fill light to prevent harsh absolute blacks */}
        <rectAreaLight
          width={25}
          height={25}
          color="#C6A87D"
          intensity={0.4}
          position={[0, -5, 0]}
          lookAt={[0, 0, 0]}
        />

        <PresentationControls 
          global 
          rotation={[0, 0, 0]} 
          polar={[-0.05, 0.05]} 
          azimuth={[-0.1, 0.1]} 
          config={{ mass: 2, tension: 400, friction: 30 }}
        >
          <Suspense fallback={<Loader />}>
            <RealKitchenModel />
          </Suspense>
        </PresentationControls>
        
        {/* Deep, highly blurred contact shadow for premium realism */}
        <ContactShadows 
          position={[0, -1.9, 0]} 
          opacity={0.65} 
          scale={40} 
          blur={4} 
          far={10} 
          resolution={1024}
          color="#000000"
        />
        
        {/* Premium Environment map for subtle interior reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

// Preload the massive 3D asset so it buffers perfectly behind the scenes
useGLTF.preload('/models/modular-kitchen.glb')
