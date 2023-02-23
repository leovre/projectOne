//declaring varables 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let player = document.getElementById('player');
let playerJump = document.getElementById('playerJump');
let obstacleImg = document.getElementById('spike-obstacle')
let animationID = null;
let presetTime = 1000;
let arrayBlocks = [];
let obstacleSpeed = 10;
let score = 0;
let scoreIncrement = 0;
let canScore = true;

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.height = 45;
        this.width = 40;
        //Jump animation
        this.jumpHeight = 12;
        this.shouldJump = false;
        this.jumpCounter = 0;
    }
    jump() {
        if (this.shouldJump) {
            ctx.drawImage(playerJump, this.x, this.y, this.width, this.height);
            this.jumpCounter++;
            if (this.jumpCounter < 15) {
                this.y -= this.jumpHeight;
            } else if (this.jumpCounter > 14 && this.jumpCounter < 19) {
                this.y += 0;
            } else if (this.jumpCounter < 33) {
                this.y += this.jumpHeight;
            } else {
                this.shouldJump = false;
            }
        }
    }
    draw() {
        this.jump();
        this.image = ctx.drawImage(player, this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

let character = new Player(100, 505);

class Obstacles {
    constructor(size, speed) {
        this.x = canvas.width + size;
        this.y = 562 - size;
        this.size = size;
        this.color = "transparent";
        this.slideSpeed = speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        this.image = ctx.drawImage(obstacleImg, this.x, this.y, this.size, this.size)
    }

    slide() {
        this.draw();
        this.x -= this.slideSpeed;
    }
}

//let enemy = new Obstacles(50, obstacleSpeed)

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNumberInterval(timeInterval) {
    let returnTime = timeInterval;
    if (Math.random() < 0.5) {
        returnTime += getRandomNumber(presetTime / 3, presetTime * 1.5)
    } else {
        returnTime -= getRandomNumber(presetTime / 3, presetTime / 2);
    }

    return returnTime;
}

function generateObstacles() {
    let delay = randomNumberInterval(presetTime);
    arrayBlocks.push(new Obstacles(50, obstacleSpeed));

    setTimeout(generateObstacles, delay);
}

function drawBackgroundLine() {
    ctx.beginPath();
    ctx.moveTo(0, 550);
    ctx.lineTo(1500, 550);
    ctx.lineWidth = 2.9;
    ctx.strokeStyle = "black";
    ctx.stroke();
}



function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackgroundLine();
    character.draw();
    arrayBlocks.forEach((arrayBlock) => {
        arrayBlock.slide();
    })
}



animate();
setTimeout(() => {
    generateObstacles();
}, randomNumberInterval)

//Event Listeners

addEventListener("keydown", e => {
    if (e.code === "Space") {
        if (!character.shouldJump) {
            character.jumpCounter = 0;
            character.shouldJump = true;
            canScore = true;
        }
    }
})