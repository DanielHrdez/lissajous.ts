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

import {Lissajous} from './lissajous.js';

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
 * Sets the on change event on every input
 * @param {HTMLDivElement} params - Params
 */
function setValueChanges(params: HTMLDivElement): void {
  const inputs = params.querySelectorAll('input');
  for (const input of inputs) {
    input.addEventListener('change', () => {
      const value = input.value;
      const name = input.id;
      const nameLabel = name + '_label';
      lissajous.setParam(name, value);
      const label = document.getElementById(nameLabel)!;
      if (label) {
        const upperName = name[0].toUpperCase() + name.slice(1);
        label.textContent = `${upperName}: ${value}`;
      } else {
        notFoundError(nameLabel);
      }
    });
  }
}

/**
 * Main Loop
 */
function loop(): void {
  lissajous.render(canvas);
  lissajous.update();
  const angleLabel = 'angle_label';
  const angle = document.getElementById(angleLabel)! as HTMLLabelElement;
  if (angle) {
    const degrees = (lissajous.angle * 180 / Math.PI).toFixed(0);
    angle.textContent = `Angle: ${degrees}°`;
    if (lissajous.angle > Math.PI * 2) lissajous.angle = 0;
    requestAnimationFrame(loop);
  } else {
    notFoundError(angleLabel);
  }
}

const lissajous = new Lissajous();
const canvas = document.createElement('canvas');
const paramsName = 'params';
const params = document.getElementById(paramsName)! as HTMLDivElement;
if (params) {
  setSimulationStyle(canvas);
  setParamsStyle(params);
  setValueChanges(params);
  document.body.appendChild(canvas);
  loop();
} else {
  notFoundError(paramsName);
}
