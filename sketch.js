let keyFrequency = {
  C: 261.6256,
  E: 329.6276,
  F: 349.2282,
  G: 391.9954,
  A: 440.0000,
  B: 493.8833
};

let env, wave;
let button;
let isPlaying = false;

// Start with the initial iteration
// let currentIteration = ["C"];
let currentIteration = ["C"];

let melody = [];  // Full melody generated
let index = 0;  // To keep track of current note in melody
let yPos = 20;  // Initial Y position for drawing text
let drawnNotes = [];  // Keep track of all drawn notes

let colors = [];  // Array to store colors for each iteration
let currentColor;  // The color for the current iteration

function setup() {
  createCanvas(400, 400);
  
  // Setup envelope and oscillator
  env = new p5.Envelope();
  env.setADSR(0.05, 0.1, 0.5, 1);
  env.setRange(1.2, 0);

  wave = new p5.Oscillator();
  wave.setType('sine');
  wave.start();
  wave.amp(env);
  
  // Create button to play/pause
  button = createButton('Play/Pause');
  button.position(10, height + 10);
  button.mousePressed(togglePlayPause);
  
  // Initialize the color for the first iteration
  currentColor = color(random(255), random(255), random(255));
  colors.push(currentColor);  // Store the first color
  
  textSize(16);  // Set text size
  textStyle(BOLD);  // Set text style to bold
}

function draw() {
  background(255);
  
  // Draw all the notes that have been drawn so far with their respective colors
  let xPos = 20;
  let tempYPos = 30;
  
  for (let i = 0; i < drawnNotes.length; i++) {
    fill(drawnNotes[i].color);  // Set the color for each note
    text(drawnNotes[i].note, xPos, tempYPos);
    xPos += 20;  // Move to the right for the next note
    if (xPos > width - 20) {  // Move to the next line if exceeding canvas width
      xPos = 20;
      tempYPos += 20;
    }
  }
  
  if (isPlaying && frameCount % 30 == 0) {  // Play note every half second
    if (index < melody.length) {
      playNote(melody[index]);
      drawnNotes.push({ note: melody[index], color: currentColor });  // Add the note and its color to the drawn notes
      index++;
    } else {
      generateNextIteration();
      index = 0;
      yPos += 20;  // Move to next line for new iteration
      currentColor = color(random(255), random(255), random(255));  // Assign a new random color for the next iteration
      colors.push(currentColor);
    }
  }
}

function playNote(note) {
  let freq = keyFrequency[note];
  wave.freq(freq);
  env.play();
}

function generateNextIteration() {
  let newIteration = [];
  for (let i = 0; i < currentIteration.length; i++) {
    switch (currentIteration[i]) {
      // case 'A':
      //   newIteration.push('C', 'F', 'E');
      //   break;
      // case 'C':
      //   newIteration.push('G', 'E');
      //   break;
      // case 'E':
      //   newIteration.push('C', 'G');
      //   break;
      // case 'F':
      //   newIteration.push('A', 'C');
      //   break;
      // case 'G':
      //   newIteration.push('E', 'F', 'C');
      //   break;
      case 'C':
        newIteration.push('G');
        break;
      case 'G':
        newIteration.push('E', 'C', 'G');
        break;
      case 'E':
        newIteration.push('E', 'C', 'E');
        break;
    }
  }
  currentIteration = newIteration;
  melody = melody.concat(newIteration);
}

function togglePlayPause() {
  isPlaying = !isPlaying;
  if (!isPlaying) {
    wave.stop();  // Stop the sound when paused
  } else {
    wave.start();  // Start the sound again
  }
}
