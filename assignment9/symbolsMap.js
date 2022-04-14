function main(){
    let margin = 0;
    let width = 1025 - margin;
    let height = 600 - margin;

    let svg = d3.select("body").append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 100 + ", " + 0 + ")");

    d3.json("us-states.json").then(function(json) {
        d3.csv("expensive-states.csv").then( function(data){
            const expenses = data.map(function(d){
                return {cost:+d.housingCost, coordinates:[+d.longitude, +d.latitude]};
            });
            let extent = d3.extent(data.map(function(d){
                return +d.housingCost;
            }));

            let sizeScale = d3.scaleLinear().range([5,40]).domain(extent);

            let projection = d3.geoAlbersUsa();
            let path = d3.geoPath(projection);

            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", function(d){
                    return path(d);
                })
                .attr("id", function(d){
                    return d.properties.name.toLowerCase();
                })
                .style("fill", "grey")
                .style("stroke", "white")
                .style("stroke-width", 1);

            svg.selectAll("circle")
                .data(expenses)
                .enter()
                .append("circle")
                .attr("class", "circle")
                .attr("cx", function(d){
                    return projection(d.coordinates)[0];
                })
                .attr("cy", function(d){
                    return projection(d.coordinates)[1];
                })
                .attr("r", function(d){
                    return sizeScale(d.cost);
                })
                .style("opacity", 0.75);

            let legend = d3.legendSize()
                // .useClass(true)
                .shape("rect")
                .title("Average cost of housing in the USA")
                .titleWidth(125)
                .shape("circle")
                .shapePadding(15)
                .scale(sizeScale);

            container_g.append("g")
                .attr("transform", "translate(775,50 )")
                .attr("class", "circle")
                .attr("stroke", "black")
                .attr("font-family", "sans-serif")
                .call(legend);
        })
    });
}

main();