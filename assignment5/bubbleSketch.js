//https://riptutorial.com/d3-js/example/18426/loading-data-from-csv-files
function converter(d){
    d.Generation = +d.Generation;
    d.Change = +d.Change;
    return d;
}//year x, power generated y, power type color, change on last year size

function main(){
    let margin = 150;
    let width = 1000 - margin;
    let height = 600 - margin;

    let svg = d3.select("body").append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 100 + ", " + 0 + ")");

    let xScale = d3.scaleBand().range([0, width]);
    let yScale = d3.scaleLinear().range([height, 0]);
    let rScale = d3.scaleLinear().range([5,30]);

    d3.csv("United Kingdom Power.csv", converter).then(data => {
        container_g.append("text")
            .attr("y", 50)
            .attr("x", 150)
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Power generated in the UK, by resource and change over the years, 2000-2020");

        container_g.append("text")
            .attr("y", 75)
            .attr("x", 750)
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .text("Color/Resource Legend:");

        container_g.append("text")
            .attr("y", 90)
            .attr("x", 750)
            .attr("stroke", "red")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .text("Fossil: Red");
        container_g.append("text")
            .attr("y", 105)
            .attr("x", 750)
            .attr("stroke", "green")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .text("Nuclear: Green");

        container_g.append("text")
            .attr("y", 120)
            .attr("x", 750)
            .attr("stroke", "blue")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .text("Renewable: Blue");

        const colors = new Map();
        colors.set("Fossil", "red");
        colors.set("Nuclear", "green");
        colors.set("Renewables", "blue");

        xScale.domain(data.map(function(d){
            return d.Year;
        }));

        const generation = data.map(function(d){
            return d.Generation;
        });

        // yScale.domain([d3.min(generation), d3.max(generation)]);
        yScale.domain([0, d3.max(generation)]);

        const change = data.map(function(d){
            return d.Change;
        });

        rScale.domain([d3.min(change), d3.max(change)]);

        container_g.append("g")
            .attr("transform", "translate(20, 100)")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .style("cx", function(d){
                return xScale(d.Year)
            })
            .style("cy", function(d){
                return yScale(d.Generation);
            })
            .style("r", function(d){
                return rScale(d.Change)
            })
            .style("fill", function(d){
                return colors.get(d.Source);
            })
            .style("fill-opacity", "0.7")
            .style("stroke", "black");


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
            .text("Year");

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
            .text("Power Generated(TWh)");
    })
}

main();