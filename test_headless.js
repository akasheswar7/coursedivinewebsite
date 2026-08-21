const { execSync } = require('child_process');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const cmd = " \ --headless --disable-gpu --screenshot=live_check.png --window-size=1280,800 https://akasheswar7.github.io/coursedivinewebsite/;

console.log('Running:', cmd);
execSync(cmd);

if (fs.existsSync('live_check.png')) {
 console.log('Screenshot size:', fs.statSync('live_check.png').size);
} else {
 console.log('No screenshot file created.');
}
