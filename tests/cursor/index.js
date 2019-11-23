const canvas = document.createElement('canvas');
canvas.width = 1440;
canvas.height = 900;
const ctx = canvas.getContext('2d');

document.body.appendChild(canvas);

const img = {
    active: document.createElement('img'),
    sleep: document.createElement('img'),
}

img.active.src = 'cursor-active.png';
img.sleep.src = 'cursor-sleep.png';

let current = img.active;
let lastPosition = {x: 0, y: 0};
let currentPosition = {x: 0, y: 0};

let redraw = false;

document.addEventListener('mousemove', e => {
    currentPosition.x = e.pageX;
    currentPosition.y = e.pageY;
    redraw = true;
});

let size = {
    x: 299,
    y: 259,
};
size.x *= 0.4;
size.y *= 0.4;

function render() {
    if (redraw) {
        ctx.clearRect(lastPosition.x, lastPosition.y, size.x, size.y);
        ctx.drawImage(current, currentPosition.x, currentPosition.y, size.x, size.y);

        lastPosition.x = currentPosition.x;
        lastPosition.y = currentPosition.y;
        redraw = false;

        console.log('rendered');
    }

    requestAnimationFrame(render);
}
render();