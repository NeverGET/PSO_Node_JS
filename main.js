const ParticleSwarmOptimization = require("pso");

// arrayify is transform stream that turns two input streams
// into one stream by wraping packets of inputs in array.
// So trainingSet outputs arrays [<feature>, <label>]
const canvas = document.createElement('canvas');
document.body.appendChild(canvas)

canvas.width = window.screen.width
canvas.height = window.screen.height
const swarm_size = 500;
const range_w = canvas.width;
const range_h = canvas.height;
let result;
require("linear_regression");
const target_w = (Math.random() * range_w - range_w / 2);
const target_h = (Math.random() * range_h - range_h / 2);
particles = Array.from({length: swarm_size}, () => [(Math.floor((Math.random() * 125)+125)), (Math.floor((Math.random() * 256))), (Math.floor((Math.random() * 125)+125))]);
const swarm = Array.from({length: swarm_size}, () => [(Math.floor((Math.random() * range_w) - range_w / 2)), (Math.floor((Math.random() * range_h) - range_h / 2))]);
let PSO = new ParticleSwarmOptimization(swarm, 0.3, 0.01, 0.95, 100000, 1, undefined,
    (value, index, array, args) => {
        let x = (value[0] + target_w/2) ** 2 + (value[1] + target_h/2) ** 2;
        return 1 / (1 + Math.abs(x - 17) ** 4);
    });
PSO.iteration().then(r => result);

const context = canvas.getContext('2d');

//context.fillStyle = 'red'
//context.fillRect(0, 0, 100, 100)

// context.fillStyle = 'green'
// context.fillRect(200, 0, 100, 100)

let x = 0;
let y = 0;
window.requestAnimationFrame(function loop() {
    x += .2
    y += .5

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = 'rgb(15,15,15)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    PSO.swarm.map((value, index, array)=>{
        context.fillStyle = `rgb(${particles[index][0]}, ${particles[index][1]}, ${particles[index][2]})`;
        context.fillRect(value[0] + canvas.width/2, value[1] + canvas.height/2, 5, 5)

    })
    if (!PSO.isDone)
        window.requestAnimationFrame(loop)
    else{
        context.fillStyle = `rgb(255,15,15)`;
        context.fillRect(PSO.gBest[0] + canvas.width/2 - 25, PSO.gBest[1] + canvas.height/2 - 25, 50, 50)
    }
}.bind(this));


/*document.addEventListener('mousedown', function(event) {
    if (event.button === 0) {
        x += 10
    }
    if (event.button === 2) {
        y += 10
    }
})*/
