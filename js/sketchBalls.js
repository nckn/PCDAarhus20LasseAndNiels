// Classifier Variable
let classifier
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/YTTAqyvb/'

// Video
let video
let flippedVideo
// To store the classification
let label = ''

let numBalls = 13
let spring = 0.05
let gravity = 0.03
let friction = -0.9
let balls = []

// Load the model first
function preload () {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json')
}

function setup () {
  createCanvas(windowWidth, windowHeight)
  // Create the video
  video = createCapture(VIDEO)
  video.size(320, 240)
  video.hide()

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo()
  // /*
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(random(width), random(height), random(30, 70), i, balls)
  }
  // */
}

function draw () {
  background(0)
  // Draw the video
  image(flippedVideo, 0, 0)

  // Draw balls
  balls.forEach(ball => {
    noStroke()
    fill(150, 150, 150)
    ball.collide()
    ball.move()
    ball.display()
  })

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

  if (results[0].label == 'Class 2' && balls.length < 100) {
    balls.push(
      new Ball(
        random(width),
        random(height),
        random(30, 70),
        balls.length,
        balls
      )
    )
  }

  print(balls.length)

  // Classifiy again!
  classifyVideo()
}

class Ball {
  constructor (xin, yin, din, idin, oin) {
    this.x = xin
    this.y = yin
    this.vx = 0
    this.vy = 0
    this.diameter = din
    this.id = idin
    this.others = oin
  }

  collide () {
    for (let i = this.id + 1; i < balls.length; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x
      let dy = this.others[i].y - this.y
      let distance = sqrt(dx * dx + dy * dy)
      let minDist = this.others[i].diameter / 2 + this.diameter / 2
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx)
        let targetX = this.x + cos(angle) * minDist
        let targetY = this.y + sin(angle) * minDist
        let ax = (targetX - this.others[i].x) * spring
        let ay = (targetY - this.others[i].y) * spring
        this.vx -= ax
        this.vy -= ay
        this.others[i].vx += ax
        this.others[i].vy += ay
      }
    }
  }

  move () {
    this.vy += gravity
    this.x += this.vx
    this.y += this.vy
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2
      this.vx *= friction
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2
      this.vx *= friction
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2
      this.vy *= friction
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2
      this.vy *= friction
    }
  }

  display () {
    ellipse(this.x, this.y, this.diameter, this.diameter)
  }
}
