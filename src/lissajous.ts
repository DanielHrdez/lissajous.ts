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
  private width: number | undefined;
  private height: number | undefined;
  private speed: number;
  private lineWidth: number;
  private color: string;
  private numerator: number;
  private denominator: number;
  public angle: number;
  private xPosition: number | undefined;
  private yPosition: number | undefined;
  private defaultSize = 1e2;

  /**
   * @constructor Lissajous
   * @param {object} [options] - Options
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
    speed?: number,
    lineWidth?: number,
    color?: string,
    numerator?: number,
    denominator?: number,
    angle?: number
  }) {
    this.speed = options?.speed || 0.01;
    this.numerator = options?.numerator || 1;
    this.denominator = options?.denominator || 1;
    this.angle = options?.angle || 0;
    this.lineWidth = options?.lineWidth || 1;
    this.color = options?.color || 'black';
  }

  /**
   * @method render
   * @param {HTMLCanvasElement} canvas - Canvas
   * @param {object} [options] - Position
   * @param {number} [options.x] - X
   * @param {number} [options.y] - Y
   * @param {number} [options.width] - Width
   * @param {number} [options.height] - Height
   * @example
   * const lissajous = new Lissajous();
   * lissajous.render(canvas);
   */
  public render(
      canvas: HTMLCanvasElement,
      options?: {
        x: number,
        y: number,
        width: number,
        height: number,
      },
  ) {
    if (this.width === undefined) {
      this.width = options?.width || canvas.width / 2;
    }
    if (this.height === undefined) {
      this.height = options?.height || canvas.height / 2;
    }
    if (this.xPosition === undefined) {
      this.xPosition = options?.x || canvas.width / 2 - this.width! / 2;
    }
    if (this.yPosition === undefined) {
      this.yPosition = options?.y || canvas.height / 2 - this.height! / 2;
    }
    const context = canvas.getContext('2d')!;
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.drawGrid(context, canvas.width, canvas.height);
      const points = this.calculate();
      this.drawShape(context, points);
    }
  }

  /**
   * Draws the grid
   * @param {CanvasRenderingContext2D} context - context
   * @param {number} width - width
   * @param {number} height - height
   */
  private drawGrid(
      context: CanvasRenderingContext2D,
      width: number,
      height: number,
  ) {
    context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    context.lineWidth = 1;
    const numberOfLines = 100;
    const pixelSizeHorizontal = width / numberOfLines;
    const pixelSizeVertical = height / numberOfLines;
    context.beginPath();
    for (let i = 0; i < width; i += pixelSizeHorizontal) {
      context.moveTo(i, 0);
      context.lineTo(i, height);
    }
    for (let i = 0; i < height; i += pixelSizeVertical) {
      context.moveTo(0, i);
      context.lineTo(width, i);
    }
    context.stroke();
  }

  /**
   * Calculates the pixels
   * @return {[number, number][]} - Pixels
   */
  private calculate(): [number, number][] {
    const result = [];
    const twoPI = 2 * Math.PI;
    const increment = twoPI / (this.width! || this.defaultSize);
    for (let i = 0; i < twoPI; i += increment) {
      result.push(this.calculatePoint(i));
    }
    return result;
  }
  /**
   * Calculates a (x, y) point
   * @param {number} angle - Angle
   * @return {[number, number]} - Point
   */
  private calculatePoint(angle: number): [number, number] {
    return [
      Math.sin(this.numerator * angle + this.angle),
      Math.sin(this.denominator * angle),
    ];
  }

  /**
   * Calculates the pixels
   * @param {CanvasRenderingContext2D} context - context
   * @param {[number, number][]} points - points
   */
  private drawShape(
      context: CanvasRenderingContext2D,
      points: [number, number][],
  ) {
    const range: [number, number] = [-1, 1];
    const rangeX: [number, number] = [
        this.xPosition! || 0,
        (this.xPosition! + this.width!) || this.defaultSize,
    ];
    const rangeY: [number, number] = [
        this.yPosition! || 0,
        (this.yPosition! + this.height!) || this.defaultSize,
    ];
    const firstPointX = this.convertRange(points[0][0], range, rangeX);
    const firstPointY = this.convertRange(points[0][1], range, rangeY);
    context.beginPath();
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.color;
    context.moveTo(firstPointX, firstPointY);
    points.forEach(([positionX, positionY], index) => {
      if (index === 0) return;
      const xConverted = this.convertRange(positionX, range, rangeX);
      const yConverted = this.convertRange(positionY, range, rangeY);
      context.lineTo(xConverted, yConverted);
    });
    context.lineTo(firstPointX, firstPointY);
    context.stroke();
  }

  /**
   * Convert a number from range1 to range2
   * @param {number} value - value
   * @param {[number, number]} range1 - range1
   * @param {[number, number]} range2 - range2
   * @return {number} - new value
   */
  private convertRange(
      value: number,
      range1: [number, number],
      range2: [number, number],
  ): number {
    const numerator = (value - range1[0]) * (range2[1] - range2[0]);
    const denominator = range1[1] - range1[0];
    return numerator / denominator + range2[0];
  }

  /**
   * Update the angle by the speed
   */
  public update() {
    this.angle += this.speed;
  }

  /**
   * Set the given param
   * @param {string} name - name
   * @param {number | string} value - value
   */
  public setParam(name: string, value: number | string) {
    switch (name.toLowerCase()) {
      case 'speed':
        this.speed = Number(value); break;
      case 'a':
      case 'numerator':
        this.numerator = Number(value); break;
      case 'b':
      case 'denominator':
        this.denominator = Number(value); break;
      case 'angle':
        this.angle = Number(value); break;
      case 'line-width':
      case 'lineWidth':
        this.lineWidth = Number(value); break;
      case 'color':
        this.color = String(value); break;
      case 'x':
      case 'x-position':
        this.xPosition = Number(value); break;
      case 'y':
      case 'y-position':
        this.yPosition = Number(value); break;
      case 'width':
        this.width = Number(value); break;
      case 'height':
        this.height = Number(value); break;
      default: break;
    }
  }
}
