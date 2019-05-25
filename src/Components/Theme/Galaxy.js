import galaxy1 from './galaxy1.jpg';

class Galaxy {
    constructor(props){
        this.create = props.create;
        this.image = new Image();
        this.image.src = galaxy1;
    }

    render(state){

        // Draw galaxy
        const context = state.context;
        
        context.save();
        context.drawImage(this.image, 0, 0);
        context.restore();

    }
}

export default Galaxy;