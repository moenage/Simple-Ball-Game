var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = 50;
var dx = -1.5;
var dy = 1.5;
var ballRadius = 10;
var paddleHeight = 20;
var paddleWidth = 20;
var paddleX = (canvas.width-paddleWidth) / 2;
var paddleY = canvas.height-130;
var score = 0;
var maxballs = 3;//num of bad balls. so increase balls to increase difficulty
//NOTE: I found 3 to be the most balanced amount
var points = 0;
//Class for creating new ball objects
class ball {
  color = "red";
  xcor = 5;
  ycor = 5;
  dx = -1.5;
  dy = 1.5
  constructor(clr,xx,yy,dxx,dyy){
    this.color = clr;
    this.xcor = xx;
    this.ycor = yy;
    this.dx = dxx;
    this.dy = dyy;
  }
}
var count = 0;
var ballstorage = [];
ballstorage[0] = new ball("red",
                          x,
                          y,
                          dx,
                          dy);
class pointclass {
  color = "gold";
  xcor = Math.floor(Math.random() * 350) + 5;
  ycor = Math.floor(Math.random() * 300) + 1;
  constructor(clr,xx,yy){
    this.color = clr;
    this.xcor = xx;
    this.ycor = yy;
  }
}
var pointobj = new pointclass("gold",Math.floor(Math.random() * 350) + 5,Math.floor(Math.random() * 300) + 1);
//EVENT LISTENER FOR MOUSE
document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    if(relativeY > 0 && relativeY < canvas.height) {
      paddleY = relativeY - paddleWidth/2;
    }
    if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2;
    }
  }

  //Detecting contact Function with red balls ie: enemy
  function badcontactdetection(max,scr){
    for(var i = 0; i <= max; i ++){
      if(ballstorage[i].xcor > paddleX &&
         ballstorage[i].xcor < paddleX + paddleWidth &&
         ballstorage[i].ycor > paddleY &&
         ballstorage[i].ycor < paddleY + paddleHeight){
         alert(`GAME OVER! Your Score is: ${scr}!`);
         document.location.reload();
         clearInterval(interval); // Needed for Chrome to end game
       }
    }
  }
//Detecting when mouse player touches a golden point and changes the golden points positions to a random position
  function goodcontactdetection(obj){
    if(obj.xcor > paddleX && obj.xcor < paddleX + paddleWidth &&
      obj.ycor > paddleY && obj.ycor < paddleY + paddleHeight){
      points++;
      obj.xcor = Math.floor(Math.random() * 350) + 5;
      obj.ycor = Math.floor(Math.random() * 300) + 1;
    }
  }


//This function is to get random colors
function RandColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
//Array of ball objects
// var ballstorage = [];
// var i = 0;
// for(i; i < 10; i++){
//     ballstorage[i] = new ball(RandColor(),Math.floor(Math.random() * 350) + 5,Math.floor(Math.random() * 300) + 1);
// }

var blockcolor = "black";

//This function is used to draw the ball
function drawball(ballobj){
  ctx.beginPath();
  ctx.arc(ballobj.xcor,ballobj.ycor,ballRadius,0,Math.PI*2);
  ctx.fillStyle = ballobj.color;
  ctx.fill();
  ctx.closePath();
}

//Function for drawing score on the top left with shifting colors
function drawScore() {
    ctx.font = "16px Arial";
    //ctx.fillStyle = RandColor(); expereminted with this but it just looks like
    // a glitch to most people, but I like it :D
    ctx.fillStyle = '#08b615';
    ctx.fillText("Score: "+points, 8, 20);
}


// function goodball(){
//   ctx.beginPath();
//   ctx.arc(x,y,ballRadius,0,Math.PI*2);
//   ctx.fillStyle = RandColor();
//   ctx.fill();
//   ctx.closePath();
// }

//For the main character
function drawblock() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = blockcolor;
  ctx.fill();
  ctx.closePath();
}
//var testball = new ball(RandColor(),Math.floor(Math.random() * 350) + 5,Math.floor(Math.random() * 300) + 1);

//Main Function for the game
function game(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var i = 0;
    for(i; i <= count; i++){
      drawball(ballstorage[i]);
    }
    //drawball(testball);
    //goodball();
    drawball(pointobj);
    drawblock();
    drawScore();
    badcontactdetection(count,points);
    goodcontactdetection(pointobj);
    i = 0;
    for(i; i <= count; i++){
      ballstorage[i].xcor += ballstorage[i].dx;
      ballstorage[i].ycor += ballstorage[i].dy;
      if(ballstorage[i].xcor + ballstorage[i].dx > canvas.width-ballRadius || ballstorage[i].xcor + ballstorage[i].dx < ballRadius) {
            ballstorage[i].dx = -ballstorage[i].dx;
            score++;
            if (score < maxballs){
              ballstorage.push(new ball("red",
                                         ballstorage[i].xcor,
                                         ballstorage[i].ycor,
                                         ballstorage[i].dx,
                                         -ballstorage[i].dy))
            }
      }
        else if(ballstorage[i].ycor + ballstorage[i].dy > canvas.height-ballRadius || ballstorage[i].ycor + ballstorage[i].dy < ballRadius) {
            ballstorage[i].dy = -ballstorage[i].dy;
            score++;
            if(score < maxballs){
              ballstorage.push(new ball("red",
                                            ballstorage[i].xcor,
                                            ballstorage[i].ycor,
                                            -ballstorage[i].dx,
                                            ballstorage[i].dy))
            }
      }
      // ballstorage[i].xcor += ballstorage[i].dx+0.1;
      // ballstorage[i].ycor += ballstorage[i].dy+0.1;
    }
    count = score;
    if (score >= maxballs){
      count = maxballs-1;
    }

}

var interval = setInterval(game, 3);
