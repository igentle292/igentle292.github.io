let data;
function preload(){
    data = loadTable('revamped-stop-and-search-data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1800, 1250);
  line(250,0,250,height);
  line(0,1050,width,1050);
  textSize(28);

  text("Number of stop and searches performed by UK police in 2019/20 by Ethnicity", 400, 40);
  text("Number of stop and searches",25,450,125);
  text("Ethnicity",900,1150);

  
  text(0,150,1040);

  stroke(0, 180);
  for(var i=0; i<12; i++){
    var scaleHeight = (i*50000 / 600000) * (height - 200);
    text((12-i)*50000, 150, scaleHeight);
    line(250,scaleHeight,width,scaleHeight);
  }

  
  for(var i=0; i<data.getRowCount(); i++){
    var x = (250 * i) + 300; 
    console.log(data.getNum(i, "Number of stop and searches"));
    var y = (data.getNum(i, "Number of stop and searches") / 600000) * (height - 200);
    var ethnicity = data.getString(i,"Ethnicity(Number)");
    if(ethnicity == 'All'){
      fill(0,0,255);
    }
    else{
      fill(255,0,0);
    }
    rect(x,height-200-y,125,y);
    fill(0,0,0);
    text(ethnicity,x+10,1075,200);
  }
}