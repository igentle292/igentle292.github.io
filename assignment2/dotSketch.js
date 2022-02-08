let data;
function preload(){
    data = loadTable('revamped-stop-and-search-data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1800, 1250);
  line(250,0,250,height);
  line(0,1050,width,1050);
  textSize(28);
  text("Stop and Search rate per 1,000 population performed by UK police in 2019/20 by Ethnicity", 400, 40);
  text("Stop and Search rate per 1,000 population",25,450,125);
  text("Ethnicity",900,1150);

  stroke(0, 180);
  for(var i=1; i<12; i++){
    var scaleHeight = (i*5.0 / 60) * (height - 200);
    text((12-i)*5, 175, scaleHeight+50);
    line(250,scaleHeight+50,width,scaleHeight+50);
  }

  
  for(var i=0; i<data.getRowCount(); i++){
    var x = (250 * i) + 350; 
    var y = (data.getNum(i, "Rate per 1,000 population") / 60) * (height - 200);
    var ethnicity = data.getString(i,"Ethnicity(Rate)");
    if(ethnicity == 'All'){
      fill(0,0,255);
    }
    else{
      fill(255,0,0);
    }
    ellipse(x,height-150-y,40);
    fill(0,0,0);
    textAlign(CENTER);
    text(ethnicity,x-100,1075,200);
  }
}