//declaring varables 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let player = document.getElementById('player');
let animationID = null;

class Player {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;

        this.image = image;
        //Jump animation
        this.jumpHeight = 12;
        this.shouldJump = false;
        this.jumpCounter = 0;
    }
    jump() {
        if (this.shouldJump) {
            this.jumpCounter++;
            if (this.jumpCounter < 15) {
                this.y -= 0;
            } else if (this.jumpCounter > 14 && this.jumpCounter < 19) {
                this.y += 0;
            } else if (this.jumpCounter < 33) {
                this.y += this.jumpHeight;
            }
        }
    }
    draw() {
        this.jump();
        this.image = ctx.drawImage(player, 100, 515, 30, 35);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.height, this.width);
    }
}

let character = new Player(100, 515);



function drawBackgroundLine() {
    ctx.beginPath();
    ctx.moveTo(0, 550);
    ctx.lineTo(1500, 550);
    ctx.lineWidth = 2.9;
    ctx.strokeStyle = "black";
    ctx.stroke();
}



function animate() {
    animationID = requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBackgroundLine();
    character.draw();
}



animate();