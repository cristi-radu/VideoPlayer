//video bagat in canvas
// window.onload = function () {
//     var canv = document.getElementById('videoCanv');
//     var ctx = canv.getContext('2d');
//     var vid=document.querySelector('video');
//     vid.addEventListener('play', function () {
//         window.setInterval(function(){
//             ctx.drawImage(vid,0.1,1,640,360);
//         },1)
//     });
// }

window.onload = function () {
    var video = document.querySelector('video');
    var play = document.getElementById('play');
    var ss = document.getElementById('screenShotBtn');
    var efect = document.getElementById('efects');
    var ssCanv=document.getElementById('ssCanv');

    drawPlay();
    drawPause();
    drawForward();
    drawBack();
    drawProgressBar();
    drawXForSS();

    play.addEventListener('click', playVid);
    function playVid() {
        video.play();
    }

    pause.addEventListener('click', pauseVid);

    function pauseVid() {
        video.pause();
    }

    var i = 1;
    video.src = "Media/" + i + ".mp4"
    forward.addEventListener('click', goforward);
    back.addEventListener('click', goBack);

    function goforward() {
        let no = i;
        if (++no == 5) {
            i = 1;
            video.src = "Media/" + i + ".mp4"
        } else {
            ++i;
            video.src = "Media/" + i + ".mp4"
        }


    }
    function goBack() {
        let no = i;
        if (--no == 0) {
            i = 4;
            video.src = "Media/" + i + ".mp4"
        } else {
            --i;
            video.src = "Media/" + i + ".mp4"
        }


    }

    var juice = document.getElementById('orange-juice');
    video.addEventListener('timeupdate', function () {
        var juicePos = video.currentTime / video.duration;
        juice.style.width = juicePos * 100 + "%";
        if (video.ended) {
            goforward();
        }
    })

    ssCanv.addEventListener('click',closeSS);
    function closeSS(){
        var btn=document.querySelector('Buttons');
        btn.className="closeSS"
    }


    /*var v = document.querySelector('.video');
    var tst = document.getElementById('test');
    function screenShot() {
        html2canvas(v, {
            onrendered: function (canvas) {
                document.body.appendChild(canvas)

                $('test').attr('href', canvas.toDataURL("image/png"));
                $('test').attr('download', 'Test file.png');
                $('test')[0].click();
            },
            width: 640,
            height: 360
        })

    }*/



    ss.addEventListener('click', screenShot);

    function screenShot() {
        $(document).ready(function () {
            $("#screenShotBtn").click(function () {
                // get references to the video and output elements
                var output = $("#box");
                var video = $(".video").get(0);


                // create a canvas element
                var canvas = document.createElement("canvas");

                // set the canvas size
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // get the drawing context of the canvas and add the video as an image
                // this will render the current frame inside the canvas
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

                // create an image element
                var img = document.createElement("img");
                // set the image source as the base64 string representation 
                // of the content found in the canvas
                img.src = canvas.toDataURL();

                // clear the output element and add the resulted image
                output.empty();
                output.prepend(img);

                // if the Download checkbox is cheked, download a snapshot of the canvas
                var href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                var link = document.createElement('a');
                link.setAttribute('download', 'capture.png');
                link.setAttribute('href', href);
                link.click();
            });
        });

    }



    efect.addEventListener('click', efectVideo);
    function efectVideo() {
        $(document).ready(function () {

            var kernel = [
                [0, -1, 0],
                [-1, 5, -1],
                [0, -1, 0]
            ]

            var frame = $(".video")[0];
            var canvas = $(".destination")[0];
            var context = canvas.getContext("2d");

            setInterval(function () {
                var W = canvas.width = frame.clientWidth;
                var H = canvas.height = frame.clientHeight;

                context.drawImage(frame, 0, 0, W, H);
                var imageData = context.getImageData(0, 0, W, H);
                var pixels = imageData.data;

                for (var y = 0; y < H; y++) {
                    for (x = 0; x < W; x++) {
                        var rTotal = 0;
                        var gTotal = 0;
                        var bTotal = 0;
                        var wTotal = 0;

                        for (var i = 0; i <= 2; i++) {
                            for (var j = 0; j <= 2; j++) {
                                var index = (x + i + (y + j) * W) * 4;
                                var weight = kernel[i][j];
                                rTotal += weight * pixels[index];
                                gTotal += weight * pixels[index + 1];
                                bTotal += weight * pixels[index + 2];
                                wTotal += weight;
                            }
                        }

                        var outputIndex = (x + y * W) * 4;
                        imageData.data[outputIndex] = rTotal / wTotal;
                        imageData.data[outputIndex + 1] = gTotal / wTotal;
                        imageData.data[outputIndex + 1] = bTotal / wTotal;
                    }
                }
                context.putImageData(imageData, 0, 0);
            }, 30)

        });
    }
    





}




var drawPlay = function () {
    if (play.getContext) {
        var ctx = play.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = "orangered";
        ctx.moveTo(1, 19);
        ctx.lineTo(1, 1);
        ctx.lineTo(19, 10);
        ctx.lineTo(1, 19);

        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }
}

var drawPause = function () {
    var pause = document.getElementById('pause');
    if (pause.getContext) {
        var ctx = pause.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = "orangered";
        ctx.moveTo(1, 19);
        ctx.lineTo(1, 1);
        ctx.lineTo(8, 1);
        ctx.lineTo(8, 19);
        ctx.lineTo(1, 19);

        ctx.moveTo(12, 19);
        ctx.lineTo(12, 1);
        ctx.lineTo(19, 1);
        ctx.lineTo(19, 19);
        ctx.lineTo(12, 19);

        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }
}

var drawBack = function () {
    var back = document.getElementById("back");
    if (back.getContext) {
        var ctx = back.getContext("2d");
        ctx.lineWidth = 4
        ctx.strokeStyle = "orangered"
        ctx.beginPath();
        ctx.fillStyle = "orangered"
        ctx.moveTo(19, 1);
        ctx.lineTo(1, 10);
        ctx.lineTo(19, 19);


        ctx.stroke()
        ctx.closePath()

    }
}

var drawForward = function () {
    var forward = document.getElementById("forward");
    if (forward.getContext) {
        var ctx = forward.getContext("2d");
        ctx.lineWidth = 4
        ctx.strokeStyle = "orangered"
        ctx.beginPath();
        ctx.fillStyle = "orangered"
        ctx.moveTo(1, 1);
        ctx.lineTo(19, 10);
        ctx.lineTo(1, 19);


        ctx.stroke()
        ctx.closePath()
    }
}

var drawProgressBar = function () {
    var progressBar = document.getElementById('orange-juice');
    if (progressBar.getContext) {

        var ctx = progressBar.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = "orangered";
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 10);
        ctx.lineTo(640, 10);
        ctx.lineTo(640, 0);
        ctx.lineTo(0, 0);

        ctx.fill()
        ctx.stroke()
        ctx.closePath()

    }
}

var drawXForSS=function(){
    if(ssCanv.getContext){
        var ctx=ssCanv.getContext('2d');

        ctx.beginPath();
        ctx.strokeStyle="black"
        ctx.moveTo(1,1);
        ctx.lineTo(19,19);
        ctx.moveTo(19,1);
        ctx.lineTo(1,19);

        ctx.stroke()
        ctx.closePath()
    }
}