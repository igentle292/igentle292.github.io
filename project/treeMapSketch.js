function main() {
    let margin = 100;
    let width = 1000 - margin;
    let height = 600 - margin;

    let svg = d3.select("body").append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 0 + ", " + 100 + ")");

    let colorScale = d3.scaleOrdinal().range(d3.schemeCategory10);

    d3.json("data.json")
        .then(data => {
            svg.append("text")
                .attr("y", 50)
                .attr("x", 100)
                .attr("stroke", "black")
                .attr("font-family", "sans-serif")
                .text("Countries of Origin for Top 100 Super Mario 64 Speedrunners");

            let rootNode = d3.hierarchy(data).sum(function(d){
                return d.value;
            }).sort(function(x,y){
                return y.value - x.value;
            });

            let regions = data.children.map(function(d){
                return d.name;
            });
            regions.push("filler");

            colorScale.domain(regions);

            let treemap = d3.treemap()
                .size([width, height])
                .padding(2);

            treemap(rootNode);

            //https://d3-graph-gallery.com/graph/treemap_json.html

            container_g.selectAll("rect")
                .data(rootNode.leaves())
                .enter()
                .append("rect")
                .attr('x', function (d) { return d.x0; })
                .attr('y', function (d) { return d.y0; })
                .attr("id", function(d){
                    return d.data.name;
                })
                .attr('width', function (d) { return d.x1 - d.x0; })
                .attr('height', function (d) { return d.y1 - d.y0; })
                .style("stroke", "black")
                .style("fill", function(d){
                    return colorScale(d.parent);
                })
                .on("mouseover", function(elem, d){
                    svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", ((+d.x0 + d.x1)/2))
                        .attr("y", 100 + ((+d.y0 + d.y1)/2))
                        .attr("text-anchor", "middle")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "15px")
                        .attr("font-weight", "bold")
                        .attr("fill", "black")
                        .text(d.data.name + " " + d.value);
                })
                .on("mouseout", function() {
                    d3.select("#tooltip").remove();
                });

            container_g.selectAll("text")
                .data(rootNode.leaves())
                .enter()
                .append("text")
                .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
                .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
                .text(function(d){
                        return d.data.parent;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px")
                .attr("fill", "black")

            container_g.selectAll("text")
                .data(rootNode.leaves())
                .enter()
                .append("text")
                .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
                .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
                .attr("dy", 10)
                .text(function(d){
                    if(d.data.value < 2){
                        return "";
                    } else {
                        return d.data.name;
                    }
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px")
                .attr("fill", "black")

        })
}

main();