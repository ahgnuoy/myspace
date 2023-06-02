import {
    AmbientLight,
    DirectionalLight,
    Clock,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    Vector3,
    CubeTextureLoader
} from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import CelestialObject from './celestialObject';
import Physics from './physics';
import ft from '../asset/corona_ft.png';
import bk from '../asset/corona_bk.png';
import lf from '../asset/corona_lf.png';
import rt from '../asset/corona_rt.png';
import up from '../asset/corona_up.png';
import dn from '../asset/corona_dn.png';
let camera, scene, renderer, controls, clock, physics;
let sun, earth, moon;
init();
animate();
function init() {
    const ASPECT_RATIO = window.innerWidth / window.innerHeight;

    scene = new Scene();

    camera = new PerspectiveCamera( 50, ASPECT_RATIO, 0.1, 10000 );
    camera.position.set( 0, 1000, 1000 );

    scene.add( new AmbientLight( 0x0a0a0a ) );

    const ambientLight = new AmbientLight( 0xffffff, 0.5 );
    const light = new DirectionalLight( 0xffffff, 0.5 );
    // light.position.set( -100, 0, 0 );
    // light.castShadow = true;
    // light.shadow.camera.zoom = 2; // tighter shadow map
    scene.add( light, ambientLight );

    clock = new Clock();
    clock.start()

    sun = new CelestialObject( 50, 100, 0xffffff );
    sun.setPosition( 0, 0, 0 );
    earth = new CelestialObject( 12, 20, 0x88eeaa );
    earth.setPosition( 200, 0, 0 );
    earth.setVelocity( new Vector3( 0, -30, 0 ) );
    moon = new CelestialObject( 3, 0.1, 0xffffaa );
    moon.setPosition( 225, 0, 0 );
    moon.setVelocity( new Vector3( 0, 5, 0 ) );
    scene.add( moon.mesh, earth.mesh, sun.mesh );
    physics = new Physics( [ sun, moon, earth ], clock );

    const loader = new CubeTextureLoader();
    const texture = loader.load([ ft, bk, up, dn, rt, lf ]);
    scene.background = texture;


    renderer = new WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );
    
    window.addEventListener( 'resize', onWindowResize );
    createControl( camera );
}
function createControl( camera ) {
    controls = new TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 10.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
}
function onWindowResize() {
    const ASPECT_RATIO = window.innerWidth / window.innerHeight;
    camera.aspect = ASPECT_RATIO;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
    animator();
    requestAnimationFrame( animate );
    controls.update();
    render();
}
function render() {
    renderer.render( scene, camera );
}
function animator() {
    physics.updatePosition();
}