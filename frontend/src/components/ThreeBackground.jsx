import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Floating particles field ── */
function Particles({ count = 200, color = '#00f0ff' }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 20,
        speed: 0.002 + Math.random() * 0.008,
        offset: Math.random() * Math.PI * 2,
        scale: 0.02 + Math.random() * 0.06,
      })
    }
    return temp
  }, [count])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed * 100 + p.offset) * 0.3,
        p.y + Math.cos(t * p.speed * 80 + p.offset) * 0.4,
        p.z + Math.sin(t * p.speed * 60 + p.offset) * 0.2
      )
      dummy.scale.setScalar(p.scale * (1 + Math.sin(t * 2 + p.offset) * 0.3))
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  )
}

/* ── Glowing ring ── */
function GlowRing({ radius = 3, color = '#a855f7' }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
      ref.current.rotation.y = clock.getElapsedTime() * 0.15
    }
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  )
}

/* ── Orbiting orb ── */
function OrbitingOrb({ radius = 2.5, speed = 0.5, color = '#06b6d4', size = 0.12 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.7) * 0.5, Math.sin(t) * radius)
    }
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  )
}

/* ── Hexagonal grid floor ── */
function HexGrid() {
  const ref = useRef()
  const positions = useMemo(() => {
    const pts = []
    for (let i = -6; i <= 6; i++) {
      for (let j = -6; j <= 6; j++) {
        const x = i * 1.8 + (j % 2 === 0 ? 0 : 0.9)
        const z = j * 1.55
        pts.push([x, -4, z])
      }
    }
    return pts
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  return (
    <group ref={ref}>
      {positions.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.4, 6]} />
          <meshBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.06 + Math.random() * 0.06}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ── Exported backgrounds ── */

export function DashboardBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <Particles count={160} color="#06b6d4" />
        <Particles count={80} color="#a855f7" />
        <GlowRing radius={3.5} color="#06b6d4" />
        <GlowRing radius={2.5} color="#a855f7" />
        <OrbitingOrb radius={3.5} speed={0.4} color="#22d3ee" size={0.1} />
        <OrbitingOrb radius={2.5} speed={0.6} color="#c084fc" size={0.08} />
        <HexGrid />
      </Canvas>
    </div>
  )
}

export function AuthBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <Particles count={120} color="#06b6d4" />
        <Particles count={60} color="#f472b6" />
        <GlowRing radius={4} color="#06b6d4" />
        <GlowRing radius={3} color="#a855f7" />
        <GlowRing radius={2} color="#f472b6" />
        <OrbitingOrb radius={4} speed={0.3} color="#22d3ee" size={0.15} />
        <OrbitingOrb radius={3} speed={0.5} color="#e879f9" size={0.1} />
      </Canvas>
    </div>
  )
}
