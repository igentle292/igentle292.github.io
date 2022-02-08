let data;
function preload(){
  data = loadTable('revamped-stop-and-search-data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1800, 1250);
  textSize(28);
  var max = 125;
  var min = 3;
  text("Stop and Search rate per 1,000 population performed by UK police over the years by Ethnicity", 400, 40);
  text("3",200,1050);
  text("125",550,1050);

  noStroke()
  let colorFrom = color(0,0,255);
  let colorTo = color(255,0,0);
  for(var i=0; i<16; i++){
    fill(lerpColor(colorFrom, colorTo, i/15));
    rect(200+(i*25),1100,25,25);
  }

  fill(0,0,0);
  let years = data.getRow(1);
  for(var i=0; i<data.getRowCount(); i++){
    var ethnicity = data.getString(i,"Ethnicity(Heat)");
    text(ethnicity, 50, 225+(i*125),200);
  }

  for(var i=8; i<data.getColumnCount(); i++){
    var column = data.getColumn(i);
    var x = 250 + ((i-8) * 125);
    fill(0,0,0);
    text(data.columns[i], x, 150, 60);
    for(var j=0; j<column.length; j++){
      var newColor = (column[j] / (max - min)) * 255;
      var y = 200+((j)*125);
      fill(newColor,0,255-newColor);
      rect(x,y,100,100);
    }
  }
}