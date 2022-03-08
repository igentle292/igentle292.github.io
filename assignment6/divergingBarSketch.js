//https://riptutorial.com/d3-js/example/18426/loading-data-from-csv-files
function converter(d){
    d.Value = +d.Value;
    return d;
}

function main(){
    let margin = 100;
    let width = 700 - margin;
    let height = 650 - margin;

    let svg = d3.select("body").append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
        .style("background-color", "lightgray");

    let container_g = svg.append("g")
        .attr("transform", "translate(100, 0)");

    let xScale = d3.scaleBand().range([0, width-margin]).padding(0.3);
    let positiveYScale = d3.scaleLinear().range([225, 0]);
    let negativeYScale = d3.scaleLinear().range([0,225]);
    let colorScale = d3.scaleLinear().range(["red","white", "green"]);

    d3.csv("Week49.csv", converter).then(data => {
        container_g.append("text")
            .attr("y", 50)
            .attr("x", -50)
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Opinions of the relationship between the USA and Germany, by Germans, 2017-2020");

        let absoluteMax=0;


        let negativeSet = [];

        let positiveSet = data.map(function(d){
            if(d.Respondent === "Germany"){
                if(d.Value > absoluteMax){
                    absoluteMax = d.Value;
                }
                if(d.Response === "Good"){
                    return {Year: d.Year, Value:d.Value};
                } else if(d.Response === "Bad"){
                    negativeSet.push({Year: d.Year, Value:0-d.Value});
                }
            }
        })
            .filter(function(x){  //https://www.techiedelight.com/remove-falsy-values-from-an-array-in-javascript/
                return x !== undefined;
            })

        xScale.domain(data.map(function(d) {
            return d.Year;
        }));

        positiveYScale.domain([0, absoluteMax]);
        negativeYScale.domain([0, 0 - absoluteMax]);
        colorScale.domain([0 - absoluteMax, 0, absoluteMax]);

        container_g.append("g")
            .selectAll("rect")
            .data(positiveSet)
            .enter()
            .append("rect")
            .style("width", xScale.bandwidth())
            .style("height", function(d) {
                return positiveYScale(absoluteMax - d.Value);
            })
            .style("fill", function(d){
                return colorScale(d.Value);
            })
            .style("stroke", "black")
            .style("x", function(d) {
                return xScale(d.Year);
            })
            .style("y", function(d) {
                return positiveYScale(d.Value)+margin;
            });

        container_g.append("g")
            .selectAll("rect")
            .data(negativeSet)
            .enter()
            .append("rect")
            .style("width", xScale.bandwidth())
            .style("height", function(d) {
                return negativeYScale(d.Value);
            })
            .style("fill", function(d){
                return colorScale(d.Value);
            })
            .style("stroke", "black")
            .style("x", function(d) {
                return xScale(d.Year);
            })
            .style("y", 400);

        let legend = d3.legendColor().scale(colorScale).shape("rect").title("Color Legend");

        container_g.append("g")
            .attr("transform", "translate(500,100)")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .call(legend);

        //Code from lecture
        container_g.append("g")
            .attr("transform", "translate(0, 325)")
            .call(d3.axisBottom(xScale).tickSize(0).tickPadding(35))
            .append("text")
            .attr("y", 45)
            .attr("x", 250)
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("Year");

        container_g.append("line")
            .attr("x1", 0)
            .attr("x2", 500)
            .attr("y1", 400)
            .attr("y2", 400)
            .attr("stroke", "black");
        
        // Display the Y-axis
        container_g.append("g")
            .attr("transform", "translate(0, 100)")
            .call(d3.axisLeft(positiveYScale).tickFormat(function(d) {
                return Math.abs(d) + "%";
            }).ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x", -50)
            .attr("dy", "-5.1em")
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("% of Surveyed Germans with Positive or Negative opinions");

        container_g.append("g")
            .attr("transform", "translate(0, 400)")
            .call(d3.axisLeft(negativeYScale).tickFormat(function(d) {
                return Math.abs(d) + "%";
            }).ticks(10));
    })
}

main();