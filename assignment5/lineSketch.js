//https://riptutorial.com/d3-js/example/18426/loading-data-from-csv-files
function converter(d){
    d.Generation = +d.Generation;
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

    d3.csv("United Kingdom Power.csv", converter).then(data => {
        container_g.append("text")
            .attr("y", 50)
            .attr("x", 250)
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Nuclear Power generated in the UK, 2000-2020");

        xScale.domain(data.map(function(d){
            return d.Year;
        }));

        const generation = data.map(function(d){
            if(d.Source === "Nuclear") {
                return d.Generation;
            }
            else{}
        }).filter(function(d){  //https://www.techiedelight.com/remove-falsy-values-from-an-array-in-javascript/
            return d !== undefined;     //removing any unwanted values from the dataset
        });

        const years = data.map(function(d){
            if(d.Source === "Nuclear") {
                return d.Year;
            }
            else{}
        }).filter(function(d){  //https://www.techiedelight.com/remove-falsy-values-from-an-array-in-javascript/
            return d !== undefined;
        });
        yScale.domain([0, d3.max(generation)]);

        const newData = generation.map(function(g, i){  //formatting the data so i can use d3.line()
            return [xScale(years[i]), yScale(g)];
        });

        //https://observablehq.com/@d3/d3-line
        let line = d3.line();

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

        container_g.append("g")
            .attr("transform", "translate(20, 100)")
            .append("path")
            .attr("d", line(newData))
            .attr("stroke", "green")
            .attr("stroke-width", 2)
            .attr("fill-opacity", 0);


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