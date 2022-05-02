
function main() {
    //Data is as of March 16, 2022
    let margin = 200;
    let width = 800 - margin;
    let height = 700 - margin;

    let svg = d3.select("#scatter").append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 100 + ", " + 0 + ")");

    let parseDate = d3.timeParse("%Y-%m-%d");
    let parseTime = d3.timeParse("%H:%M:%S");

    let xScale = d3.scaleTime().range([0, width]);
    let yScale = d3.scaleTime().range([0, height]);

    d3.csv("SM64_120_Star_Speedrun_Time2.csv", function(d){
        d.Date = parseDate(d.Date);
        d.Time = parseTime(d.Time);
        return d;
    })
        .then(data => {
            container_g.append("text")
                .attr("y", 50)
                .attr("x", 0)
                .attr("stroke", "black")
                .attr("font-family", "sans-serif")
                .text("WR Time Progression");

            xScale.domain([d3.min(data.map(function(d){return d.Date})), new Date(2022,5,0)]);


            const times = data.map(function(d){
                return d.Time;
            })

            yScale.domain([d3.max(times), parseTime("1:30:00")]);

            const newData = data.map(function(d, i){
                return {x:xScale(d.Date), y:yScale(times[i]), name:d.Username, time:d3.timeFormat("%H:%M:%S")(times[i])};
            });

            container_g.append("g")
                .attr("transform", "translate(20, 100)")
                .selectAll("circle")
                .data(newData)
                .enter()
                .append("circle")
                .attr("id", function(d){
                    return d.name;
                })
                .style("cx", function(d){
                    return d.x;
                })
                .style("cy", function(d){
                    return d.y;
                })
                .style("r", 4)
                .style("fill", "green")
                .style("stroke", "black")
                .on("mouseover", function(elem, d){
                    svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", d.x + 110)
                        .attr("y", d.y + 125)
                        .attr("text-anchor", "middle")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "15px")
                        .attr("font-weight", "bold")
                        .attr("fill", "black")
                        .text(d.name + ": " + d.time);
                    d3.select(this)
                        .style("fill", "blue")
                        .raise();
                })
                .on("mouseout", function() {
                    d3.select("#tooltip").remove();
                    d3.select(this)
                        .style("fill", "green");
                });

            //Code from lecture
            container_g.append("g")
                .attr("transform", "translate(0, 600)")
                .call(d3.axisBottom(xScale))
                .append("text")
                .attr("y", 45)
                .attr("x", 300)
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
                .text("Time(H:MM:SS");
        })
}

main();