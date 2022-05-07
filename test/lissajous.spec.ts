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

describe('Lissajous class', () => {
  it('constructor', () => {
    const lissajous = new Lissajous();
    expect(lissajous).toBeInstanceOf(Lissajous);
  });

  it('render', () => {
    const lissajous = new Lissajous();
    const canvas = document.createElement('canvas');
    lissajous.render(canvas);
  });
});
