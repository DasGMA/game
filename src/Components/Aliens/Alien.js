import randomNumber from '../Helpers/helpers';


class Alien {
    constructor(args){
        this.position = args.position;
        this.speed = randomNumber(10, 20);
    };

    render(state){
        // Alien moving
        

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