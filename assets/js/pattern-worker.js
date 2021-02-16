/**
 * Worker to remove the pattern generation load from the main thread.
 */


/**
 * Returns a random Integer between min and max.
 *
 * @param {Number} min
 * @param {Number} max
 */
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


/**
 * Generates an Array of points that when connected by an interpolated line
 * form a sine wave.
 *
 * @param {Number} canvasWidth - Width of the canvas on which we draw everything
 * @param {Number} numberOfPoints - Number of points to return
 * @param {Number} startY - Starting y-coordinate of the first point
 * @param {Number} sineWidth - Determines width of one sine wave
 * @param {Number} sineHeight - Determines height of one sine wave
 *
 * @returns {Array} - points
 */
const getSinePoints = (canvasWidth, numberOfPoints, startY, sineWidth, sineHeight) => {
    const points = [];
    // Add starting point to array.
    points.push([0, startY]);
    // Size of increments on x axis per point
    const stepWidth = canvasWidth / numberOfPoints;
    // Generate next points on the sine wave
    for (let i = 0; i < numberOfPoints; i++) {
        // Size of increment on y axis per point
        const stepHeight = Math.sin(i * sineWidth) * sineHeight;
        // Create the next point
        points.push([
            points[points.length-1][0] + stepWidth,
            points[points.length-1][1] + stepHeight,
        ]);
    }
    return points;
}


/**
 * Returns points with randomly distorted y-values.
 *
 * @param {Array} points
 * @param {Number} interval - Max positive or negative offset added to points
 *
 * @returns {Array} - points
 */
const distortPoints = (points, interval) => {
    for (let i = 0; i < points.length; i++) {
        // Decrease max distortion probability
        const randomClampedInterval = Math.abs(randomIntFromInterval(-interval, interval));
        const distortion = randomIntFromInterval(-randomClampedInterval, randomClampedInterval);
        points[i][1] += distortion;
    }
    return points;
}


/**
 * Creates interpolations between all points on the wave line.
 *
 * Reference: https://stackoverflow.com/a/15528789
 *
 * @param {Array} points - Input points
 * @param {Number} tension - How tense the line wraps around the points
 * @param {Number} numberOfSegments - Defines the amount of interpolation between two points
 *
 * @returns {Array} - Contains interpolated points
 */
const getInterpolatedPoints = (points, tension, numberOfSegments) => {
    const result = [];
    // The algorithm requires a previous and next point to the actual points in the array.
    // Duplicate first and last point
    points.unshift(points[0]);
    points.push(points[points.length - 1]);
    // ...
    result.push(points[0]);
    // Loop trough all points without the duplicates
    for (let i = 1; i < points.length - 2; i++) {
        // Loop trough the number of segments plus one at the start and one at the end
        for (let j = 1; j <= numberOfSegments; j++) {
            // Calculate tension vectors
            const t1 = [ // next - previous * tension
                (points[i+1][0] - points[i-1][0]) * tension,
                (points[i+1][1] - points[i-1][1]) * tension,
            ];
            const t2 = [ // After next - current * tension
                (points[i+2][0] - points[i][0]) * tension,
                (points[i+2][1] - points[i][1]) * tension,
            ];
            // How far are we between the two points
            const st = j / numberOfSegments;
            // Calculate cardinals
            const c1 =   2 * Math.pow(st, 3)  - 3 * Math.pow(st, 2) + 1;
            const c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
            const c3 =       Math.pow(st, 3)  - 2 * Math.pow(st, 2) + st;
            const c4 =       Math.pow(st, 3)  -     Math.pow(st, 2);
            // Calculate this segments point with control vectors
            const point = [
                c1 * points[i][0] + c2 * points[i+1][0] + c3 * t1[0] + c4 * t2[0],
                c1 * points[i][1] + c2 * points[i+1][1] + c3 * t1[1] + c4 * t2[1],
            ];
            // Store the calcualted point in our results array
            result.push(point);
        }
    }
    return result;
};


/**
 * Draws a line along given points on a context.
 *
 * @param {Object} context - A 2d context to draw on
 * @param {Array} points - The points along which the line runs
 */
const drawPolyLine = (context, points) => {
    // Define the starting point
    context.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i][0], points[i][1]);
    }
};


/**
 * Generates a wave line and returns its points.
 *
 * @param {Number} canvasWidth - Width of the canvas to draw on
 * @param {Number} numberOfPoints - Number of points defining the wave line
 * @param {Number} startY - Starting y-coordinate of the first point
 * @param {Number} sineWidth - Determines width of one sine wave
 * @param {Number} sineHeight - Determines height of one sine wave
 * @param {Number} distortionInterval - Determines the max distortion of a points y coordinate
 * @param {Number} tension - How tense the line wraps around the points
 * @param {Number} numberOfSegments - Defines the amount of interpolation between two points
 *
 * @returns {Array} - points
 */
const generateWave = (canvasWidth, numberOfPoints, startY, sineWidth, sineHeight, distortionInterval, tension = 0.5, numberOfSegments = 16) => {
    const sinePoints = getSinePoints(canvasWidth, numberOfPoints, startY, sineWidth, sineHeight);
    const points = distortPoints(sinePoints, distortionInterval);
    // Get interpolations between the points to smooth out the wave
    const interpolatedPoints = getInterpolatedPoints(points, tension, numberOfSegments);
    return interpolatedPoints;
};


/**
 * Handles communication with this worker
 *
 * @param {Event} e - data of onmessage event
 *
 * @returns {String} - url of wave pattern
 */
onmessage = (e) => {
    const { data } = e;
    // Create a canvas and context
    const CANVAS = new OffscreenCanvas(data.canvasWidth, data.canvasHeight);
    const CTX = CANVAS.getContext('2d');
    // Calculate wave pattern
    const waves = [];
    const stepSize = (data.canvasHeight + 500) / data.numberOfLines;
    // Generate each line
    for (let i = 0; i < data.numberOfLines; i++) {
        data.startY = i * stepSize - 500;
        // Generate the waves points
        const wave = generateWave(data.canvasWidth, data.numberOfPoints, data.startY, data.sineWidth, data.sineHeight, data.distortionInterval, data.tension, data.numberOfSegments);
        waves.push(wave);
    }
    // Draw each returned wave on canvas
    for (const wave of waves) {
        CTX.beginPath();
        drawPolyLine(CTX, wave);
        CTX.strokeStyle = data.color;
        CTX.lineWidth = data.lineWidth;
        CTX.stroke();
    }
    // Convert the canvas content to blob an return
    const blob = CANVAS.convertToBlob ? 'convertToBlob' : 'toBlob';
    CANVAS[blob]()
        .then((blob) => {
            const dataURL = new FileReaderSync().readAsDataURL(blob);
            postMessage(dataURL);
        });
};
