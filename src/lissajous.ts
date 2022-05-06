/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Daniel Hernandez de Leon
 * @since May 06 2022
 * @desc Lissajous class
 */

/**
 * @module Lissajous
 * @description Lissajous class
 * @version 1.0.0
 * @author Daniel Hernandez de Leon
 * @since May 06 2022
 * @example
 * const lissajous = new Lissajous();
 * lissajous.render(canvas);
 */
export class Lissajous {
  private width: number;
  private height: number;
  private speed: number;
  private color: string;
  private lineWidth: number;
  private numerator: number;
  private denominator: number;
  private angle: number;

  /**
   * @constructor Lissajous
   * @param {object} [options] - Options
   * @param {number} [options.width] - Width
   * @param {number} [options.height] - Height
   * @param {number} [options.speed] - Speed
   * @param {string} [options.color] - Color
   * @param {number} [options.lineWidth] - Line width
   * @param {number} [options.numerator] - Numerator
   * @param {number} [options.denominator] - Denominator
   * @param {number} [options.angle] - Angle
   * @example
   * const lissajous = new Lissajous();
   */
  constructor(options?: {
    width?: number,
    height?: number,
    speed?: number,
    color?: string,
    lineWidth?: number,
    numerator?: number,
    denominator?: number,
    angle?: number
  }) {
    this.width = options?.width || 500;
    this.height = options?.height || 500;
    this.speed = options?.speed || 0.01;
    this.color = options?.color || 'black';
    this.lineWidth = options?.lineWidth || 1;
    this.numerator = options?.numerator || 1;
    this.denominator = options?.denominator || 1;
    this.angle = options?.angle || 0;
  }

  /**
   * @method render
   * @param {HTMLCanvasElement} canvas - Canvas
   * @param {object} [position] - Position
   * @param {number} [position.x] - X
   * @param {number} [position.y] - Y
   * @example
   * const lissajous = new Lissajous();
   * lissajous.render(canvas);
   */
  public render(
      canvas: HTMLCanvasElement,
      position?: { x: number, y: number },
  ) {
    const context = canvas.getContext('2d')!;
    const xPosition = position?.x || canvas.width / 2 - this.width / 2;
    const yPosition = position?.y || canvas.height / 2 - this.height / 2;
    context.fillStyle = this.color;
    context.fillRect(xPosition, yPosition, this.width, this.height);
  }
}
