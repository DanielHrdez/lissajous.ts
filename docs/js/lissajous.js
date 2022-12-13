export class Lissajous {
    constructor(options) {
        this.defaultSize = 1e2;
        this.speed = (options === null || options === void 0 ? void 0 : options.speed) || 0.01;
        this.numerator = (options === null || options === void 0 ? void 0 : options.numerator) || 1;
        this.denominator = (options === null || options === void 0 ? void 0 : options.denominator) || 1;
        this.angle = (options === null || options === void 0 ? void 0 : options.angle) || 0;
        this.lineWidth = (options === null || options === void 0 ? void 0 : options.lineWidth) || 1;
        this.color = (options === null || options === void 0 ? void 0 : options.color) || 'black';
    }
    render(canvas, options) {
        if (this.width === undefined) {
            this.width = (options === null || options === void 0 ? void 0 : options.width) || canvas.width / 2;
        }
        if (this.height === undefined) {
            this.height = (options === null || options === void 0 ? void 0 : options.height) || canvas.height / 2;
        }
        if (this.xPosition === undefined) {
            this.xPosition = (options === null || options === void 0 ? void 0 : options.x) || canvas.width / 2 - this.width / 2;
        }
        if (this.yPosition === undefined) {
            this.yPosition = (options === null || options === void 0 ? void 0 : options.y) || canvas.height / 2 - this.height / 2;
        }
        const context = canvas.getContext('2d');
        if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.drawGrid(context, canvas.width, canvas.height);
            const points = this.calculate();
            this.drawShape(context, points);
        }
    }
    drawGrid(context, width, height) {
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
    calculate() {
        const result = [];
        const twoPI = 2 * Math.PI;
        const increment = twoPI / (this.width || this.defaultSize);
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
        const rangeX = [
            this.xPosition || 0,
            (this.xPosition + this.width) || this.defaultSize,
        ];
        const rangeY = [
            this.yPosition || 0,
            (this.yPosition + this.height) || this.defaultSize,
        ];
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
        context.lineTo(firstPointX, firstPointY);
        context.stroke();
    }
    convertRange(value, range1, range2) {
        const numerator = (value - range1[0]) * (range2[1] - range2[0]);
        const denominator = range1[1] - range1[0];
        return numerator / denominator + range2[0];
    }
    update() {
        this.angle += this.speed;
    }
    setParam(name, value) {
        switch (name.toLowerCase()) {
            case 'speed':
                this.speed = Number(value);
                break;
            case 'a':
            case 'numerator':
                this.numerator = Number(value);
                break;
            case 'b':
            case 'denominator':
                this.denominator = Number(value);
                break;
            case 'angle':
                this.angle = Number(value);
                break;
            case 'line-width':
            case 'lineWidth':
                this.lineWidth = Number(value);
                break;
            case 'color':
                this.color = String(value);
                break;
            case 'x':
            case 'x-position':
                this.xPosition = Number(value);
                break;
            case 'y':
            case 'y-position':
                this.yPosition = Number(value);
                break;
            case 'width':
                this.width = Number(value);
                break;
            case 'height':
                this.height = Number(value);
                break;
            default: break;
        }
    }
}
