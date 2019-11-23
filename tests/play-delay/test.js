let video = document.createElement('video');
video.src = '../../public/assets/videos/start-run.webm';

let startTime = 0;
video.onplaying = () => {
    console.log(`Playing delay: ${performance.now() - startTime} ms`);
}
video.onplay = () => {
    console.log(`Play delay: ${performance.now() - startTime} ms`);
}

video.onloadeddata = () => {
    play();
}

function play() {
    startTime = performance.now();
    video.play();
}