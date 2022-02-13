let data;

function myMedian(arr, bottom, top){
  var arrayLength = arr.length;
  var median;
  if(arrayLength % 2 == 0){
    var lower = Math.floor((top + bottom) / 2);
    var upper = Math.ceil((top + bottom) / 2);
    median = (Number(arr[upper]) + Number(arr[lower])) / 2;
  } else{
    median = (arr[(top+ bottom)/ 2]) ;
  }
  return median;
}

function firstQuart(arr, bottom, top){
  var arrayLength = arr.length;
  var firstQuartile;
  if(arrayLength % 4 == 0){
    var lower = Math.floor((top + bottom) / 4);
    var upper = Math.ceil((top + bottom) / 4);
    firstQuartile = (Number(arr[upper]) + Number(arr[lower])) / 2;
  } else{
    firstQuartile = (arr[(top + bottom) / 4]);
  }
  return firstQuartile;
}

function thirdQuart(arr, bottom, top){
  var arrayLength = arr.length;
  var thirdQuartile;
  if(arrayLength % 4 == 0){
    var lower = Math.floor(3 *((top + bottom) / 4) );
    var upper = Math.ceil(3 *((top + bottom) / 4));
    thirdQuartile = (Number(arr[upper]) + Number(arr[lower])) / 2;
  } else{
    thirdQuartile = (arr[3*((top + bottom) / 4)]);
  }
  return thirdQuartile;
}

function compareNumbers(x, y){
  return x - y; //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
}

function preload(){
    data = loadTable('Total Referee Stats.csv', 'csv', 'header');
}

function setup() {
  
  createCanvas(400, 500);
  background(225);
  line(50,0,50,height);
  line(0,400,width,400);
  textSize(20);
  text("Total Games Officiated by NBA Referees 2016-20",100,25,250);
  text("Total Games",150,450);
  var gamesColumn = data.getColumn("Total Games");
  gamesColumn.sort(compareNumbers);


  var max = Number(gamesColumn[gamesColumn.length-1]);
  console.log(max);
  var min = Number(gamesColumn[0]);
  console.log(min);
  var median = myMedian(gamesColumn, 0, gamesColumn.length-1);
  console.log(median);
  var firstQuartile = firstQuart(gamesColumn, 0, gamesColumn.length-1);
  console.log(firstQuartile);
  var thirdQuartile = thirdQuart(gamesColumn, 0, gamesColumn.length-1);
  console.log(thirdQuartile);

  textAlign(CENTER);
  stroke(0,125);
  for(let i=0; i<6; i++){
    var x = 100+50*i;
    line(x,400, x, 0);
    text(i*50+50, x, 425);
  }

  stroke(0);
  fill(0,150,255);
  line(50+min, 240, 50+min, 260);
  line(50+min, 250, 50+firstQuartile, 250);
  rect(50+firstQuartile,225,median - firstQuartile,50);
  rect(50+median, 225, thirdQuartile-median, 50);
  line(50+thirdQuartile, 250, 50+max, 250);
  line(50+max, 240, 50+max, 260);
}