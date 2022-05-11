export class Hypocloid {
    constructor(xPosition = 10, yPosition = 10, radiusInner = 10, radiusOuter = 100) {
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
    render(canvas) {
        this.context = canvas.getContext('2d');
        if (this.context) {
            this.context.clearRect(0, 0, canvas.width, canvas.height);
            this.drawGrid(canvas.width, canvas.height);
            this.drawCircle(this.radiusOuterCircle, this.xPosition, this.yPosition);
            const radius = this.radiusOuterCircle - this.radiusInnerCircle;
            const xCenter = this.xPosition + radius * Math.cos(this.angle);
            const yCenter = this.yPosition + radius * Math.sin(this.angle);
            this.drawCircle(this.radiusInnerCircle, xCenter, yCenter);
            this.drawCenterPoint(xCenter, yCenter);
            this.drawRadius(xCenter, yCenter);
        }
    }
    drawCenterPoint(xCenter, yCenter) {
        if (!this.context)
            throw new Error('Context undefined.');
        this.context.beginPath();
        this.context.arc(xCenter, yCenter, 1, 0, 2 * Math.PI, true);
        this.context.stroke();
    }
    drawRadius(xCenter, yCenter) {
        if (!this.context)
            throw new Error('Context undefined.');
        this.context.beginPath();
        this.context.moveTo(xCenter, yCenter);
        this.context.lineTo(this.initialPoint[0], this.initialPoint[1]);
        this.context.stroke();
    }
    drawGrid(width, height) {
        if (!this.context)
            throw new Error('Context undefined.');
        this.context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        this.context.lineWidth = 1;
        const numberOfLines = 100;
        const pixelSizeHorizontal = width / numberOfLines;
        const pixelSizeVertical = height / numberOfLines;
        this.context.beginPath();
        for (let i = 0; i < width; i += pixelSizeHorizontal) {
            this.context.moveTo(i, 0);
            this.context.lineTo(i, height);
        }
        for (let i = 0; i < height; i += pixelSizeVertical) {
            this.context.moveTo(0, i);
            this.context.lineTo(width, i);
        }
        this.context.stroke();
    }
    drawCircle(radius, xPosition, yPosition) {
        if (!this.context)
            throw new Error('Context undefined.');
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 3;
        const twoPI = 2 * Math.PI;
        this.context.beginPath();
        this.context.arc(xPosition, yPosition, radius, 0, twoPI);
        this.context.stroke();
    }
    update() {
        this.angle += this.speed;
    }
    increaseRadius() {
        if (this.radiusInnerCircle * 1.1 < this.radiusOuterCircle * 0.9) {
            this.radiusInnerCircle *= 1.1;
        }
    }
    decreaseRadius() {
        if (this.radiusInnerCircle * 0.9 > this.radiusOuterCircle * 0.1) {
            this.radiusInnerCircle *= 0.9;
        }
    }
}
