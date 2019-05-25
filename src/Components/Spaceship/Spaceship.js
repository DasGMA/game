import Bullet from '../Weapons/Bullet';
import { playSound } from '../Helpers/helpers';
import deathSound from '../Sounds/Spaceship/Death_sound/explode.mp3';
import spaceship from '../Images/Spaceship/spaceship.png';

class Spaceship {
    constructor(props){
        this.position = props.position;
        this.create = props.create;
        this.moveSpeed = 5;
        this.shot = 0;
        this.radius = 35;
        this.die = props.die;
        this.image = new Image();
        this.image.src = spaceship;
    }

    destroy(){
        this.delete = true;
        this.die();
        playSound(deathSound);   
    };

    render(state){

        // Movement
        if (state.keys.up){
            // Moving up
            console.log('Up');
            this.position.y -= this.moveSpeed
        };
        if (state.keys.down){
            // Moving down
            console.log('Down');
            this.position.y += this.moveSpeed;
        };
        if (state.keys.left){
            // Moving left
            console.log('Left');
            this.position.x -= this.moveSpeed;
        };
        if (state.keys.right){
            // Moving right
            console.log('Right');
            this.position.x += this.moveSpeed;
        };
        if (state.keys.space && Date.now() - this.shot > 200){
            // Shooting added timer so bullets are spaced out
            console.log('Shooting');
            let bullet = new Bullet({ spaceship: this });
            this.create('bullets', bullet);
            this.shot = Date.now();
        };

        // Checking for the window edges
        // Checking the Y axis edges
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

        // Drawing spaceship
        const context = state.context;

        context.save();
        context.translate(this.position.x, this.position.y);
        context.drawImage(this.image, -35, 0);
        context.restore();

    }

    

}

export default Spaceship;