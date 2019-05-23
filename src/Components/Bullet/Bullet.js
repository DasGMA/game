
class Bullet {
    constructor(args){
        this.position = {
            x: args.spaceship.position.x,
            y: args.spaceship.position.y
        };
        this.speed = 6;
    }

    render(state){
        // Moving bullet
        this.position.x -= this.speed;
        this.position.y -= this.speed;

        const context = state.context;

        // Draw a bullet
        context.save();
        context.translate(this.position.x, this.position.y);
        context.fillStyle = '#fff';
        context.lineWidth = 0.5;
        context.beginPath();
        context.arc(0, 0, 2, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.restore();
    }
}

export default Bullet;