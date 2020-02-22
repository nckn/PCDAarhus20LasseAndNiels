# p5 Sketches

## [Teachable Machine](https://teachablemachine.withgoogle.com/)

[Template for pose detection](https://editor.p5js.org/lasse/sketches/KBejwCO_)

[Template for image classifcation](https://editor.p5js.org/lasse/sketches/8m4frlFhA)

[Template for sound classifcation](https://editor.p5js.org/nielskonrad/sketches/MvvUu0YV)




## Snippets

### Ease / Lerp
```
let endValue = 0;

void draw() {
newValue = mouseX
endValue = lerp(endValue, newValue, 0.5);
}
```

### map and scaling range
```
// Distance example
distance = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y)
// Remapped value
remappedDist = map(distance, 0, 200, 20, 0)
```

### Resize eventlistener
```
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
```

### Delay something
```
setTimeout(() => {
  doSomethingHere();
}, 1000);
```

### Make a random value
```
let value1 = random(150); // 0 and 150
let value2 = random(30, 70); // Between 30 and 70
```




## Contact info

### Niels

http://www.konradstudio.com

[@konradstudio](https://www.instagram.com/konradstudio/)

[mail@konradstudio.com](mailto:mail@konradstudio.com)


### Lasse

http://lassekorsgaard.com

[@lassekorsgaard](https://www.instagram.com/lassekorsgaard/)

[hi@lassekorsgaard.com](mailto:hi@lassekorsgaard.com)





## Tutorials, documentation and inspration

PoseNet Eased Nose Tracking
https://editor.p5js.org/codingtrain/sketches/Skd42hIy4
Dan Shiffman

## Frequency modulation

https://p5js.org/examples/sound-amplitude-modulation.html

## poseNet doc

https://github.com/tensorflow/tfjs-models/tree/master/posenet

## Examples

https://veremin.mybluemix.net/