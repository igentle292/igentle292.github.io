let data;

function preload(){
    data = loadTable('Total Referee Stats1.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 800);
  background(225);
  const fouls2016 = [];
  const string2016 = "2016-17";
  const fouls2017 = [];
  const string2017 = "2017-18";
  const fouls2018 = [];
  const string2018 = "2018-19";
  const fouls2019 = [];
  const string2019 = "2019-20";
  const max = Math.max(...data.getColumn("Total fouls"));
  const numPixles = max /(height-175);

  
  line(150,0,150,height);
  line(0,675,width,675);
  textSize(20);
  text("Total Fouls Called by NBA Referees each Season 2016-2020",200,35);
  text("Fouls Called by each Referee", 5,300,100);
  text("Season",450,750);
  var seasonsColumn = data.getColumn("Season");

  for(let i=0; i<seasonsColumn.length; i++){
    if(seasonsColumn[i] == string2016){
        fouls2016.push(data.getNum(i, "Total fouls"));
    }
    else if(seasonsColumn[i] == string2017){
        fouls2017.push(data.getNum(i, "Total fouls"));
    }
    else if(seasonsColumn[i] == string2018){
        fouls2018.push(data.getNum(i, "Total fouls"));
    }
    else if(seasonsColumn[i] == string2019){
        fouls2019.push(data.getNum(i, "Total fouls"));
    }
  }

  textAlign(RIGHT);
  for(let i=0; i<10; i++){
    stroke(0,125);
    var y = height-125 -((100+(i*100))/ numPixles);
    var num = 100 + (i * 100);
    text(num, 140, y);
    line(150, y, width, y);
}

  text(string2016,240,700);
  text(string2017,360,700);
  text(string2018,480,700);
  text(string2019,600,700);

  fill(125,0,255);

  for(let i=0; i<fouls2016.length; i++){
    var y = height-125- (fouls2016[i] / numPixles);
    ellipse(245+random(45),y, 10);
  }

fill(255,0,125);
  for(let i=0; i<fouls2017.length; i++){
    var y = height-125-(fouls2017[i] / numPixles);
    ellipse(365+random(45),y, 10);
  }

fill(0,125,255);
  for(let i=0; i<fouls2018.length; i++){
    var y = height-125-(fouls2018[i] / numPixles);
    ellipse(485+random(45),y, 10);
  }

fill(200,255,0);
  for(let i=0; i<fouls2019.length; i++){
    var y = height-125-(fouls2019[i] / numPixles);
    ellipse(605+random(45),y, 10);
  }
}