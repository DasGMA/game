import {randomNumber, playSound, renderImage} from '../Helpers/helpers';
import alienDeath from '../Sounds/Aliens/alienDeath.mp3';
import alien from '../Images/Aliens/alien1.png';

class Alien {
    constructor(props){
        this.position = props.position;
        this.speed = {
            x: randomNumber(-5, 5),
            y: randomNumber(-5, 5)
        };
        this.radius = 27;
        this.points = Math.abs(this.speed.x * this.speed.y * 5);
        this.addPoints = props.addPoints;
        this.image = renderImage(alien);
    };

    destroy() {
        this.delete = true;
        this.addPoints(this.points);
        playSound(alienDeath);
    }

    render(state){
        // Alien moving
        this.position.x -= this.speed.x;
        this.position.y += this.speed.y;

        // Checking for the window edges
        // Checking the X axis edges
        if (this.position.x > state.screen.width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = state.screen.width;
        };
        // Checking the Y axis edges
        if (this.position.y > state.screen.height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = state.screen.height;
        }

        // Draw alien
        const context = state.context;

        context.save();
        context.translate(this.position.x, this.position.y);
        context.drawImage(this.image, -20, 14);
        context.restore();
    }
}

export default Alien;