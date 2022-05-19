//https://riptutorial.com/d3-js/example/18426/loading-data-from-csv-files
function converter(d){
    d.Change_in_Players = +d.Change_in_Players;
    return d;
}

function main(){
    //Active Player means active in the last 30 Days
    let margin = 100;
    let width = 800 - margin - 100;
    let height = 650 - margin;

    let svg = d3.select("#bar").append("svg")
        .attr("width", width + margin + 100)
        .attr("height", height + margin)
        // .style("background-color", "lightgray");

    let container_g = svg.append("g")
        .attr("transform", "translate(100, 0)");

    let xScale = d3.scaleBand().range([width-margin, 0]).padding(0.3);
    let positiveyScale = d3.scaleLinear().range([225, 0]);
    let negativeyScale = d3.scaleLinear().range([425, 225]);
    let colorScale = d3.scaleLinear().range(["red","white", "green"]);
    //negative, zero, and positive scale

    d3.csv("active_player_count.csv", converter).then(data => {
        container_g.append("text")
            .attr("y", 50)
            .attr("x", 0)
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
        //get the absolute value max in order to equally scale both positive and negative rectangles

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
                    //positive rectangles' height is subtracted from the max
                    return 225 - positiveyScale(d.Change_in_Players);
                }
                //negative rectangles' height is subtracted my max
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
                    //positives rectangles' y position is the height value, plus the margin
                    return positiveyScale(d.Change_in_Players)+margin;
                }
                //negative rectangles' y position is the 0 position plus margin
                return negativeyScale(0) + margin;
            }).on("mouseover", function(elem, d){
            let y;
            let num = d.Change_in_Players;

            //gets the midpoint between the height and base position depending on negative or positive
            //probably an easier way to do this
            if(num > 0){
                y = (positiveyScale(d.Change_in_Players)+margin) + ((225 - positiveyScale(d.Change_in_Players))/2);
            } else {
                y = (negativeyScale(0) + margin) + ((negativeyScale(d.Change_in_Players) - 225)/2);
            }
            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xScale(d.Date) + 125)
                .attr("y", y)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .text("Current Active Players: " + d.Active_Players);
        })
            .on("mouseout", function() {
                d3.select("#tooltip").remove();
            });

        let legend = d3.legendColor().scale(colorScale).shape("rect").title("Color Legend").ascending(true);

        container_g.append("g")
            .attr("transform", "translate(600,100)")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .call(legend);

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