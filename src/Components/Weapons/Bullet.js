import { playSound } from "../Helpers/helpers";
import laserBullet from '../Sounds/Spaceship/Weapons/laserBullet.mp3';

class Bullet {
    constructor(props){
        this.position = {
            x: props.spaceship.position.x,
            y: props.spaceship.position.y
        };
        this.speed = 7;
        this.radius = 2;
        this.sound = playSound(laserBullet)
    }

    destroy(){
        this.delete = true;
    }

    render(state){
        // Moving bullet vertically from the shot point
        this.position.y -= this.speed;

        // Check for the Y edge at the top
        if (this.position.y > state.screen.height) {
            this.destroy();
        }

        const context = state.context;

        // Draw a bullet
        context.save();
        context.translate(this.position.x, this.position.y);
        context.fillStyle = '#fff';
        context.lineWidth = 1;
        context.beginPath();
        context.arc(0, 0, 2, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.restore();
    }
}

export default Bullet;