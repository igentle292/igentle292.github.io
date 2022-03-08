//https://riptutorial.com/d3-js/example/18426/loading-data-from-csv-files
function converter(d){
    d.Value = +d.Value;
    return d;
}

function main(){
    let margin = 150;
    let width = 700 - margin;
    let height = 600 - margin;

    let svg = d3.select("body").append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 100 + ", " + 0 + ")");

    let xScale = d3.scaleBand().range([0, width-100]);
    let yScale = d3.scaleLinear().range([height, 0]);
    let colorScale = d3.scaleOrdinal().range(["blue", "red"]);

    d3.csv("Week49.csv", converter).then(data => {
        container_g.append("text")
            .attr("font-family", "sans-serif")
            .attr("y", 45)
            .attr("x", 25)
            .attr("stroke", "black")
            .text("Positive Opinions on the USA-Germany Relationship,");

        container_g.append("text")
            .attr("font-family", "sans-serif")
            .attr("y", 65)
            .attr("x", 25)
            .attr("stroke", "black")
            .text(" by Germans and Americans, 2017-20");

        let dataSet = data.map(function(d){
            if(d.Response === "Good"){
                return {Year: d.Year, Value:d.Value, Respondent:d.Respondent};
            }
        })
            .filter(function(x){  //https://www.techiedelight.com/remove-falsy-values-from-an-array-in-javascript/
                return x !== undefined;
            })

        let years = data.map(function(d) {
            return d.Year;
        })

        xScale.domain(years);

        yScale.domain([0, d3.max(dataSet.map(function(d){
            return d.Value;
        }))]);

        colorScale.domain(["United States","Germany"]);

        container_g.append("g")
            .attr("transform", "translate(0, " + 100 + ")")
            .selectAll("circle")
            .data(dataSet)
            .enter()
            .append("circle")
            .style("r", 5)
            .style("fill", function(d){
                return colorScale(d.Respondent);
            })
            .style("stroke", "black")
            .style("cx", function(d) {
                return 50 + xScale(d.Year);
            })
            .style("cy", function(d) {
                return yScale(d.Value);
            });

        let legend = d3.legendColor().scale(colorScale).shape("rect").title("Color Legend");

        container_g.append("g")
            .attr("transform", "translate(450,100)")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .call(legend);

        //Code from lecture
        container_g.append("g")
            .attr("transform", "translate(0, " + 550 + ")")
            .call(d3.axisBottom(xScale).tickFormat(function(d){
                return d;
            }))
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
                return d+"%";
            }).ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x", -150)
            .attr("dy", "-5.1em")
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("% Surveyed with Positive Opinions");
    })
}

main();