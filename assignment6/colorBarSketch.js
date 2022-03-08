//https://riptutorial.com/d3-js/example/18426/loading-data-from-csv-files
function converter(d){
    d.Value = +d.Value;
    return d;
}

function main(){
    let margin = 150;
    let width = 600 - margin;
    let height = 600 - margin;

    let svg = d3.select("body").append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
        .style("background-color", "lightgray");

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 100 + ", " + 0 + ")");

    let xScale = d3.scaleBand().range([0, width]).padding(0.3);
    let yScale = d3.scaleLinear().range([height, 0]);
    let colorScale = d3.scaleLinear().range(["white", "green"]);

    d3.csv("Week49.csv", converter).then(data => {
        container_g.append("text")
            .attr("y", 50)
            .attr("x", -50)
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Percent of Positive Opinions on the relationship between");

        container_g.append("text")
            .attr("y", 65)
            .attr("x", -50)
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("the USA and Germany, by Germans, 2017-2020");

        let dataSet = data.map(function(d){
            if(d.Respondent === "Germany" && d.Response === "Good"){
                return {Year: d.Year, Value:d.Value};
            }
        })
            .filter(function(x){  //https://www.techiedelight.com/remove-falsy-values-from-an-array-in-javascript/
            return x !== undefined;
        })

        let years = data.map(function(d) {
            return d.Year;
        })

        xScale.domain(years);

        let valueMax = d3.max(dataSet.map(function(d){
            return d.Value;
        }));

        yScale.domain([0, valueMax]);
        colorScale.domain([0, valueMax]);

        container_g.selectAll("rect")
            .data(dataSet)
            .enter()
            .append("rect")
            .style("width", xScale.bandwidth())
            .style("height", function(d) {
                return yScale(valueMax - d.Value);
            })
            .style("fill", function(d){
                return colorScale(d.Value);
            })
            .style("stroke", "black")
            .style("x", function(d) {
                return xScale(d.Year);
            })
            .style("y", function(d) {
                return 100 + yScale(d.Value);
            });

        let legend = d3.legendColor().scale(colorScale).shape("rect").title("Color Legend");

        container_g.append("g")
            .attr("transform", "translate(350,100)")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .call(legend);

        //Code from lecture
        container_g.append("g")
            .attr("transform", "translate(0, 550)")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("y", 45)
            .attr("x", 225)
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("Year");

        // Display the Y-axis
        container_g.append("g")
            .attr("transform", "translate(0, 100)")
            .call(d3.axisLeft(yScale).tickFormat(function(d) {
                return d;
            }).ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x", -50)
            .attr("dy", "-5.1em")
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("% of Surveyed Germans with Positive Opinions");
    })
}

main();