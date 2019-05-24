import {randomNumber} from '../Helpers/helpers';


class Alien {
    constructor(props){
        this.position = props.position;
        this.speed = {
            x: randomNumber(1, 7),
            y: randomNumber(1, 7)
        };
        this.create = props.create;
        this.radius = 10;
    };

    destroy() {
        this.delete = true;
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
        context.fillStyle = 'red';
        context.lineWidth = 1;
        context.beginPath();
        context.arc(0, 0, 10, 0, 10*Math.PI);
        context.closePath();
        context.fill();
        context.restore();
    }
}

export default Alien;