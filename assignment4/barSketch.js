//https://riptutorial.com/d3-js/example/18426/loading-data-from-csv-files
function converter(d){
    d.Fouls = +d.Fouls;
    if(d.Fouls !== 0) {
        return d;
    }
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

    let xScale = d3.scaleBand().range([0, width]);
    let yScale = d3.scaleLinear().range([height, 0]);

    d3.csv("RefereeStats.csv", converter).then(data => {
        container_g.append("text")
            .attr("y", 50)
            .attr("x", -50)
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Total Fouls called by Referees in each NBA Regular Season, 2016-2020");

        let years = data.map(function(d) {
            return d.Year;
        })

        xScale.domain(years);

        let fouls = data.map(function(d) {
            return d.Fouls})

        let foulsMax = d3.max(fouls);

        yScale.domain([0, 55000]);

        container_g.selectAll("rect")
            .data(fouls)
            .enter()
            .append("rect")
            .style("width", 50)
            .style("height", function(d) {
                return yScale(55000 - d);
            })
            .style("fill", "blue")
            .style("x", function(d, i) {
                return 35 + (i * 110);
            })
            .style("y", function(d) {
                return 100 + yScale(d);
            });

        container_g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 16)
            .selectAll("text")
            .data(fouls)
            .enter()
            .append("text")
            .attr("x", function(d, i) {
                return 37 + (i * 110);
            })
            .attr("y", function(d) {
                return 120 + yScale(d);
            })
            .attr("stroke", "white")
            .attr("fill", "white")
            .text(function(d) {
                return d;
            })

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
            .text("Season");

        // Display the Y-axis
        container_g.append("g")
            .attr("transform", "translate(0, 100)")
            .call(d3.axisLeft(yScale).tickFormat(function(d) {
                return d;
            }).ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -5)
            .attr("x", -150)
            .attr("dy", "-5.1em")
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("Total fouls called");
    })
}

main();