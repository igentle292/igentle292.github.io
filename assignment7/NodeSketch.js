function converter(d){
    d.start = +d.start;
    d.end = +d.end;
    return d;
}

function main(){
    let margin = 0;
    let width = 600 - margin;
    let height = 600 - margin;

    let svg = d3.select("body").append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 100 + ", " + 0 + ")");

    let color = d3.scaleOrdinal(d3.schemeCategory10);

    d3.csv("dolphins.csv", converter).then(data => {
        container_g.append("text")
            .attr("y", 50)
            .attr("x", -50)
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Relationships between Bottlenose Dolphins");

        let dataNames = [{name: "nope"}].concat(data.map(function(d){
            return {name: d.names};
        }).filter(function(x){  //https://www.techiedelight.com/remove-falsy-values-from-an-array-in-javascript/
            return x !== undefined;
        }));

        let dataEdges = data.map(function(d){
            return {source: d.start, target: d.end};
        });

        var force = d3.forceSimulation(dataNames)
            .force("charge", d3.forceManyBody().strength(-20))
            .force("link", d3.forceLink(dataEdges).distance(40))
            .force("center", d3.forceCenter().x(width/2).y(height/2));

        var edges = svg.selectAll("line")
            .data(dataEdges)
            .enter()
            .append("line")
            .style("stroke", "#888")
            .style("stroke-width", 1);

        var nodes = svg.selectAll("circle")
            .data(dataNames)
            .enter()
            .append("circle")
            .attr("r", 5)
            .style("stroke", "black")
            .style("fill", function(d, i){
                return color(i);
            });

        force.on("tick", function() {

            edges.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            nodes.attr("cx", function(d) {
                if(d.x>=width){
                    return width-5;
                } else if(d.x<=0){
                    return 5;
                }
                return d.x
            })

                .attr("cy", function(d) {
                    if(d.y>=height){
                        return height-5;
                    } else if(d.y<=0){
                        return 5;
                    }
                    return d.y
                });

        });
    })
}

main();