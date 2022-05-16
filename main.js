objectDetector= "";

img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('https://i.postimg.cc/GhHR52SB/lossy-page1-1200px-thumbnail-tif.jpg');
}


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  video.size(380, 380);
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);

      if(status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        for (var i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          document.getElementById("numOfObjectDetect").innerHTML = "Number Of Objects Detect: " + objects.length;
    
          fill(r, g, b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
          noFill();
          stroke(r, g, b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}
