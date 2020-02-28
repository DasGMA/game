import React, {Component } from 'react';
import KEYS from './Components/Keys/keys';
import Spaceship from './Components/Spaceship/Spaceship';
import Alien from './Components/Aliens/Alien';
import { randomNumber, collisionBetween }  from './Components/Helpers/helpers';
import Star from './Components/Theme/Stars';
import Galaxy from './Components/Theme/Galaxy';

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
      stars: 100,
      currentPoints: 0,
      level: 1,
      highestPoints: 0
    }
    
    this.spaceship = [];
    this.bullets = [];
    this.aliens = [];
    this.stars = [];
    this.galaxies = [];
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
    this.createGalaxy();
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

  handleDirections(value, event) {
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

  createGalaxy = () => {
    let galaxy = new Galaxy({
      //create: this.createObject.bind(this)
    });

    this.createObject('galaxies', galaxy);
  };

    startGame = () => {
      this.setState({
        runningGame: true,
        currentPoints: 0,
        level: 1
    });

    let spaceship = new Spaceship({
      position: {
        x: this.state.screen.width/2,
        y: this.state.screen.height/1.3
      },
      create: this.createObject,
      die: this.gameOver
    });

    this.aliens = [];
    this.createObject('spaceship', spaceship);
    this.makeAliens(this.state.aliens);

    this.stars = [];
    this.makeStars(this.state.stars);
  };

  makeStars(numberValue){
    for (let i = 0; i < numberValue; i++){
      let star = new Star({
        position: {
          x: randomNumber(0, this.state.screen.width),
          y: randomNumber(0, this.state.screen.height)
        }
      });
      this.createObject('stars', star);
    };
  }

  makeAliens = (numberValue) => {
    for (let i = 0; i < numberValue; i++){
      let alien = new Alien({
        position: {
          x: randomNumber(0, this.state.screen.width),
          y: randomNumber(0, this.state.screen.height)
        },
        addPoints: this.addPoints
      });
      this.createObject('aliens', alien);
    };
  };

  gameOver = () => {
    this.setState({
      runningGame: false
    });

    if (this.state.currentPoints > this.state.highestPoints){
      this.setState({
        highestPoints: this.state.currentPoints
      });
    }
  };

  createObject = (group, item) => {
    this[group].push(item);
  }

  update = () => {
    const context = this.state.context;
    
    context.save();
    context.scale(this.state.screen.resize, this.state.screen.resize);

    context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
    
    // Checking the collisions
    collisionBetween(this.spaceship, this.aliens);
    collisionBetween(this.aliens, this.bullets);

    // More aliens
    if (!this.aliens.length){
      let newAliens = this.state.aliens + 1;
      this.makeAliens(newAliens);
      this.setState({
        level: this.state.level + 1
      });
    };

    this.updateObjects('galaxies', this.galaxies);
    this.updateObjects('stars', this.stars);
    this.updateObjects('spaceship', this.spaceship);
    this.updateObjects('bullets', this.bullets);
    this.updateObjects('aliens', this.aliens);
    

    context.restore();

    requestAnimationFrame(() => {this.update()});
  };

  // Checking objects. If object contains destroy() then updating by removing it.
  // Otherwise rendering
  updateObjects = (group, items) => {
    let index = 0;
    for (let item of items){
      if (item.delete){
        this[group].splice(index, 1);
      } else {
        items[index].render(this.state);
      }
      index ++;
    };
  };
  
  playAgain = () => {
    this.startGame();
  };

  addPoints = (points) => {
    if (this.state.runningGame){
      this.setState({
        currentPoints: this.state.currentPoints + points,
      });
    };
  };

  render(){
    let gameOver;
    let message;

    if (this.state.currentPoints === 0) {
      message = 'You have got 0 points. You suck!!!';
    } else if (this.state.currentPoints >= this.state.highestPoints){
      message = `Not bad! ${this.state.highestPoints} points. Top score!!`
    } else {
      message = 'You can do better than that!!'
    }

    if (!this.state.runningGame){
      gameOver = <div className = 'game-over'>
                    <p>Game Over</p>
                    <p>{message}</p>
                    <button onClick = {this.playAgain}>Play again!!!</button>
                  </div>
    }
    return(
      <div>
      {gameOver}
      <span className = 'current-points'>Current points: {this.state.currentPoints}</span>
      <span className = 'info'>Arrows or W, S, D, A to move.<br/>SPACE to shoot.</span>
      <span className = 'level'>Level: {this.state.level}</span>
      <span className = 'highest-points'>Highest points: {this.state.highestPoints}</span>
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
