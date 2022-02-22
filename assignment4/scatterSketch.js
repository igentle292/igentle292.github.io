//https://riptutorial.com/d3-js/example/18426/loading-data-from-csv-files
function converter(d){
    d.Total_Games = +d.Total_Games;
    d.Total_Fouls_Called = + d.Total_Fouls_Called;
    return d;
}

function main(){
    let margin = 150;
    let width = 600 - margin;
    let height = 600 - margin;

    let svg = d3.select("body").append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 100 + ", " + 0 + ")");

    let xScale = d3.scaleLinear().range([0, width]);
    let yScale = d3.scaleLinear().range([height, 0]);

    d3.csv("RefereeStats.csv", converter).then(data => {
        container_g.append("text")
            .attr("font-family", "sans-serif")
            .attr("y", 45)
            .attr("x", 25)
            .attr("stroke", "black")
            .text("Total fouls called by each Referee vs total games");

        container_g.append("text")
            .attr("font-family", "sans-serif")
            .attr("y", 65)
            .attr("x", 25)
            .attr("stroke", "black")
            .text("officiated in the NBA 2016-2020 Regular Seasons");

        let games = data.map(function(d) {
            return d.Total_Games;
        })

        xScale.domain([0,300]);

        let fouls = data.map(function(d) {
            return d.Total_Fouls_Called})

        yScale.domain([0, 5000]);



        container_g.append("g")
            .attr("transform", "translate(0, " + 100 + ")")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .style("r", 5)
            .style("fill", "red")
            .style("stroke", "black")
            .style("cx", function(d) {
                return xScale(d.Total_Games);
            })
            .style("cy", function(d) {
                return yScale(d.Total_Fouls_Called);
            });

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
            .text("Games Officiated by each Referee");

        // Display the Y-axis
        container_g.append("g")
            .attr("transform", "translate(0, 100)")
            .call(d3.axisLeft(yScale).tickFormat(function(d) {
                return d;
            }).ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x", -150)
            .attr("dy", "-5.1em")
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("Total fouls called by each Referee");
    })
}

main();