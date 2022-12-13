import { Hypocloid } from './hypocloid.js';
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
function main() {
    function setValueChanges(params) {
        const buttons = params.querySelectorAll('button');
        for (const button of buttons) {
            button.style.backgroundColor = 'green';
            button.style.fontSize = '30px';
            button.addEventListener('click', () => {
                if (button.style.backgroundColor == 'green') {
                    button.style.backgroundColor = 'red';
                }
                else if (button.style.backgroundColor == 'red') {
                    button.style.backgroundColor = 'green';
                }
            });
        }
    }
    function setButtonEvents() {
        const buttonAnimation = document.getElementById('animate');
        buttonAnimation === null || buttonAnimation === void 0 ? void 0 : buttonAnimation.addEventListener('click', () => {
            isAnimating = !isAnimating;
            if (isAnimating)
                requestAnimationFrame(loop);
        });
        const buttonIncrease = document.getElementById('increase');
        const buttonDecrease = document.getElementById('decrease');
        buttonIncrease === null || buttonIncrease === void 0 ? void 0 : buttonIncrease.addEventListener('click', () => {
            hypocloid.increaseRadius();
        });
        buttonDecrease === null || buttonDecrease === void 0 ? void 0 : buttonDecrease.addEventListener('click', () => {
            hypocloid.decreaseRadius();
        });
    }
    function loop() {
        hypocloid.render(canvas);
        hypocloid.update();
        if (isAnimating)
            requestAnimationFrame(loop);
    }
    const canvas = document.createElement('canvas');
    const hypocloid = new Hypocloid(400, 400, 100, 300);
    const paramsName = 'params';
    const params = document.getElementById(paramsName);
    let isAnimating = true;
    if (params) {
        setSimulationStyle(canvas);
        setParamsStyle(params);
        setValueChanges(params);
        document.body.appendChild(canvas);
        requestAnimationFrame(loop);
        setButtonEvents();
    }
    else {
        notFoundError(paramsName);
    }
}
main();
