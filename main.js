//declaring varables 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let player = document.getElementById('player');
let playerJump = document.getElementById('playerJump');
let animationID = null;

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
    constructor(x, y, size, color) {
        this.x = canvas.width + size;
        this.y = 500-size;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }
}

let enemy = new Obstacles(1300, 500, 50, "green")

function drawBackgroundLine() {
    ctx.beginPath();
    ctx.moveTo(0, 550);
    ctx.lineTo(1500, 550);
    ctx.lineWidth = 2.9;
    ctx.strokeStyle = "black";
    ctx.stroke();
}



function animate() {
    animationID = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackgroundLine();
    character.draw();
    enemy.draw();
}



animate();


//Event Listeners

addEventListener("keydown", e => {
    if (e.code === "Space") {
        if (!character.shouldJump) {
            character.jumpCounter = 0;
            character.shouldJump = true;
            // canScore = true;
        }
    }
})