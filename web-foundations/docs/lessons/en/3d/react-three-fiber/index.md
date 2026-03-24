# React Three Fiber — Declarative 3D in React

> *"The reconciler is the bridge: on one shore, React speaks in intentions; on the other, the GPU speaks in commands. Fiber walks the span so you never have to shout across the void."*

**Lesson 1.3 · Phase 1 — Foundations**

React Three Fiber (R3F) is not “React with three.js sprinkled on top.” It is a **separate React renderer** that treats three.js objects as the host tree—much like `react-dom` treats DOM nodes. Once you internalize that, the APIs stop feeling magical and start feeling inevitable.

This lesson gives you the mental model, the daily-driver hooks, the Drei helpers you will actually ship, and the performance and routing patterns that keep 3D subsystems from fighting the rest of your app.

## 1. Mental model: R3F is a React renderer, not a wrapper

In `react-dom`, a `<div>` becomes a DOM element. In R3F, a `<mesh>` becomes a `THREE.Mesh` instance attached to a parent `THREE.Object3D` in the scene graph.

**What the reconciler does (in plain terms):**

- **Creates** three.js instances when your JSX mounts.
- **Updates** properties when props change (with sensible defaults and three.js naming).
- **Disposes** GPU resources when components unmount (geometries, materials, textures—when R3F owns them).
- **Re-parents** objects when you reorder JSX, mirroring the scene graph.

You still think in React—composition, hooks, Suspense—but the **host** is WebGL/WebGPU reality, not HTML. That is why patterns that work in the DOM (re-rendering every frame from React state) often **hurt** in R3F: the render loop is already running; you want imperative writes inside `useFrame`, not React reconciliation sixty times per second.

**Rule of thumb:** React owns *structure and intent*; the render loop owns *per-frame mutation*.

## 2. `Canvas`: setup, sizing, `gl`, frameloop modes

`<Canvas>` is the R3F root: it creates renderer, scene, and camera unless you override them. The canvas fills its parent—size it with CSS on the wrapper. Pass **`gl`** options (`antialias`, `alpha`, `powerPreference`, `stencil`, `depth`) straight into the three.js renderer constructor (WebGL2 today; WebGPU paths are evolving).

> **Code in this lesson:** **CodeSandbox-ready** blocks are complete mini-apps (imports, `<Canvas>`, `export default` where it helps). **Excerpt** blocks are partial—illustrating one idea; paste the pattern into your own shell or sandbox.

*CodeSandbox-ready — lights, box mesh, sized wrapper.*

```jsx
import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#4f46e5" />
        </mesh>
      </Canvas>
    </div>
  )
}
```

### Frameloop: `"always"`, `"demand"`, `"never"`

- **`always` (default):** continuous `requestAnimationFrame`—games, constant motion, damped controls.
- **`demand`:** renders only when something calls **`invalidate()`**—static scenes, dashboards, DOM-driven updates.
- **`never`:** you drive **`advance()`** yourself (tests, external clocks, special embeds).

*CodeSandbox-ready — `frameloop="demand"` with a periodic `invalidate()`.*

```jsx
import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

function Spinner() {
  const ref = useRef()
  useFrame((_, delta) => {
    ref.current.rotation.y += delta
  })
  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}

function DemandScene() {
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    const id = setInterval(() => invalidate(), 250)
    return () => clearInterval(id)
  }, [invalidate])

  return <Spinner />
}

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas frameloop="demand" camera={{ position: [0, 0, 4] }}>
        <DemandScene />
      </Canvas>
    </div>
  )
}
```

## 3. JSX ↔ three.js mapping: `<mesh>`, `new THREE.Mesh()`, `attach`, `args`

### Default mapping

Lowercase intrinsic elements map to three.js classes:

- `<mesh>` → `THREE.Mesh`
- `<group>` → `THREE.Group`
- `<boxGeometry>` → `THREE.BoxGeometry`
- `<meshStandardMaterial>` → `THREE.MeshStandardMaterial`

Constructor arguments use the **`args`** prop as an array:

*Excerpt — `args` maps to three.js constructors.*

```jsx
<sphereGeometry args={[1, 64, 32]} />
<meshStandardMaterial args={[{ color: 'hotpink', roughness: 0.2, metalness: 0.1 }]} />
```

### The `attach` prop

Sometimes a property is not a child in the JSX sense but a **slot** on the parent (e.g., `material` on `mesh`, `target` on lights). R3F uses `attach` to wire instances:

*Excerpt — explicit `attach` slots.*

```jsx
<mesh>
  <boxGeometry attach="geometry" />
  <meshPhysicalMaterial attach="material" color="#e2e8f0" />
</mesh>
```

Many common cases work without explicit `attach` because R3F infers sensible defaults for geometries and materials on meshes.

### `primitive` for existing instances

When you already have a three.js object (from a loader, procedural code, or another library), mount it with `<primitive object={...} />`, or pass `geometry` / `material` props built with `useMemo` and `THREE.*` constructors.

## 4. `useFrame` — the heartbeat: animation patterns, `delta`, `clock`, avoiding React re-renders

`useFrame` runs **before each frame** with `(state, delta, frame)`—use **`delta`** for frame-rate–independent motion, **`state.clock`** for elapsed time, and optional **`{ priority: N }`** to order subscribers.

*CodeSandbox-ready — motion in `useFrame`, not React state.*

```jsx
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function BobbingBox() {
  const ref = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.position.y = Math.sin(t * 2) * 0.25
  })

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="#f97316" />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 1.5, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 4, 3]} />
        <BobbingBox />
      </Canvas>
    </div>
  )
}
```

**Anti-pattern:** `setState` inside `useFrame` reconciles React every frame—avoid it. **Prefer:** mutate refs to three.js objects (`ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5`). Reserve React state for **discrete** UI (selections, panels, routes), not continuous transforms.

## 5. `useThree` — accessing the fiber state (`gl`, `camera`, `scene`, `size`, `viewport`)

`useThree` subscribes to R3F root state—**always pass a selector** so unrelated updates do not re-render your component. Common fields: **`gl`**, **`scene`**, **`camera`**, pixel **`size`**, world **`viewport`**, **`invalidate()`** (with `frameloop="demand"`), **`set`**.

*Excerpt — fog side effect inside the canvas tree (mount under `<Canvas>`).*

```jsx
import { useEffect } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

function DprAwareFog() {
  const scene = useThree((s) => s.scene)
  useEffect(() => {
    scene.fog = new THREE.FogExp2('#0f172a', 0.035)
    return () => {
      scene.fog = null
    }
  }, [scene])
  return null
}
```

## 6. Drei essentials: `Environment`, `Html`, `useGLTF`, `useTexture`, `OrbitControls`, `Float`, `Text3D`

**`@react-three/drei`** is the standard helper kit for R3F—environments, controls, loaders, staging.

### `Environment`, `OrbitControls`

`Environment` supplies HDR or **preset** IBL (PMREM). `OrbitControls` attaches damped camera orbit; **`makeDefault`** registers R3F’s default controls.

*CodeSandbox-ready — add `@react-three/drei` in the sandbox dependencies.*

```jsx
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

function Studio() {
  return (
    <>
      <Environment preset="city" />
      <OrbitControls makeDefault enableDamping dampingFactor={0.08} />
      <mesh>
        <torusKnotGeometry args={[0.6, 0.22, 256, 32]} />
        <meshStandardMaterial roughness={0.25} metalness={0.85} />
      </mesh>
    </>
  )
}

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <Studio />
      </Canvas>
    </div>
  )
}
```

### `Html`

DOM overlays in 3D space—labels, tooltips, forms—**real HTML** for a11y and CSS.

*CodeSandbox-ready — `Html` overlay; requires `@react-three/drei`.*

```jsx
import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'

function Marker() {
  return (
    <mesh position={[0, 1.2, 0]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color="white" />
      <Html distanceFactor={8} center>
        <div className="rounded bg-black/70 px-2 py-1 text-xs text-white">Hotspot</div>
      </Html>
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 1, 4] }}>
        <ambientLight intensity={0.6} />
        <Marker />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
```

### `useGLTF`, `useTexture`

Suspense-friendly loaders; **`.preload`** in route loaders or idle callbacks to avoid hitches.

*CodeSandbox-ready — swap URLs for your own GLB and textures; add files to the sandbox `public` folder.*

```jsx
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useTexture, OrbitControls } from '@react-three/drei'

function Model() {
  const { scene } = useGLTF('/models/ship.glb')
  return <primitive object={scene} />
}

function TexturedPlane() {
  const [map, normalMap] = useTexture(['/tex/color.jpg', '/tex/normal.jpg'])
  return (
    <mesh rotation-x={-Math.PI / 2}>
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial map={map} normalMap={normalMap} />
    </mesh>
  )
}

function AssetsScene() {
  return (
    <Suspense fallback={null}>
      <Model />
      <TexturedPlane />
    </Suspense>
  )
}

useGLTF.preload('/models/ship.glb')

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [2, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 3]} />
        <AssetsScene />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
```

### `Float`, `Text3D`, `Center`

`Text3D` needs a **typeface.json** font; `Center` aligns it; `Float` adds idle motion.

*Excerpt — needs `/fonts/Inter_Bold.json` (typeface) in `public`; wrap in `<Canvas>` like other examples.*

```jsx
import { Suspense } from 'react'
import { Center, Float, Text3D } from '@react-three/drei'

function HeroType() {
  return (
    <Suspense fallback={null}>
      <Center top position={[0, 0.5, 0]}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <Text3D font="/fonts/Inter_Bold.json" size={0.35} height={0.08}>
            R3F
            <meshStandardMaterial color="#38bdf8" metalness={0.6} roughness={0.2} />
          </Text3D>
        </Float>
      </Center>
    </Suspense>
  )
}
```

## 7. Suspense for async assets: loading states, error boundaries, preloading

Loaders integrate with React 18 **Suspense** (promises until ready). Wrap async subtrees in `<Suspense fallback={...}>`—fallback can be a simple wireframe mesh or `null` if the shell handles loading elsewhere.

*CodeSandbox-ready — replace `HeavyScene` with your async-loaded content.*

```jsx
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshBasicMaterial color="#94a3b8" wireframe />
    </mesh>
  )
}

function HeavyScene() {
  return (
    <mesh>
      <torusGeometry args={[0.5, 0.2, 32, 64]} />
      <meshStandardMaterial color="#64748b" />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 3, 2]} />
        <Suspense fallback={<Loader />}>
          <HeavyScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
```

### Error boundaries & preloading

Catch loader/network failures with a class **error boundary** around canvas content; call **`useGLTF.preload`**, **`useTexture.preload`**, or **`useLoader.preload`** during route transitions or idle time so navigation does not hitch.

*CodeSandbox-ready — swap `HeavyScene` for real async content; the red cube is the error fallback.*

```jsx
import { Component, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

class SceneErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <mesh>
          <boxGeometry />
          <meshBasicMaterial color="crimson" />
        </mesh>
      )
    }
    return this.props.children
  }
}

function HeavyScene() {
  return (
    <mesh>
      <icosahedronGeometry />
      <meshStandardMaterial color="#38bdf8" />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[2, 3, 2]} />
        <SceneErrorBoundary>
          <Suspense fallback={null}>
            <HeavyScene />
          </Suspense>
        </SceneErrorBoundary>
      </Canvas>
    </div>
  )
}
```

## 8. Event system: `onClick`, `onPointerOver`, `onPointerMove` on meshes

R3F wraps three.js raycasting in a React-like event layer. Events hit the **nearest** object along the ray; propagation can be stopped like DOM events.

*CodeSandbox-ready — pointer events on a mesh.*

```jsx
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

function ClickableCube() {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  return (
    <mesh
      scale={active ? 1.2 : 1}
      onClick={(e) => {
        e.stopPropagation()
        setActive((v) => !v)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? '#facc15' : '#6366f1'} />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 4, 3]} />
        <ClickableCube />
      </Canvas>
    </div>
  )
}
```

**Gotchas:** predictable picking needs visible materials; layered UI may need `Html` or `raycast` / layer tuning; use **`stopPropagation()`** when handlers compete.

## 9. Performance patterns: `React.memo` for 3D components, `instancedMesh`, demand frameloop

### Memoize heavy subtrees

When props are stable, prevent unnecessary reconciliation:

*Excerpt — `instancedMesh` + `memo`; mount inside `<Canvas>`.*

```jsx
import * as THREE from 'three'
import { memo, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Forest = memo(function Forest({ count }) {
  const meshRef = useRef()
  const geo = useMemo(() => new THREE.ConeGeometry(0.15, 0.6, 8), [])
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#166534' }), [])
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const positions = useMemo(
    () =>
      Array.from({ length: count }, () => [
        (Math.random() - 0.5) * 20,
        0,
        (Math.random() - 0.5) * 20,
      ]),
    [count],
  )

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh) return
    positions.forEach((p, i) => {
      dummy.position.set(p[0], p[1], p[2])
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  })

  return <instancedMesh ref={meshRef} args={[geo, mat, count]} />
})
```

### Demand frameloop + `invalidate()`

Pair `frameloop="demand"` with explicit invalidation on interaction (e.g. while the user drags `OrbitControls`):

*Excerpt — use with `<Canvas frameloop="demand">`; requires `@react-three/drei`.*

```jsx
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function ControlsThatInvalidate() {
  const invalidate = useThree((s) => s.invalidate)
  return <OrbitControls onChange={() => invalidate()} />
}
```

## 10. Integration with React Router: route-driven scenes, `Canvas` as subsystem

Treat the **Canvas as a subsystem**: one mount point, swap inner scene content based on the route. Avoid unmounting the entire `Canvas` on every navigation if you want to preserve WebGL context and expensive caches—use nested routes or conditional children instead.

*Excerpt — shell sketch; `WorkGallery`, `ShaderLab`, `HomeWorld`, and copy components are placeholders you replace.*

```jsx
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'

function RouterScene() {
  const { pathname } = useLocation()
  return (
    <>
      {pathname.startsWith('/work') && <WorkGallery />}
      {pathname.startsWith('/lab') && <ShaderLab />}
      {pathname === '/' && <HomeWorld />}
    </>
  )
}

function HomeWorld() {
  return null
}
function WorkGallery() {
  return null
}
function ShaderLab() {
  return null
}
function HomeCopy() {
  return <p>Home</p>
}
function WorkCopy() {
  return <p>Work</p>
}
function LabCopy() {
  return <p>Lab</p>
}

export function AppShell() {
  return (
    <div className="app">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/work">Work</Link>
        <Link to="/lab">Lab</Link>
      </nav>
      <div className="stage">
        <Canvas frameloop="demand" camera={{ position: [0, 1.6, 6] }}>
          <Suspense fallback={null}>
            <RouterScene />
          </Suspense>
        </Canvas>
      </div>
      <Routes>
        <Route path="/" element={<HomeCopy />} />
        <Route path="/work/*" element={<WorkCopy />} />
        <Route path="/lab/*" element={<LabCopy />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
```

**SSR:** WebGL contexts do not exist on the server—gate `<Canvas>` behind `typeof window !== 'undefined'` or a client-only boundary.

## 11. AI collaboration notes: prompting for R3F code

Spell out stack and constraints: **R3F + drei, JavaScript only**; continuous motion in **`useFrame`** (no per-frame **`setState`**); **`demand`** + **`invalidate()`** on controls; **`instancedMesh`** for crowds; **Suspense** + **`useGLTF.preload`**. Ask for **draw-call / reconciliation** cost and **tradeoffs** (clarity vs performance). **Red flags:** per-frame state, heap churn in `useFrame`, uncompressed textures, no disposal for imperative three.js objects.

## 12. Tao moment

> *"React names what should be; the GPU remembers what is. The reconciler does not choose between them—it translates, so your intention arrives intact on the other side of the bridge."*

Partition **declarative structure** (what belongs in React) from **imperative motion** (what belongs in the frame loop). That stance travels: DOM renderer or R3F, the contract is the same—right tool, right side of the bridge.

**Further reading:** [R3F docs](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [drei](https://docs.pmnd.rs/drei/introduction), three.js manual — *Rendering*, *Loading 3D models*, *How to dispose of objects*.
