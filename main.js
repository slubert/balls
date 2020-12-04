const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('mousedown', onMouseDown);

let colors = ['red', 'yellow', 'pink', 'blue', 'orange', 'gray', 'purple']

const balls = []



function onMouseDown(event) {
    mouseXPosition = event.clientX - (window.innerWidth - canvas.width) / 2;
    mouseYPosition = event.clientY - (window.innerHeight - canvas.height) / 2;

    balls.push({
        x: mouseXPosition,
        y: mouseYPosition,
        color: colors[getRandomeNumber(0, colors.length)],
        size: getRandomeNumber(40, 80),
        xd: getRandomeNumber(-10, 10),
        yd: getRandomeNumber(-10, 10),
    })
}



function update(){
    clear();

    draw();
    newPosition();

    requestAnimationFrame(update)
}

function clear(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function draw(){
    for(let i = 0; i < balls.length; i++){
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].size, 0, Math.PI * 2);
        ctx.fillStyle = balls[i].color;
        ctx.fill();
    }
}

function newPosition(){
    for(let i = 0; i < balls.length; i++){
        balls[i].x += balls[i].xd;
        balls[i].y += balls[i].yd;

        wallBaunce(i);
        ballToBallColision(i);
    }

}

function wallBaunce(i){
    //right
    if (balls[i].x + balls[i].size > canvas.width){
        balls[i].xd = -balls[i].xd
        balls[i].x = canvas.width - balls[i].size
    }

    //left
    if (balls[i].x - balls[i].size < 0){
        balls[i].xd = -balls[i].xd
        balls[i].x = balls[i].size
        
    }

    //lower
    if (balls[i].y + balls[i].size > canvas.height){
        balls[i].yd = -balls[i].yd
        balls[i].y = canvas.height - balls[i].size
    }

    //upper
    if (balls[i].y - balls[i].size < 0){
        balls[i].yd = -balls[i].yd
        balls[i].y = balls[i].size
    }
}

function ballToBallColision(i){
    for(let e = 0; e < i; e++){
        if(i != e){
            let distanceBetweenX = balls[i].x - balls[e].x;
            let distanceBetweenY = balls[i].y - balls[e].y;
            let distance = Math.sqrt(distanceBetweenX * distanceBetweenX + distanceBetweenY * distanceBetweenY)
            
            if(distance < (balls[i].size + balls[e].size)){
                console.log('bonk')
                
                let overLap = 0.5 * (distance - balls[i].size - balls[e].size)
                
                balls[i].x -= overLap * (balls[i].x - balls[e].x) / distance;
                balls[i].y -= overLap * (balls[i].y - balls[e].y) / distance;
                
                balls[e].x += overLap * (balls[i].x - balls[e].x) / distance;
                balls[e].y += overLap * (balls[i].y - balls[e].y) / distance;
                
                // normal
                let nx = (balls[e].x - balls[i].x) / distance;
                let ny = (balls[e].y - balls[i].y) / distance;
                
                //target
                let tx = -ny;
                let ty = nx;
                
                //dot pruduct target
                let dpTan1 = balls[i].xd * tx + balls[i].yd * ty;
                let dpTan2 = balls[e].xd * tx + balls[e].yd * ty;
                
                //dot product normal
                let dpNorm1 = balls[i].xd * nx + balls[i].yd * ny;
                let dpNorm2 = balls[e].xd * nx + balls[e].yd * ny;
                
                // Conservation of momentum in 1D
                let m1 = (dpNorm1 * (balls[i].size - balls[e].size) + 2.0 * balls[e].size * dpNorm2) / (balls[i].size + balls[e].size)
                let m2 = (dpNorm2 * (balls[e].size - balls[i].size) + 2.0 * balls[i].size * dpNorm1) / (balls[i].size + balls[e].size)
                
                
                // Update ball velocities
                balls[i].xd = tx * dpTan1 + nx * m1;
                balls[i].yd = ty * dpTan1 + ny * m1;
                balls[e].xd = tx * dpTan2 + nx * m2;
                balls[e].yd = ty * dpTan2 + ny * m2;
                
            }
        }
    }
}
  

function getRandomeNumber(min, max){
    let result = Math.floor(min + Math.random() * (max - min))
    return(result)
}


update();