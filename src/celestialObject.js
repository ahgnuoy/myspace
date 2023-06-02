import {
    SphereGeometry,
    Mesh,
    MeshPhongMaterial,
    Vector3,
} from 'three';
// Planets, Stars
export default class CelestialObject{
    constructor( radius, mass, color ) {
        this.mesh = new Mesh( new SphereGeometry( radius ), new MeshPhongMaterial( { color: color } ) );
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mass = mass;
        this.velocity = new Vector3( 0, 0, 0 );
    }
    setPosition( x, y, z ) {
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
    }
    getPosition() {
        return this.mesh.position;
    }
    setVelocity( velocity ) {
        this.velocity = velocity;
    }
}