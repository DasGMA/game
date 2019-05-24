import React, {Component } from 'react';
import Spaceship from './Components/Spaceship/Spaceship';
import Alien from './Components/Aliens/Alien';
import {randomNumber}  from './Components/Helpers/helpers';
import Star from './Components/Theme/Stars';

const KEYS = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  W: 87,
  S: 83,
  A: 65,
  D: 68,
  SPACE: 32
}

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      context: 0,
      runningGame: false,
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        resize: window.devicePixelRatio || 1
      },
      keys: {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        space: 0
      },
      aliens: 10,
      stars: 50,
    }
    
    this.spaceship = [];
    this.bullets = [];
    this.aliens = [];
    this.stars = [];
  }

  componentDidMount(){
    window.addEventListener('keyup', this.handleDirections.bind(this, false));
    window.addEventListener('keydown', this.handleDirections.bind(this, true));
    window.addEventListener('resize', this.screenResize.bind(this, false));

    const context = this.refs.canvas.getContext('2d');
    this.setState({
      context: context
    });

    this.startGame();
    requestAnimationFrame(() => {this.update()}); 
  };

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleDirections);
    window.removeEventListener('keydown', this.handleDirections);
    window.removeEventListener('resize', this.screenResize);
  };

  screenResize(value, event) {
    this.setState({
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        resize: window.devicePixelRatio || 1
      }
    });
  };

  handleDirections(value, event){
    let keys = this.state.keys;

    if (event.keyCode === KEYS.UP || event.keyCode === KEYS.W) keys.up = value;
    if (event.keyCode === KEYS.DOWN || event.keyCode === KEYS.S) keys.down = value;
    if (event.keyCode === KEYS.LEFT || event.keyCode === KEYS.A) keys.left = value;
    if (event.keyCode === KEYS.RIGHT || event.keyCode === KEYS.D) keys.right = value;
    if (event.keyCode === KEYS.SPACE) keys.space = value;

    this.setState({
      keys: keys
    });
  };

  startGame = () => {
    this.setState({
      runningGame: true,
    });

    let spaceship = new Spaceship({
      position: {
        x: this.state.screen.width/2,
        y: this.state.screen.height/1.2
      },
      create: this.createObject.bind(this),
    });

    this.createObject('spaceship', spaceship);
    this.makeAliens(this.state.aliens);
    this.makeStars(this.state.stars);

  };

  makeStars(numberValue){
    for (let i = 0; i < numberValue; i++){
      let star = new Star({
        position: {
          x: randomNumber(0, this.state.screen.width),
          y: randomNumber(0, this.state.screen.height)
        },
        create: this.createObject.bind(this),
      });
      this.createObject('stars', star);
    };
  }

  makeAliens(numberValue){
    for (let i = 0; i < numberValue; i++){
      let alien = new Alien({
        position: {
          x: randomNumber(0, this.state.screen.width),
          y: randomNumber(0, this.state.screen.height)
        },
        create: this.createObject.bind(this),
      });
      this.createObject('aliens', alien);
    };
  };

  gameOver = () => {
    this.setState({
      runningGame: false
    });
  };

  createObject (group, item) {
    this[group].push(item);
  }

  update = () => {
    const context = this.state.context;
    
    context.save();
    context.scale(this.state.screen.resize, this.state.screen.resize);

    context.fillStyle = '#000';
    context.globalAlpha = 0.4;
    context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
    context.globalAlpha = 1;

    // More aliens
    /* if (!this.aliens.length){
      let newAliens = this.state.aliens + 1;
      this.makeAliens(newAliens);
    }; */

    this.updateObjects('spaceship', this.spaceship);
    this.updateObjects('bullets', this.bullets);
    this.updateObjects('aliens', this.aliens);
    this.updateObjects('stars', this.stars);

    context.restore();

    requestAnimationFrame(() => {this.update()});
  };

  updateObjects(group, items){
    let index = 0;
    for (let item of items){
      if (item.delete){
        this[group].splice(index, 1);
      } else {
        items[index].render(this.state);
      }
      index ++;
    }
  }


  render(){
    return(
      <div>
        <canvas 
          ref = 'canvas'
          width = {this.state.screen.width * this.state.screen.resize}
          height = {this.state.screen.height * this.state.screen.resize}
        />
      </div>
    )
  }
}

export default App;
