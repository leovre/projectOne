//declaring varables 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const card = document.querySelector(".card");
const cardScore = document.getElementById("card-score");
let player = document.getElementById('player');
let playerJump = document.getElementById('playerJump');
let obstacleImg = document.getElementById('spike-obstacle')
let animationID = null;
let presetTime = 1000;
let arrayBlocks = [];
let obstacleSpeed = 12;
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

function startGame() {
    character = new Player(100, 505);
    arrayBlocks = [];
    score = 0;
    scoreIncrement = 0;
    canScore = true;
    presetTime = 1000;
    obstacleSpeed=12;
}

function restartGame(button) {
    card.style.display = "none";
    button.blur();
    startGame();
    requestAnimationFrame(animate);
}

function drawScore() {
    ctx.font = "80px Arial";
    ctx.fillStyle = "black"
    let scoreString = score.toString();
    let xOffset = ((scoreString.length - 1) * 20);
    ctx.fillText(scoreString, 730 - xOffset, 100);
}
function isPastBlock(player, block) {
    return (
        player.x + (player.width / 2) > block.x + (block.width / 4) &&
        player.x + (player.width / 2) < block.x + (block.width / 4) * 3
    )
}

class Obstacles {
    constructor(speed) {
        this.height = 55;
        this.width = 40;
        this.x = canvas.width + 20;
        this.y = 562 - 42;
        this.size = 50;
        this.color = "transparent";
        this.slideSpeed = speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.height, this.width);
        this.image = ctx.drawImage(obstacleImg, this.x, this.y, this.height, this.width)
    }

    slide() {
        this.x -= this.slideSpeed;
        this.draw();
    }
}


let enemy = new Obstacles(obstacleSpeed)

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
    arrayBlocks.push(new Obstacles(obstacleSpeed));

    setTimeout(generateObstacles, delay);
    //return arrayBlocks;
}


function drawBackgroundLine() {
    ctx.beginPath();
    ctx.moveTo(0, 550);
    ctx.lineTo(1500, 550);
    ctx.lineWidth = 2.9;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function obstacleCollision(player, block) {
    return !(
        player.x > block.x + block.width ||
        player.x + player.width < block.x ||
        player.y > block.y + block.height ||
        player.y + player.height < block.y
    )
}
// function increaseSpeed() {
//     if (scoreIncrement + 10 === score) {
//         scoreIncrement === score;
//         obstacleSpeed++;
//         presetTime >= 100 ? presetTime -= 100 : presetTime = presetTime / 2;
//         arrayBlocks.forEach(block => {
//             block.slideSpeed = obstacleSpeed;
//         });
//     }
// }
//console.log(enemy.size);

function animate() {
    animationID = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackgroundLine();
    drawScore()
    character.draw();
    //increaseSpeed();
    arrayBlocks.forEach(function (arrayBlock) {
        // setInterval(arrayBlock.slide, 1000);
        arrayBlock.slide();
        console.log(arrayBlock)
        if (obstacleCollision(character, arrayBlock)) {
            cancelAnimationFrame(animationID);
            cardScore.textContent = score;
            card.style.display = "block";
        }

        if (isPastBlock(character, arrayBlock) && canScore) {
            canScore = false;
            score++;
        }

        // if ((arrayBlock.x + arrayBlock.size) <= 0) {
        //     setTimeout(() => {
        //         arrayBlocks.splice(index, 1);
        //     }, 0)
        // }



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
