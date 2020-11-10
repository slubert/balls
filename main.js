const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

document.addEventListener("click", onMouseKlick);

let colors = ['red', 'yellow', 'pink', 'black', 'blue', 'orange', 'gray', 'purple']

let xPosition;
let yPosition;


function onMouseKlick(event) {
    xPosition = event.clientX;
    yPosition = event.clientY;
}



function update(){
    clear();




    requestAnimationFrame(update)
}

function getRandomeNumber(min, max){
    let result = Math.floor(min + Math.random() * (max - min))
    return(result)
}


update();