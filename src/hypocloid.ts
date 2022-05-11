/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Daniel Hernandez de Leon
 * @since May 06 2022
 * @desc Hypocloid class
 */

/**
 * @module Hypocloid
 * @description Hypocloid class
 * @version 1.0.0
 * @author Daniel Hernandez de Leon
 * @since May 06 2022
 * @example
 * const hypocloid = new Hypocloid();
 * hypocloid.render(canvas);
 */
export class Hypocloid {
  private radiusOuterCircle: number;
  private radiusInnerCircle: number;
  private xPosition: number;
  private yPosition: number;
  private context: CanvasRenderingContext2D | undefined;
  private angle: number;
  private speed: number;
  private initialPoint: [number, number];

  /**
   * Constructor of the class
   * @param {number} xPosition x
   * @param {number} yPosition y
   * @param {number} radiusInner radio of the inner circle
   * @param {number} radiusOuter radio of the outer circle
   */
  constructor(
      xPosition: number = 10,
      yPosition: number = 10,
      radiusInner: number = 10,
      radiusOuter: number = 100,
  ) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.radiusInnerCircle = radiusInner;
    this.radiusOuterCircle = radiusOuter;
    this.context = undefined;
    this.angle = 0;
    this.speed = 0.01;
    const radius = this.radiusOuterCircle - this.radiusInnerCircle;
    const xCenter = this.xPosition + radius * Math.cos(this.angle);
    const yCenter = this.yPosition + radius * Math.sin(this.angle);
    this.initialPoint = [xCenter, yCenter];
  }

  /**
   * @method render
   * @param {HTMLCanvasElement} canvas - Canvas
   * @example
   * const lissajous = new Lissajous();
   * lissajous.render(canvas);
   */
  public render(canvas: HTMLCanvasElement): void {
    this.context = canvas.getContext('2d')!;
    if (this.context) {
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      this.drawGrid(canvas.width, canvas.height);
      this.drawCircle(
          this.radiusOuterCircle,
          this.xPosition,
          this.yPosition,
      );
      const radius = this.radiusOuterCircle - this.radiusInnerCircle;
      const xCenter = this.xPosition + radius * Math.cos(this.angle);
      const yCenter = this.yPosition + radius * Math.sin(this.angle);
      this.drawCircle(this.radiusInnerCircle, xCenter, yCenter);
      this.drawCenterPoint(xCenter, yCenter);
      this.drawRadius(xCenter, yCenter);
    }
  }

  /**
   * Draws the center point
   * @param {number} xCenter - x
   * @param {number} yCenter - y
   */
  private drawCenterPoint(xCenter: number, yCenter: number): void {
    if (!this.context) throw new Error('Context undefined.');
    this.context.beginPath();
    this.context.arc(xCenter, yCenter, 1, 0, 2 * Math.PI, true);
    this.context.stroke();
  }

  /**
   * Draws the center point
   * @param {number} xCenter - x
   * @param {number} yCenter - y
   */
  private drawRadius(xCenter: number, yCenter: number): void {
    if (!this.context) throw new Error('Context undefined.');
    this.context.beginPath();
    this.context.moveTo(xCenter, yCenter);
    this.context.lineTo(this.initialPoint[0], this.initialPoint[1]);
    this.context.stroke();
  }

  /**
   * Draws the grid
   * @param {number} width - width
   * @param {number} height - height
   */
  private drawGrid(
      width: number,
      height: number,
  ): void {
    if (!this.context) throw new Error('Context undefined.');
    this.context!.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    this.context!.lineWidth = 1;
    const numberOfLines = 100;
    const pixelSizeHorizontal = width / numberOfLines;
    const pixelSizeVertical = height / numberOfLines;
    this.context!.beginPath();
    for (let i = 0; i < width; i += pixelSizeHorizontal) {
      this.context!.moveTo(i, 0);
      this.context!.lineTo(i, height);
    }
    for (let i = 0; i < height; i += pixelSizeVertical) {
      this.context!.moveTo(0, i);
      this.context!.lineTo(width, i);
    }
    this.context!.stroke();
  }

  /**
   * Draws a circle
   * @param {number} radius - the radius
   * @param {number} xPosition - x
   * @param {number} yPosition - y
   */
  private drawCircle(
      radius: number,
      xPosition: number,
      yPosition: number,
  ): void {
    if (!this.context) throw new Error('Context undefined.');
    this.context!.strokeStyle = 'black';
    this.context!.lineWidth = 3;
    const twoPI = 2 * Math.PI;
    this.context!.beginPath();
    this.context!.arc(
        xPosition,
        yPosition,
        radius,
        0,
        twoPI,
    );
    this.context!.stroke();
  }

  /**
   * Adds angle to the inner circle
   */
  public update(): void {
    this.angle += this.speed;
    // const xCenter = this.xPosition + radius * Math.cos(this.angle);
    // const yCenter = this.yPosition + radius * Math.sin(this.angle);
  }

  /**
   * Increase the inner circle
   */
  public increaseRadius() {
    if (this.radiusInnerCircle * 1.1 < this.radiusOuterCircle * 0.9) {
      this.radiusInnerCircle *= 1.1;
    }
  }

  /**
   * Decrease the inner circle
   */
  public decreaseRadius() {
    if (this.radiusInnerCircle * 0.9 > this.radiusOuterCircle * 0.1) {
      this.radiusInnerCircle *= 0.9;
    }
  }
}
