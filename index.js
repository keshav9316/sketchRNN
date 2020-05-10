let sketchRNN;
let currentStroke;
let nextpen = "down";
let x;
let y;
let personDrawing = false;
let seedpath =[];

async function preload(){
 sketchRNN = ml5.sketchRNN('cat');
}

function gotStrokePath(error , result){
 if(error){
   console.error(error)
 }
  console.log(result);
  currentStroke = result;
}

function startDrawing(){
 personDrawing ="true";
 x = mouseX;
 y = mouseY;
}
/*                    "sketchRNN" is an object of objects. 
"generate" generates a random sketch (which is an OBJECT) from sketchRNN  
             HOWEVER, "seedpath" is an array of objects.             */

function sketchRNNstart(){
  personDrawing = false;
  sketchRNN.generate(seedpath, gotStrokePath);  
  //console.log(sketchRNN);
}

function setup() {
 let canvas = createCanvas(600,400);
 canvas.mousePressed( startDrawing );
 canvas.mouseReleased( sketchRNNstart );

 background(255);
//  x = width/2;
//  y = height/2;
  //sketchRNN.generate(gotStrokePath);
}

function draw() {
 stroke(0);
 strokeWeight(4);
 // background(255);
//  translate(width/2,height/2);

if(personDrawing == "true"){

  let drawingPath = {
    dx : mouseX -pmouseX,
    dy : mouseY -pmouseY,
    pen : "down"
  }
  seedpath.push(drawingPath);
  line(x,y,x + drawingPath.dx,y + drawingPath.dy);
  
  x += drawingPath.dx;
  y += drawingPath.dy;

}

  if(currentStroke){

    if(nextpen == "end"){
      sketchRNN.reset();
      currentStroke = null;
      nextpen = "down";
      return;
    }

    if (nextpen == "down"){
      line(x,y,x + currentStroke.dx,y + currentStroke.dy);
    }

    x += currentStroke.dx;
    y += currentStroke.dy;
    nextpen = currentStroke.pen;
    currentStroke = null;
  sketchRNN.generate(gotStrokePath);

  }

  
}
