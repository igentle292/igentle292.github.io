let parseDate = d3.timeParse("%m/%d/%Y");
let parseTime = d3.timeParse("%H:%M:%S");

function converter(d){
    d.Date = parseDate(d.Date);
    d.Time = parseTime(d.Time);
    return d;
}

function main(){
    let margin = 150;
    let width = 1000 - margin;
    let height = 600 - margin;

    let svg = d3.select("#line").append("svg")
        .attr("width", width + margin + 50)
        .attr("height", height + margin);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 100 + ", " + 0 + ")");

    let xScale = d3.scaleTime().range([0, width]);
    let yScale = d3.scaleTime().range([height, 0]);

    d3.csv("SM64 World Record History.csv", converter).then(data => {
        container_g.append("text")
            .attr("y", 50)
            .attr("x", 250)
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("SM 64 World Record History, 2006-2022");

        xScale.domain([d3.min(data.map(function(d){return d.Date;})), parseDate("9/1/2022")]);

        yScale.domain([parseTime("1:30:00"), parseTime("2:15:00")]);

        const newData = data.map(function(d){
            return [xScale(d.Date), yScale(d.Time)];
        });

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
            .text("Time taken to complete(H:MM:SS)");

        let line = d3.line();

        container_g.append("g")
            .attr("transform", "translate(20, 100)")
            .append("path")
            .attr("d", line(newData))
            .attr("stroke", "green")
            .attr("stroke-width", 2)
            .attr("fill-opacity", 0);

        container_g.append("g")
            .attr("transform", "translate(20, 100)")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", function(d){
                return d.Name;
            })
            .style("cx", function(d){
                return xScale(d.Date);
            })
            .style("cy", function(d){
                return yScale(d.Time);
            })
            .style("r", 4)
            .style("fill", "lightgrey")
            .style("stroke", "green")
            .on("mouseover", function(elem, d){
                d3.selectAll("." + d.Name)
                    .style("fill", "blue")
                    .style("stroke", "black");

                container_g.append("text")
                    .attr("id", "tooltip")
                    .attr("x", 10 + xScale(d.Date))
                    .attr("y", 75 + yScale(d.Time))
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "15px")
                    .attr("font-weight", "bold")
                    .attr("fill", "black")
                    .text(d3.timeFormat("%b %e %Y")(d.Date) + ": " + d.Name + " " + d3.timeFormat("%H:%M:%S")(d.Time));
            })
            .on("mouseout", function(elem, d) {
                d3.selectAll("." + d.Name)
                    .style("fill", "lightgrey")
                    .style("stroke", "green");
                d3.select("#tooltip").remove();
            });
    })
}

main();