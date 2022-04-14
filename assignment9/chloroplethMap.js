function main(){
    let width = 1025;
    let height = 600;

    let svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 100 + ", " + 0 + ")");

    d3.json("geojson.json").then(function(json) {
        d3.csv("Education.csv").then( function(data){
            const education = new Map();
            for(let i=0; i<data.length; i++){
                education.set(data[i].FIPS_Code, (+data[i].Bachelor_or_more / 100));
            }

            let colorScale = d3.scaleThreshold().range(d3.schemeReds[8]).domain([0.1,0.20,0.30,0.40,0.50,0.60,0.70]);

            let path = d3.geoPath(d3.geoAlbersUsa());

            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", function(d){
                    return path(d);
                })
                .attr("id", function(d){
                    return d.properties.STATE.concat(d.properties.COUNTY);
                })
                .style("stroke", "black")
                .style("stroke-width", 1)
                .style("fill", function(d){
                    let value = colorScale(+education.get(d.properties.STATE.concat(d.properties.COUNTY)));
                    if(value == null){
                        return "red";
                    } else {
                        return value;
                    }
                });

            let legend = d3.legendColor()
                .shape("rect")
                .title("Percent of adults with a Bachelor's Degree or higher")
                .labels(d3.legendHelpers.thresholdLabels)
                .titleWidth(125)
                .labelFormat(".0%")
                .labelDelimiter("-")
                .scale(colorScale);

            container_g.append("g")
                .attr("transform", "translate(775,50 )")
                .attr("stroke", "black")
                .attr("font-family", "sans-serif")
                .call(legend);
        })
    });
}

main();