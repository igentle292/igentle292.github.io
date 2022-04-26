function converter(d){
    d.Below_Minimum_Wage = +d.Below_Minimum_Wage
    return d;
}
function main(){
    let width = 550;
    let height = 300;

    let svg = d3.select("#white").append("svg")
        .attr("width", width)
        .attr("height", height);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 50 + ", " + 0 + ")");

    d3.json("us-states.json").then(function(json) {
        d3.csv("Minimum Wage.csv", converter).then( function(data){
            const wages = new Map();
            for(let i=0; i<data.length; i++){

                wages.set(data[i].State.toLowerCase(), data[i].Below_Minimum_Wage);
            }
            let extent = d3.extent(data.map(function(d){
                return d.Below_Minimum_Wage;
            }));

            const colors = d3.schemePurples[6];

            let colorScale = d3.scaleThreshold().range(colors).domain([0.005,0.01,0.015,0.02,0.025,0.03]);

            let projection = d3.geoAlbersUsa().scale(600).translate([225, 150]);
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
                .style("fill", function(d){
                    return colorScale(wages.get(d.properties.name.toLowerCase()));
                })
                .style("stroke", "black")
                .style("stroke-width", 1);

            let legend = d3.legendColor()
                .shape("rect")
                .title("Percent of population paid below federal minimum wage")
                .titleWidth(100)
                .scale(colorScale)
                .labels(d3.legendHelpers.thresholdLabels)
                .labelFormat(d3.format(".1%"));

            svg.append("g")
                .attr("id", "legend")
                .attr("transform", "translate(440,25)")
                .attr("class", "circle")
                .attr("stroke", "black")
                .attr("font-family", "sans-serif")
                .attr("font-size", 12)
                .call(legend);

            d3.select("#legend").raise()
        })
    });
}

main();