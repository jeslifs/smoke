import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import Vertex from './shaders/coffeeSmoke/vertex.glsl'
import Fragment from './shaders/coffeeSmoke/fragment.glsl'


/**
 * Loaders
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Update all materials
 */


/**
 * Smoke
 */

// Geometry
const smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 64)
smokeGeometry.scale(1.5, 6, 1.5)
smokeGeometry.translate(0, 0.5, 0)

// Texture
const noise = textureLoader.load('/textures/noiseTexture.png')
noise.wrapS = THREE.RepeatWrapping
noise.wrapT = THREE.RepeatWrapping
// console.log(noise);


// Material
const smokeMaterial = new THREE.ShaderMaterial({
    wireframe: true,
    vertexShader: Vertex,
    fragmentShader: Fragment,
    side: THREE.DoubleSide,
    uniforms:
    {        
        uTime: new THREE.Uniform(0),
        uPerlinTexture: new THREE.Uniform(noise),
    },
    transparent: true
})

// Mesh
const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial)
scene.add(smoke)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y = 3.5
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // update smoke
    smokeMaterial.uniforms.uTime.value = elapsedTime
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()