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
        if (!render)
            return;

        // Compute FPS
        computeFPS();

        // Getting destination infos
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var destinationData = imageData.data;

        for (var y = -canvas.height / 2; y < canvas.height / 2; y++) {
            for (var x = -canvas.width / 2; x < canvas.width / 2; x++) {
                var textureIndex;
                var atan2, radius, u, v, w;
                var pi = Math.PI;
                var canvasIndex;

                atan2 = Math.atan2(y, x);
                radius = Math.sqrt(x * x + y * y);

                u = ((5.0 + 40.0 * Math.abs(Math.cos(angle))) / radius);
                v = (0.5 * atan2 / pi);
                w = radius * 0.01;

                u = u * texture.width + zoom;
                v = v * texture.height;

                u = parseInt((u < 0) ? texture.width + (u % texture.width) : (u >= texture.width) ? u % texture.width : u);
                v = parseInt((v < 0) ? texture.height + (v % texture.height) : (v >= texture.height) ? v % texture.height : v);

                textureIndex = (u + v * texture.width) * 4;
                canvasIndex = (x + canvas.width / 2 + (y + canvas.height / 2) * canvas.width) * 4;

                destinationData[canvasIndex] = texture.data[textureIndex] * w;
                destinationData[canvasIndex + 1] = texture.data[textureIndex + 1] * w;
                destinationData[canvasIndex + 2] = texture.data[textureIndex + 2] * w;
                destinationData[canvasIndex + 3] = 255;
            }
        }

        context.putImageData(imageData, 0, 0);
        zoom += speed;
        angle += 0.05;
    };

    // FPS
    var previous = [];
    var stats = document.getElementById("stats");

    // Getting canvas and context
    var canvas = document.getElementById("tunnelCanvas");
    var context = canvas.getContext("2d");

    // Setting hardware scaling
    canvas.width = window.innerWidth;
    canvas.style.width = window.innerWidth + 'px';
    canvas.height = window.innerHeight;
    canvas.style.height = window.innerHeight + 'px';

    // Parameters
    var render = false;
    var zoom = 0;
    var speed = 20;
    var angle = 0;

    // Click
    var message = document.getElementById("message");
    message.onclick = function () {
        render = !render;

        if (render) {
            message.innerHTML = "Click to Stop";
        }
        else {
            message.innerHTML = "Click to Start";
            stats.innerHTML = "";
        }
    }

    // Texture
    var texture = loadTexture("soft.png", function () {
        // Launching the render
        window.setInterval(renderingLoop, 16);
    });
})();