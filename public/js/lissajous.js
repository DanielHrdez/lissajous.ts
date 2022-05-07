export class Lissajous {
    constructor(options) {
        this.width = 0;
        this.height = 0;
        this.speed = (options === null || options === void 0 ? void 0 : options.speed) || 0.01;
        this.numerator = (options === null || options === void 0 ? void 0 : options.numerator) || 1;
        this.denominator = (options === null || options === void 0 ? void 0 : options.denominator) || 1;
        this.angle = (options === null || options === void 0 ? void 0 : options.angle) || 0;
        this.xPosition = 0;
        this.yPosition = 0;
        this.lineWidth = (options === null || options === void 0 ? void 0 : options.lineWidth) || 1;
        this.color = (options === null || options === void 0 ? void 0 : options.color) || 'black';
    }
    render(canvas, options) {
        this.width = (options === null || options === void 0 ? void 0 : options.width) || canvas.width / 2;
        this.height = (options === null || options === void 0 ? void 0 : options.height) || canvas.height / 2;
        const context = canvas.getContext('2d');
        this.xPosition = (options === null || options === void 0 ? void 0 : options.x) || canvas.width / 2 - this.width / 2;
        this.yPosition = (options === null || options === void 0 ? void 0 : options.y) || canvas.height / 2 - this.height / 2;
        const points = this.calculate();
        this.drawShape(context, points);
    }
    calculate() {
        const result = [];
        const twoPI = 2 * Math.PI;
        const increment = twoPI / this.width;
        for (let i = 0; i < twoPI; i += increment) {
            result.push(this.calculatePoint(i));
        }
        return result;
    }
    calculatePoint(angle) {
        return [
            Math.sin(this.numerator * angle + this.angle),
            Math.sin(this.denominator * angle),
        ];
    }
    drawShape(context, points) {
        const range = [-1, 1];
        const rangeX = [this.xPosition, this.xPosition + this.width];
        const rangeY = [this.yPosition, this.yPosition + this.height];
        const firstPointX = this.convertRange(points[0][0], range, rangeX);
        const firstPointY = this.convertRange(points[0][1], range, rangeY);
        context.beginPath();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.color;
        context.moveTo(firstPointX, firstPointY);
        points.forEach(([positionX, positionY], index) => {
            if (index === 0)
                return;
            const xConverted = this.convertRange(positionX, range, rangeX);
            const yConverted = this.convertRange(positionY, range, rangeY);
            context.lineTo(xConverted, yConverted);
        });
        context.stroke();
    }
    convertRange(value, range1, range2) {
        const numerator = (value - range1[0]) * (range2[1] - range2[0]);
        const denominator = range1[1] - range1[0];
        return numerator / denominator + range2[0];
    }
}
