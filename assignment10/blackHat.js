function converter(d){
    d.Below_Minimum_Wage = +d.Below_Minimum_Wage
}
function main(){
    let width = 550;
    let height = 300;

    let svg = d3.select("#black").append("svg")
        .attr("width", width)
        .attr("height", height);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 50 + ", " + 0 + ")");

    d3.json("us-states.json").then(function(json) {
        d3.csv("Minimum Wage.csv", converter).then( function(data){
            // const expenses = data.map(function(d){
            //     return {value:+d.housingCost, coordinates:[+d.longitude, +d.latitude]};
            // });
            //
            const wages = new Map();
            for(let i=0; i<data.length; i++){
                wages.set(data[i].State.toLowerCase(), data[i].Below_Minimum_Wage);
            }
            let extent = d3.extent(data.map(function(d){
                return d.Below_Minimum_Wage;
            }));


            // let colorScale = d3.scaleSequential(d3.interpolateRainbow).domain(extent);

            let colorScale = d3.scaleThreshold()
            .range(["#e6261f","#eb7532","#f7d038","#a3e048","#49da9a","#34bbe6","#4355db","#d23be7"])
            .domain([0.005,0.01,0.015,0.02,0.025,0.035,0.075,0.08]);


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
                .style("stroke", "white")
                .style("stroke-width", 1);
        })
    });
}

main();