var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var background_sound = new Audio("background_sound.mp3");
var jump_sound = new Audio("jump.mp3");
var end_sound = new Audio("end.mp3");


var img_background = new Image();
img_background.src = 'background.jpg';
var back = {
    x:0,
    y:0,
    width:canvas.width/1.3,
    height:canvas.height/2,

    draw(){
        ctx.drawImage(img_background, this.x, this.y, this.width, this.height);
    }
}
back.draw();

var img_user = [];
var img_user1 = new Image();
img_user1.src = 'pika1.png';
var img_user2 = new Image();
img_user2.src = 'pika2.png';
var img_user3 = new Image();
img_user3.src = 'pika3.png';
var img_user4 = new Image();
img_user4.src = 'pika4.png';

img_user = [img_user1, img_user2, img_user3, img_user4];

var user = {
    x:10,
    y:250,
    width:65,
    height:50,
    img_index:0,

    draw(a){
        if(a%5==0){
            this.img_index = (this.img_index+1)%4;
        }
        if(user.y<250){
            ctx.drawImage(img_user[0], this.x, this.y, this.width, this.height);
        }
        else{
            ctx.drawImage(img_user[this.img_index], this.x, this.y, this.width, this.height);
        }
        //ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
user.draw(0);

var img_bomb = new Image();
img_bomb.src = "bomb.png";

class Bomb{
    constructor(){
        this.x = 300;
        this.y = 250;
        this.width = 50;
        this.height = 50;
    }

    draw(){
        //ctx.fillStyle="red";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img_bomb, this.x, this.y);
    }
}

//var bomb = new Bomb();
//bomb.draw();

var timer = 0;
var bombs = [];
var jumpingTimer = 0; //60프레임 세주는 변수
var animation;

function frameSecond(){
    animation = requestAnimationFrame(frameSecond);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    timer++;

    back.draw();

    gameScore();

    background_sound.play();

    if(timer%60==0){
        var bomb = new Bomb();
        bombs.push(bomb);
    }
   
    bombs.forEach((b,i,o)=>{
        if(b.x<0){
            o.splice(i,1);
        }
        b.x--;
        bomb_gameScore(b.x);
        collision(user,b);
        b.draw()
    })
    //user.x=user.x+3;
   
    if(jumping ==true){
        user.y=user.y-3;
        jumpingTimer++;
    }
    if(jumpingTimer>30){
        jumping = false;
        jumpingTimer = 0;
    }
    if(jumping ==false && user.y<250){
        user.y++;
    }
    user.draw(timer);
}

frameSecond();

function collision(user, bomb){
    var x_diff = bomb.x - (user.x+user.width);
    var y_diff = bomb.y - (user.y+user.height);
    if(x_diff<0 && y_diff<0){
        //ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);

        ctx.fillStyle = "red";
        ctx.font = '60px 맑은 고딕';
        ctx.fillText('GAME OVER', canvas.width/5, canvas.height/5);

        end_sound.play();
        background_sound.pause();
        
    }
}


var jumping = false;
document.addEventListener('keydown', function(e){
    if(e.code =="Space"){
        jumping = true;
        jump_sound.play();
    }
})

function gameScore(score){
    ctx.font = '20px 맑은 고딕';
    ctx.fillStyle = 'black';
    ctx.fillText('SCORE : '+Math.round(timer/100), 10,30);
}

var score = 0;
function bomb_gameScore(x){
    ctx.font = '20px 맑은 고딕';
    ctx.fillStyle = 'black';

    if(x==0){
        score++;
    }
    ctx.fillText('SCORE : '+score, 10,60);
}