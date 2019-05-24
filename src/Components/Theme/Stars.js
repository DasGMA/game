import { randomNumber } from '../Helpers/helpers';

class Star {
    constructor(props){
        this.position = props.position;
        this.speed = 3;
        this.create = props.create;
    }

    render(state){
        // Star movement
        this.position.y += this.speed;

        // Checking for the window edges
        // Checking the Y axis edges
        if (this.position.y > state.screen.height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = state.screen.height;
        };

        // Draw a star
        const context = state.context;

        context.save();
        context.translate(this.position.x, this.position.y);
        context.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        context.lineWidth = 1;
        context.beginPath();
        context.arc(0, 0, randomNumber(3, 10), 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.restore();

    }
}

export default Star;