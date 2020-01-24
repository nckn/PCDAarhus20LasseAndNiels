// Classifier Variable
let classifier
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/YTTAqyvb/'

// Video
let video
let flippedVideo
// To store the classification
let label = ''

var slider;
var sounds = [
  {name: 'kick', sound: null, path: 'snd/kick.wav', canPlay: true},
  {name: 'snare', sound: null, path: 'snd/snare.wav', canPlay: true}
];

// Load the model first
function preload () {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json')
}

function setup () {
  createCanvas(640, 480);
  // poseNet
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  sounds.forEach(element => {
    element.sound = loadSound(element.path, soundIsLoaded)
  });
  slider = createSlider(0, 1, 0, 0.01)
  

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo()
}

function soundIsLoaded () {
  sounds.forEach(element => {
    element.sound.play()
  })
}

function draw () {
  background(0)
  // Draw the video
  image(flippedVideo, 0, 0, 320, 240)

  // Set volume
  // song.setVolume(slider.value());
  
  // Draw the label
  fill(255, 0, 0)
  textSize(16)
  textAlign(CENTER)
  text(label, width / 2, height - 4)
}

// Get a prediction for the current video frame
function classifyVideo () {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult)
}

// When we get a result
function gotResult (error, results) {
  // If there is an error
  if (error) {
    console.error(error)
    return
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label

  if (results[0].label == 'Class 2' && sounds[0].canPlay) { 
    print('cool burger')
    sounds[0].sound.play()
    sounds[0].canPlay = false
    sounds[1].canPlay = true
  } else if (results[0].label == 'Class 3' && sounds[1].canPlay) {
    sounds[1].sound.play()
    sounds[1].canPlay = false
    sounds[0].canPlay = true
  }
  
  // Classifiy again!
  classifyVideo()
}
