/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Daniel Hernandez de Leon
 * @since May 06 2022
 * @desc Main simulation
 */

import {Hypocloid} from './hypocloid.js';

/**
* Throw not found error
* @param {string} string - String
*/
function notFoundError(string: string) {
  throw new Error(`${string} not found`);
}

/**
* Sets the canvas css style
* @param {HTMLCanvasElement} canvas - Canvas
*/
function setSimulationStyle(canvas: HTMLCanvasElement): void {
  canvas.style.position = 'absolute';
  canvas.style.top = '50%';
  canvas.style.left = '40%';
  canvas.style.transform = 'translate(-50%, -50%)';
  canvas.width = window.innerWidth * 0.5;
  canvas.height = window.innerHeight * 0.75;
  canvas.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
}

/**
* Sets the params css style
* @param {HTMLDivElement} params - Params
*/
function setParamsStyle(params: HTMLDivElement): void {
  params.style.position = 'absolute';
  params.style.transform = 'translate(-50%, -50%)';
  params.style.top = '50%';
  params.style.right = '10%';
  params.style.display = 'grid';
  params.style.gap = '10px';
  params.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
  params.style.padding = '10px';
  params.style.zIndex = '1';
  // @ts-ignore
  params.style.backdropFilter = 'blur(10px)';
}

/**
 * Main function
 */
function main() {
  /**
  * Sets the on change event on every input
  * @param {HTMLDivElement} params - Params
  */
  function setValueChanges(params: HTMLDivElement): void {
    const buttons = params.querySelectorAll('button');
    for (const button of buttons) {
      button.style.backgroundColor = 'green';
      button.style.fontSize = '30px';
      button.addEventListener('click', () => {
        if (button.style.backgroundColor == 'green') {
          button.style.backgroundColor = 'red';
        } else if (button.style.backgroundColor == 'red') {
          button.style.backgroundColor = 'green';
        }
      });
    }
  }

  /**
   * Sets the buttons event listener
   */
  function setButtonEvents() {
    const buttonAnimation = document.getElementById('animate');
    buttonAnimation?.addEventListener('click', () => {
      isAnimating = !isAnimating;
      if (isAnimating) requestAnimationFrame(loop);
    });

    const buttonIncrease = document.getElementById('increase');
    const buttonDecrease = document.getElementById('decrease');
    buttonIncrease?.addEventListener('click', () => {
      hypocloid.increaseRadius();
    });
    buttonDecrease?.addEventListener('click', () => {
      hypocloid.decreaseRadius();
    });
  }

  /**
  * Main Loop
  */
  function loop(): void {
    hypocloid.render(canvas);
    hypocloid.update();
    if (isAnimating) requestAnimationFrame(loop);
  }

  const canvas = document.createElement('canvas');
  const hypocloid = new Hypocloid(
      400,
      400,
      100,
      300,
  );
  const paramsName = 'params';
  const params = document.getElementById(paramsName)! as HTMLDivElement;
  let isAnimating = true;
  if (params) {
    setSimulationStyle(canvas);
    setParamsStyle(params);
    setValueChanges(params);
    document.body.appendChild(canvas);
    requestAnimationFrame(loop);
    setButtonEvents();
  } else {
    notFoundError(paramsName);
  }
}

main();
