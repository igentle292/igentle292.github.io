//https://riptutorial.com/d3-js/example/18426/loading-data-from-csv-files
function converter(d){
    d.Generation = +d.Generation;
    return d;
}

function main(){
    let margin = 150;
    let width = 800 - margin;
    let height = 600 - margin;

    let svg = d3.select("body").append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 100 + ", " + 0 + ")");

    let fossilXScale = d3.scaleLinear().range([0, width * (1/3)]);
    let fossilYScale = d3.scaleLinear().range([height, height*(2/3)]);

    let nuclearXScale = d3.scaleLinear().range([20 + width * (1/3), 20 +width * (2/3)]);
    let nuclearYScale = d3.scaleLinear().range([height*(2/3) - 25, height*(1/3) - 25]);

    let renewableXScale = d3.scaleLinear().range([40 + width * (2/3), 40 + width]);
    let renewableYScale = d3.scaleLinear().range([height*(1/3) - 50, 0 - 50]);

    d3.csv("United Kingdom Power.csv", converter).then(data => {
        container_g.append("text")
            .attr("y", 25)
            .attr("x", 250)
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Power generated in the UK, 2000-2020");

        const fossilPower = [];
        const renewablePower = [];
        const nuclearPower = data.map(function(d){
            if(d.Source === "Nuclear") {
                return d.Generation;
            }
            else if(d.Source === "Fossil"){
                fossilPower.push(d.Generation);
            } else{
                renewablePower.push(d.Generation);
            }
        }).filter(function(d){  //https://www.techiedelight.com/remove-falsy-values-from-an-array-in-javascript/
            return d !== undefined;     //removing any unwanted values from the dataset
        });

        const powers = fossilPower.map(function(d, i){      //storing variables in a convenient way
            return {fossil:d, renewable:renewablePower[i], nuclear:nuclearPower[i]}
        });

        fossilXScale.domain([d3.min(fossilPower), d3.max(fossilPower)]);
        fossilYScale.domain([d3.min(fossilPower), d3.max(fossilPower)]);

        nuclearXScale.domain([d3.min(nuclearPower), d3.max(nuclearPower)]);
        nuclearYScale.domain([d3.min(nuclearPower), d3.max(nuclearPower)]);

        renewableXScale.domain([d3.min(renewablePower), d3.max(renewablePower)]);
        renewableYScale.domain([d3.min(renewablePower), d3.max(renewablePower)]);

        container_g.append("g")
            .attr("transform", "translate(0, " + 100 + ")")
            .selectAll("circle")
            .data(powers)
            .enter()
            .append("circle")
            .style("r", 5)
            .style("fill", "red")
            .style("stroke", "black")
            .style("cx", function(d) {
                return fossilXScale(d.fossil);
            })
            .style("cy", function(d) {
                return fossilYScale(d.fossil);
            });

        container_g.append("g")
            .attr("transform", "translate(0, " + 100 + ")")
            .selectAll("circle")
            .data(powers)
            .enter()
            .append("circle")
            .style("r", 5)
            .style("fill", "yellow")
            .style("stroke", "black")
            .style("cx", function(d) {
                return fossilXScale(d.fossil);
            })
            .style("cy", function(d) {
                return nuclearYScale(d.nuclear);
            });

        container_g.append("g")
            .attr("transform", "translate(0, " + 100 + ")")
            .selectAll("circle")
            .data(powers)
            .enter()
            .append("circle")
            .style("r", 5)
            .style("fill", "purple")
            .style("stroke", "black")
            .style("cx", function(d) {
                return fossilXScale(d.fossil);
            })
            .style("cy", function(d) {
                return renewableYScale(d.renewable);
            });

        container_g.append("g")
            .attr("transform", "translate(0, " + 100 + ")")
            .selectAll("circle")
            .data(powers)
            .enter()
            .append("circle")
            .style("r", 5)
            .style("fill", "yellow")
            .style("stroke", "black")
            .style("cx", function(d) {
                return nuclearXScale(d.nuclear);
            })
            .style("cy", function(d) {
                return fossilYScale(d.fossil);
            });

        container_g.append("g")
            .attr("transform", "translate(0, " + 100 + ")")
            .selectAll("circle")
            .data(powers)
            .enter()
            .append("circle")
            .style("r", 5)
            .style("fill", "green")
            .style("stroke", "black")
            .style("cx", function(d) {
                return nuclearXScale(d.nuclear);
            })
            .style("cy", function(d) {
                return nuclearYScale(d.nuclear);
            });

        container_g.append("g")
            .attr("transform", "translate(0, " + 100 + ")")
            .selectAll("circle")
            .data(powers)
            .enter()
            .append("circle")
            .style("r", 5)
            .style("fill", "cyan")
            .style("stroke", "black")
            .style("cx", function(d) {
                return nuclearXScale(d.nuclear);
            })
            .style("cy", function(d) {
                return renewableYScale(d.renewable);
            });

        container_g.append("g")
            .attr("transform", "translate(0, " + 100 + ")")
            .selectAll("circle")
            .data(powers)
            .enter()
            .append("circle")
            .style("r", 5)
            .style("fill", "purple")
            .style("stroke", "black")
            .style("cx", function(d) {
                return renewableXScale(d.renewable);
            })
            .style("cy", function(d) {
                return fossilYScale(d.fossil);
            });

        container_g.append("g")
            .attr("transform", "translate(0, " + 100 + ")")
            .selectAll("circle")
            .data(powers)
            .enter()
            .append("circle")
            .style("r", 5)
            .style("fill", "cyan")
            .style("stroke", "black")
            .style("cx", function(d) {
                return renewableXScale(d.renewable);
            })
            .style("cy", function(d) {
                return nuclearYScale(d.nuclear);
            });

        container_g.append("g")
            .attr("transform", "translate(0, " + 100 + ")")
            .selectAll("circle")
            .data(powers)
            .enter()
            .append("circle")
            .style("r", 5)
            .style("fill", "blue")
            .style("stroke", "black")
            .style("cx", function(d) {
                return renewableXScale(d.renewable);
            })
            .style("cy", function(d) {
                return renewableYScale(d.renewable);
            });

        container_g.append("line")
            .attr("x1", width * (1/3))
            .attr("x2", width * (1/3))
            .attr("y1", 50)
            .attr("y2", 550)
            .attr("stroke", "black");

        container_g.append("line")
            .attr("x1", 20+width * (1/3))
            .attr("x2", 20+width * (1/3))
            .attr("y1", 50)
            .attr("y2", 550)
            .attr("stroke", "black");

        container_g.append("line")
            .attr("x1", 20+width * (2/3))
            .attr("x2", 20+width * (2/3))
            .attr("y1", 50)
            .attr("y2", 550)
            .attr("stroke", "black");

        container_g.append("line")
            .attr("x1", 40+width * (2/3))
            .attr("x2", 40+width * (2/3))
            .attr("y1", 50)
            .attr("y2", 550)
            .attr("stroke", "black");

        container_g.append("line")
            .attr("x1", 40+width)
            .attr("x2", 40+width)
            .attr("y1", 50)
            .attr("y2", 550)
            .attr("stroke", "black");

        container_g.append("line")
            .attr("x1", 0)
            .attr("x2", 690)
            .attr("y1", height*(1/3) - 100)
            .attr("y2", height*(1/3) - 100)
            .attr("stroke", "black");

        container_g.append("line")
            .attr("x1", 0)
            .attr("x2", 690)
            .attr("y1", height*(2/3) - 100)
            .attr("y2", height*(2/3) - 100)
            .attr("stroke", "black");

        container_g.append("line")
            .attr("x1", 0)
            .attr("x2", 690)
            .attr("y1", height*(2/3) - 75)
            .attr("y2", height*(2/3) - 75)
            .attr("stroke", "black");

        container_g.append("line")
            .attr("x1", 0)
            .attr("x2", 690)
            .attr("y1", height - 75)
            .attr("y2", height - 75)
            .attr("stroke", "black");

        container_g.append("line")
            .attr("x1", 0)
            .attr("x2", 690)
            .attr("y1", height - 50)
            .attr("y2", height - 50)
            .attr("stroke", "black");


        //Code from lecture
        container_g.append("g")
            .attr("transform", "translate(0, " + 550 + ")")
            .call(d3.axisBottom(fossilXScale)
                // .tickSize(-500)
                .tickFormat(function(d){
                return d;
            }))
            .append("text")
            .attr("y", 45)
            .attr("x",100)
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("Fossil Power(TWh)");

        // Display the Y-axis
        container_g.append("g")
            .attr("transform", "translate(0, 100)")
            .call(d3.axisLeft(fossilYScale)
                // .tickSize(-690)
                .tickFormat(function(d) {
                return d;
            }).ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x", -300)
            .attr("dy", "-5.1em")
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("Fossil Power(TWh)");

        container_g.append("g")
            .attr("transform", "translate(0, " + 550 + ")")
            .call(d3.axisBottom(nuclearXScale)
                // .tickSize(-500)
                .tickFormat(function(d){
                return d;
            }))
            .append("text")
            .attr("y", 45)
            .attr("x", 350)
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("Nuclear Power(TWh)");

        // Display the Y-axis
        container_g.append("g")
            .attr("transform", "translate(0, 100)")
            .call(d3.axisLeft(nuclearYScale)
                // .tickSize(-690)
                .tickFormat(function(d) {
                return d;
            }).ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x", -140)
            .attr("dy", "-5.1em")
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("Nuclear Power(TWh)");

        container_g.append("g")
            .attr("transform", "translate(0, " + 550 + ")")
            .call(d3.axisBottom(renewableXScale)
                // .tickSize(-500)
            .tickFormat(function(d){
                return d;
            }))
            .append("text")
            .attr("y", 45)
            .attr("x", 575)
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("Renewable Power(TWh)");

        // Display the Y-axis
        container_g.append("g")
            .attr("transform", "translate(0, 100)")
            .call(d3.axisLeft(renewableYScale)
                // .tickSize(-690)
                .tickFormat(function(d) {
                return d;
            }).ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x", 50)
            .attr("dy", "-5.1em")
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("Renewable Power(TWh)");
    })
}

main();