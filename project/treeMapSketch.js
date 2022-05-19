function main() {
    let margin = 100;
    let width = 1000 - margin;
    let height = 600 - margin;

    let svg = d3.select("#tree").append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 0 + ", " + 100 + ")");

    let colorScale = d3.scaleOrdinal().range(d3.schemeCategory10);

    //I use a JSON file because it is the simplest way to create a tree map
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
                //gets the sum of all values, in order to scale the subsections
            }).sort(function(x,y){
                return y.value - x.value;
                //sorts the values in descending order
            });

            let regions = data.children.map(function(d){
                return d.name;
            });
            //used to ensure a diverse color scheme
            regions.push("filler");

            colorScale.domain(regions);

            let treemap = d3.treemap()
                .size([width, height])
                .padding(2);

            treemap(rootNode);

            //https://d3-graph-gallery.com/graph/treemap_json.html

            //root.leaves contains the information you need for each sections,
            //allowing me to get the data for each and create the rectangles
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
                        .attr("x", ((+d.x0 + d.x1)/2))  //places the tooltip in the middle of the rectangle
                        .attr("y", 100 + ((+d.y0 + d.y1)/2))
                        .attr("text-anchor", "middle")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "15px")
                        .attr("font-weight", "bold")
                        .attr("fill", "black")
                        .text(d.data.name + " " + d.value);
                        //places the name and value on the middle of the corresponding rectangle
                })
                .on("mouseout", function() {
                    d3.select("#tooltip").remove();
                    //removes the tooltip when necessary
                });

            container_g.selectAll("text")
                .data(rootNode.leaves())
                .enter()
                .append("text")
                .attr("x", function(d){ return d.x0+5})
                .attr("y", function(d){ return d.y0+20})
                .text(function(d){
                        return d.data.parent;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px")
                .attr("fill", "black")
                //displays the region name in each rectangle in the top right corner
        })
}

main();