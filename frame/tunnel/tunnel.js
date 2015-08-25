(function () {
    function computeFPS() {
        if (previous.length > 60) {
            previous.splice(0, 1);
        }
        var start = (new Date).getTime();
        previous.push(start);
        var sum = 0;

        for (var id = 0; id < previous.length - 1; id++) {
            sum += previous[id + 1] - previous[id];
        }

        var diff = 1000.0 / (sum / previous.length);

        stats.innerHTML = diff.toFixed() + " fps";
    }

    var loadTexture = function (name, then) {
        var texture = new Image();
        var textureData;
        var textureWidth;
        var textureHeight;
        var result = {};

        // on load
        texture.addEventListener('load', function () {
            var textureCanvas = document.createElement('canvas'); // off-screen canvas

            // Setting the canvas to right size
            textureCanvas.width = this.width; //<-- "this" is the image
            textureCanvas.height = this.height;

            result.width = this.width;
            result.height = this.height;

            var textureContext = textureCanvas.getContext('2d');
            textureContext.drawImage(this, 0, 0);

            result.data = textureContext.getImageData(0, 0, this.width, this.height).data;

            then();
        }, false);

        // Loading
        texture.src = name;

        return result;
    };

    var renderingLoop = function () {
        var textureIndex;
        var radius, u, v, w;
        var canvasIndex;

        // Compute FPS
        if (render)
            computeFPS();

        var index = 0;
        for (var y = -canvasHeight / 2; y < canvasHeight / 2; y++) {
            for (var x = -canvasWidth / 2; x < canvasWidth / 2; x++) {
                radius = Math.sqrt(x * x + y * y);

                u = ((5.0 + 40.0 * Math.abs(Math.cos(angle))) / radius);
                v = 0.5 * atans[index++];
                w = radius * 0.01;

                u = u * texture.width + zoom;
                v = v * texture.height;

                u = ((u < 0) ? texture.width + (u % texture.width) : (u >= texture.width) ? u % texture.width : u) >> 0;
                v = ((v < 0) ? texture.height + (v % texture.height) : (v >= texture.height) ? v % texture.height : v) >> 0;

                textureIndex = (u + v * texture.width) * 4;
                canvasIndex = (x + canvasWidth / 2 + (y + canvasHeight / 2) * canvasWidth) * 4;

                destinationData[canvasIndex] = texture.data[textureIndex] * w;
                destinationData[canvasIndex + 1] = texture.data[textureIndex + 1] * w;
                destinationData[canvasIndex + 2] = texture.data[textureIndex + 2] * w;
            }
        }

        context.putImageData(imageData, 0, 0);
        zoom += speed;
        angle += 0.05;

        if (render) {
            QueueNewFrame();
        }
    };

    var intervalID = -1;
    var QueueNewFrame = function () {
        if (window.requestAnimationFrame)
            window.requestAnimationFrame(renderingLoop);
        else if (window.msRequestAnimationFrame)
            window.msRequestAnimationFrame(renderingLoop);
        else if (window.webkitRequestAnimationFrame)
            window.webkitRequestAnimationFrame(renderingLoop);
        else if (window.mozRequestAnimationFrame)
            window.mozRequestAnimationFrame(renderingLoop);
        else if (window.oRequestAnimationFrame)
            window.oRequestAnimationFrame(renderingLoop);
        else
        {
            QueueNewFrame = function () {
            };
            intervalID = window.setInterval(renderingLoop, 16.7);
        }
    };

    // FPS
    var previous = [];
    var stats = document.getElementById("stats");

    // Getting canvas and context
    var canvas = document.getElementById("tunnelCanvas");
    var context = canvas.getContext("2d");

    // Setting hardware scaling
    canvas.width = 300;
    canvas.style.width = window.innerWidth + 'px';
    canvas.height = 200;
    canvas.style.height = window.innerHeight + 'px';

    // Clear
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Getting destination infos
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var destinationData = imageData.data;

    // Parameters
    var render = false;
    var zoom = 0;
    var speed = 20;
    var angle = 0;
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    // precompute arctangent
    var atans = [];

    var index = 0;
    for (var y = -canvasHeight / 2; y < canvasHeight / 2; y++) {
        for (var x = -canvasWidth / 2; x < canvasWidth / 2; x++) {
            atans[index++] = Math.atan2(y, x) / Math.PI;
        }
    }

    // Click
    var message = document.getElementById("message");
    message.onclick = function () {
        render = !render;

        if (intervalID != -1)
            window.clearInterval(intervalID);

        if (render) {
            message.innerHTML = "Click to Stop";

            if (intervalID != -1)
                intervalID = window.setInterval(renderingLoop, 16.7);
            else
                QueueNewFrame();
        }
        else {
            message.innerHTML = "Click to Start";
            stats.innerHTML = "";
        }
    }

    // Texture
    var texture = loadTexture("soft.png", function () {
        // First render
        renderingLoop();
    });
})();