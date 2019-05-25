import galaxy1 from './galaxy1.jpg';
import { renderImage } from '../Helpers/helpers';

class Galaxy {
    constructor(props){
        this.create = props.create;
        this.image = renderImage(galaxy1);
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