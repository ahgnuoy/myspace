import * as Util from './util';

let deltaTime;

export default class Physics {
    constructor( planets, clock ) {
        this.planets = planets;
        this.clock = clock;
    }
    updatePosition() {
        deltaTime = this.clock.getDelta();
        this.planets.forEach( planet => {
            planet.setPosition(
                planet.velocity.x * deltaTime + planet.mesh.position.x,
                planet.velocity.y * deltaTime + planet.mesh.position.y,
                planet.velocity.z * deltaTime + planet.mesh.position.z
            )
            for( var fPlanet of this.planets ) {
                if( planet != fPlanet ) {
                    planet.velocity.add(
                        Util.force( planet, fPlanet ).divideScalar( planet.mass )
                    )
                }
            }
        })
    }
}