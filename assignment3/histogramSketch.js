let data;

function preload(){
    data = loadTable('Total Referee Stats.csv', 'csv', 'header');
}

function setup() {
  background(225);
  const numbers = [];
  createCanvas(1000, 775);
  line(150,0,150,height);
  line(0,675,width,675);
  textSize(20);
  text("Total Fouls Called by NBA Referees 2016-20",400,25);
  text("Frequency", 5,300);
  text("Total Fouls Called",500,750);
  var foulsColumn = data.getColumn("Total Fouls Called");
  const maxFouls = Math.max(...foulsColumn);
  var bucketSize = 500;
  var totalBuckets = Math.ceil(maxFouls / bucketSize);
  for(let i=0; i<totalBuckets; i++){
    numbers.push(0);
  }
  for(let i=0; i<foulsColumn.length; i++){
    numbers[Math.floor(foulsColumn[i]/500)]++;
  }
  
  let maxFrequency = Math.max(...numbers);
  let rectWidth = 800 / totalBuckets;
  let unitHeight = 350 / Math.floor(maxFouls/500);
  var num = maxFrequency;
  for(let i=0; i<maxFrequency; i++){
    textAlign(RIGHT);
    var scaleHeight = height-100-unitHeight*(maxFrequency-i);
    text(maxFrequency-i,135,scaleHeight+10);
    line(150,scaleHeight,width, scaleHeight);
  }
  fill(125,255,125);
  textAlign(LEFT);
  textSize(18);
  for(let i=0; i<numbers.length; i++){
    var lower = 0 + i*500;
    var upper = 499 + i*500;
    var x = 175+(i*rectWidth);
    fill(0);
    text(lower + "- " + upper, x+10,680,rectWidth-100);
    fill(125,255,125);
    rect(x,height-100-(unitHeight*numbers[i]),rectWidth-10,unitHeight*numbers[i]);
  }
}