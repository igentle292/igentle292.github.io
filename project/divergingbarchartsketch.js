//https://riptutorial.com/d3-js/example/18426/loading-data-from-csv-files
function converter(d){
    d.Change_in_Players = +d.Change_in_Players;
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

    let xScale = d3.scaleBand().range([width-margin, 0]).padding(0.3);
    let positiveyScale = d3.scaleLinear().range([225, 0]);
    let negativeyScale = d3.scaleLinear().range([425, 225]);
    let colorScale = d3.scaleLinear().range(["red","white", "green"]);

    d3.csv("speedrun_player_count.csv", converter).then(data => {
        container_g.append("text")
            .attr("y", 50)
            .attr("x", -50)
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Change in Active Super Mario 64 Speedrunners, 2016-2022");

        let negMax = 0 - d3.min(data.map(function(d){
            return d.Change_in_Players
        }));

        let posMax = d3.max(data.map(function(d){
            return d.Change_in_Players
        }));

        let absoluteMax = (posMax > negMax) ? posMax : negMax;

        xScale.domain(data.map(function(d) {
            return d.Date;
        }));

        positiveyScale.domain([0, absoluteMax]);
        negativeyScale.domain([0-absoluteMax, 0]);
        colorScale.domain([0 - absoluteMax, 0, absoluteMax]);

        container_g.append("g")
            .attr("transform", "translate(0,0)")
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .style("width", xScale.bandwidth())
            .style("height", function(d) {
                let num = d.Change_in_Players;
                if(num > 0){
                    return 225 - positiveyScale(d.Change_in_Players);
                }
                return negativeyScale(d.Change_in_Players) - 225;
            })
            .style("fill", function(d){
                return colorScale(d.Change_in_Players);
            })
            .style("stroke", "black")
            .style("x", function(d) {
                return xScale(d.Date);
            })
            .style("y", function(d) {
                let num = d.Change_in_Players;
                if(num > 0){
                    return positiveyScale(d.Change_in_Players)+margin;
                }
                return negativeyScale(0) + margin;
            });

        let legend = d3.legendColor().scale(colorScale).shape("rect").title("Color Legend");

        container_g.append("g")
            .attr("transform", "translate(500,100)")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .call(legend);

        //Code from lecture
        container_g.append("g")
            .attr("transform", "translate(0, 325)")
            .call(d3.axisBottom(xScale).tickSize(0).tickPadding(225))
            .append("text")
            .attr("y", 225)
            .attr("x", -35)
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("Date");

        // Display the Y-axis
        container_g.append("g")
            .attr("transform", "translate(0, 100)")
            .call(d3.axisLeft(positiveyScale).tickFormat(function(d) {
                return d;
            }).ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 25)
            .attr("x", -50)
            .attr("dy", "-5.1em")
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("Change in Active Players");

        container_g.append("g")
            .attr("transform", "translate(0, 100)")
            .call(d3.axisLeft(negativeyScale).tickFormat(function(d) {
                return d;
            }).ticks(10));

    })
}

main();