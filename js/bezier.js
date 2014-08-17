$(function () {

    //get Window width and height
    var width = $( window ).width();
    var height = $( window ).height();

    //setup the canvas
    var canvas = $("#canvas")[0];
    canvas.width = width;
    canvas.height = height;


    //set the canvas context
    var context = canvas.getContext("2d");
    context.lineWidth = 0.08; //thin gives a nice effect
    context.fillStyle = "#ecf0f1";
    context.fill();

    //decide on the curves
    var curves = 22; //as many a you want
    var points = []; //For each Bayesian curve
    var delay = 20; //the lower the number, the faster

    //colors
    var lCol = "#D0D102";
    var dCol = "#61AE24";

    //For each curve, get a set of four random points
    for(var i = 0; i < 4 * curves; i++) {
        points.push({x:Math.random() * width, y:Math.random() * height, vx:Math.random() * 4 - 2, vy:Math.random() * 4 - 2});
    }


    //draw a curve at a different position after every "delay" time.
    //for a tutorial on drawing bezier curves, see:
    //http://www.html5canvastutorials.com/tutorials/html5-canvas-bezier-curves/
    //extending on K. Peters idea

    setInterval(function() {
        for(var j = 0; j < curves/2; j++) {
            context.beginPath();
            context.moveTo(points[j * 4].x, points[j * 4].y);
            context.bezierCurveTo(points[j * 4 + 1].x, points[j * 4 + 1].y,
                                  points[j * 4 + 2].x, points[j * 4 + 2].y,
                                  points[j * 4 + 3].x, points[j * 4 + 3].y);

            context.strokeStyle = lCol;
            context.stroke();
        }

        for(var j = curves/2; j < curves; j++) {
            context.beginPath();

            context.moveTo(points[j * 4].x, points[j * 4].y);
            context.bezierCurveTo(points[j * 4 + 1].x, points[j * 4 + 1].y,
                                  points[j * 4 + 2].x, points[j * 4 + 2].y,
                                  points[j * 4 + 3].x, points[j * 4 + 3].y);

            context.strokeStyle = dCol;
            context.stroke();
        }

        for(var i = 0; i < points.length; i++) {
            points[i].y += points[i].vx;
            points[i].x += points[i].vy;
        }

    }, delay);

});
