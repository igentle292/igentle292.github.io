
function main() {
    let margin = 150;
    let width = 800 - margin;
    let height = 650 - margin;

    let svg = d3.select("body").append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 100 + ", " + 0 + ")");

    let parseDate = d3.timeParse("%Y-%m-%d");
    let parseTime = d3.timeParse("%H:%M:%S");

    let xScale = d3.scaleTime().range([0, width]);
    let yScale = d3.scaleTime().range([0, height]);

    d3.csv("SM64_120_Star_Speedrun_Time.csv", function(d){
        d.Date = parseDate(d.Date);
        d.Time = parseTime(d.Time);
        return d;
    })
        .then(data => {
            container_g.append("text")
                .attr("y", 50)
                .attr("x", 250)
                .attr("stroke", "black")
                .attr("font-family", "sans-serif")
                .text("WR Time Progression");

            xScale.domain(d3.extent(data, function(d){return d.Date}));

            console.log(parseTime("0:00:00"));
            const times = data.map(function(d){
                return d.Time;
            })
            console.log(times);

            yScale.domain([d3.max(times), parseTime("1:30:00")]);

            let line = d3.line();
            const newData = data.map(function(d, i){  //formatting the data so i can use d3.line()
                return [xScale(d.Date), yScale(times[i])];
            });

            container_g.append("g")
                .attr("transform", "translate(20, 100)")
                .selectAll("circle")
                .data(newData)
                .enter()
                .append("circle")
                .style("cx", function(d){
                    return d[0];
                })
                .style("cy", function(d){
                    return d[1];
                })
                .style("r", 4)
                .style("fill", "green")
                .style("stroke", "green");

            //Code from lecture
            container_g.append("g")
                .attr("transform", "translate(0, 550)")
                .call(d3.axisBottom(xScale))
                .append("text")
                .attr("y", 45)
                .attr("x", 500)
                .attr("stroke", "black")
                .attr("fill", "black")
                .attr("font-size", 14)
                .text("Date");

            // Display the Y-axis
            container_g.append("g")
                .attr("transform", "translate(0, 100)")
                .call(d3.axisLeft(yScale).tickFormat(function(d) {
                    let axisString = d.toLocaleTimeString();
                    return axisString.substring(0, axisString.length - 3);
                }).ticks(10))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -5)
                .attr("x", -150)
                .attr("dy", "-5.1em")
                .attr("stroke", "black")
                .attr("fill", "black")
                .attr("font-size", 14)
                .text("Time");
        })
}

main();
