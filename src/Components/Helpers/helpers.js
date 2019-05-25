
import space from '../Sounds/Space/space.mp3';

// Function for generating a random number
export function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

// Now we need to check the collisions for the specific items in the arrays we have
export function collisionBetween(item1, item2){
    let a = item1.length - 1;
    let b;
    for (a; a > -1; --a){
        b = item2.length - 1;
        for (b; b > -1; --b){
        let object1 = item1[a];
        let object2 = item2[b];
            if (collision(object1, object2)) {
            object1.destroy();
            object2.destroy();
            }
        }
    };
};

// This collision function checking for circle collisions
function collision(item1, item2){
    let vx = (item1.position.x - item2.position.x);
    let vy = (item1.position.y - item2.position.y);
    let length = Math.sqrt(vx * vx + vy * vy);
        if (length < item1.radius + item2.radius){
        return true;
        };
    return false;
};


// Function for playing sounds
export function playSound(soundFile){
    console.log('Sound')
    let sound = new Audio(soundFile);
    if (soundFile === space) {
        sound.loop = true;
        sound.volume = 0.7;
    }   
    return sound.play();
};

// Function for the image rendering

export function renderImage(imageSource){
    let image = new Image();
    image.src = imageSource;
    return image;
}