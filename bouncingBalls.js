var canvas, ctx, w, h; 
var balls = []; 

window.onload = function init() {
    // called after the page has been loaded
    
    // Create a canvas element and append to body
    canvas=document.createElement('canvas');
    document.body.append(canvas);
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    
    // Height and width of canvas object
    w=window.innerWidth;
    h=window.innerHeight; 
      
    ctx = canvas.getContext('2d');
    
    // Create 30 balls
    balls = createBalls(30);
  
    mainLoop();
};

function mainLoop() {
  
  ctx.clearRect(0, 0, w, h);
  
  // Draw balls
  drawAllBalls(balls);

  // animate the balls 
  moveAllBalls(balls)
  
  // ask for a new animation frame
  requestAnimationFrame(mainLoop);
}

function createBalls(n) {
  
  var ballArray = [];
  
  // create n balls
  for(var i=0; i < n; i++) {
     var b = {
        x:w/2,
        y:h/2,
        radius: 10 + 30 * Math.random(), // between 10 and 40
        speedX: -5 + 10 * Math.random(), // between -5 and + 5
        speedY: -5 + 10 * Math.random(), // between -5 and + 5
        color:getARandomColor(i),
      }
      
     // add ball b to the array
     ballArray.push(b);
    }
    
  // returns the array full of randomly created balls
  return ballArray;
}

function getARandomColor(i) {
  var colors = ['red', 'blue', 'cyan', 'purple', 'Deeppink', 'green', 'yellow'];
  var colorIndex= i%7;
  var c = colors[colorIndex];
  
  // return the random color
  return c;
}

function drawAllBalls(ballArray) {
    ballArray.forEach(function(b) {
      drawFilledCircle(b);
    });
}

function moveAllBalls(ballArray) {
  // iterate on all balls in array
  ballArray.forEach(function(b) {
      // b is the current ball in the array
      b.x += b.speedX;
      b.y += b.speedY;
  
      testCollisionBallWithWalls(b); 
  });
}

function testCollisionBallWithWalls(b) {
    // COLLISION WITH VERTICAL WALLS ?
    if((b.x + b.radius) > w) {
    // the ball hit the right wall
    // change horizontal direction
    b.speedX = -b.speedX;
    
    // put the ball at the collision point
    b.x = w - b.radius;
  } 
  else if((b.x -b.radius) < 0) {
    // the ball hit the left wall
    // change horizontal direction
    b.speedX = -b.speedX;
    
    // put the ball at the collision point
    b.x = b.radius;
  }
  
  // COLLISIONS WTH HORIZONTAL WALLS ?
  if((b.y + b.radius) > h) {
    // the ball hit the right wall
    // change horizontal direction
    b.speedY = -b.speedY;
    
    // put the ball at the collision point
    b.y = h - b.radius;
  } 
  else if((b.y -b.radius) < 0) {
    // the ball hit the left wall
    // change horizontal direction
    b.speedY = -b.speedY;
    
    // put the ball at the collision point
    b.Y = b.radius;
  }  
}

function drawFilledCircle(c) {
    
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.fillStyle = c.color;
    
    ctx.beginPath();
    ctx.arc(0, 0, c.radius, 0, 2*Math.PI);
    ctx.fill();
 
    ctx.restore();
}
