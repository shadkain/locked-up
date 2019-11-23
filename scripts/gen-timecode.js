const fs = require('fs');

const file = fs.readFileSync('/Users/jason/Desktop/ВЗАПЕРТИ/Electron App/public/assets/videos/tt.json');
const meta = JSON.parse(file);

let frames = [];
meta.frames.forEach(frame => {
    if (frame.media_type === 'video') {
        frames.push(frame.pkt_dts / 1000);
    }
});

let res = {
    count: frames.length,
    frames: frames,
};

fs.writeFileSync('./public/assets/videos/gen.json', JSON.stringify(res));

console.log(`Handled ${frames.length} frames`);