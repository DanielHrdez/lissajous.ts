/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Daniel Hernandez de Leon
 * @since May 06 2022
 * @desc Lissajous class test
 */

import {Lissajous} from '../src/lissajous';
import 'jest-canvas-mock';

describe('Lissajous class', () => {
  let lissajous = new Lissajous();
  let canvas = document.createElement('canvas');

  beforeEach(() => {
    canvas = document.createElement('canvas');
    lissajous = new Lissajous();
  });

  it('constructor', () => {
    expect(lissajous).toBeInstanceOf(Lissajous);
  });

  it('render', () => {
    lissajous.render(canvas);
  });

  it('angle', () => {
    lissajous.angle = 1;
    expect(lissajous.angle).toBe(1);
  });

  it('update', () => {
    lissajous.update();
    expect(lissajous.angle).toBe(0.01);
  });

  it('setParam', () => {
    lissajous.setParam('angle', 1);
    expect(lissajous.angle).toBe(1);
  });
});
