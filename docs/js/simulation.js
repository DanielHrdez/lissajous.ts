import { Lissajous } from './lissajous.js';
function notFoundError(string) {
    throw new Error(`${string} not found`);
}
function setSimulationStyle(canvas) {
    canvas.style.position = 'absolute';
    canvas.style.top = '50%';
    canvas.style.left = '40%';
    canvas.style.transform = 'translate(-50%, -50%)';
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight * 0.75;
    canvas.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
}
function setParamsStyle(params) {
    params.style.position = 'absolute';
    params.style.transform = 'translate(-50%, -50%)';
    params.style.top = '50%';
    params.style.right = '10%';
    params.style.display = 'grid';
    params.style.gap = '10px';
    params.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    params.style.padding = '10px';
    params.style.zIndex = '1';
    params.style.backdropFilter = 'blur(10px)';
}
function setValueChanges(params) {
    const inputs = params.querySelectorAll('input');
    for (const input of inputs) {
        input.addEventListener('change', () => {
            const value = input.value;
            const name = input.id;
            const nameLabel = name + '_label';
            lissajous.setParam(name, value);
            const label = document.getElementById(nameLabel);
            if (label) {
                const upperName = name[0].toUpperCase() + name.slice(1);
                label.textContent = `${upperName}: ${value}`;
            }
            else {
                notFoundError(nameLabel);
            }
        });
    }
}
function loop() {
    lissajous.render(canvas);
    lissajous.update();
    const angleLabel = 'angle_label';
    const angle = document.getElementById(angleLabel);
    if (angle) {
        const degrees = (lissajous.angle * 180 / Math.PI).toFixed(0);
        angle.textContent = `Angle: ${degrees}°`;
        if (lissajous.angle > Math.PI * 2)
            lissajous.angle = 0;
        requestAnimationFrame(loop);
    }
    else {
        notFoundError(angleLabel);
    }
}
const lissajous = new Lissajous();
const canvas = document.createElement('canvas');
const paramsName = 'params';
const params = document.getElementById(paramsName);
if (params) {
    setSimulationStyle(canvas);
    setParamsStyle(params);
    setValueChanges(params);
    document.body.appendChild(canvas);
    loop();
}
else {
    notFoundError(paramsName);
}
