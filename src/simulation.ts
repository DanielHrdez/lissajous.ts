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

const canvas = document.createElement('canvas');
setSimulationStyle(canvas);
const lissajous = new Lissajous();
lissajous.render(canvas, {
  width: canvas.width / 2,
  height: canvas.height / 2,
  x: canvas.width / 4,
  y: canvas.height / 4,
});
document.body.appendChild(canvas);
