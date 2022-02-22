//https://riptutorial.com/d3-js/example/18426/loading-data-from-csv-files
function converter(d){
    d.Total_Fouls_Called = + d.Total_Fouls_Called;
    return d;
}

function myMedian(arr){
    let median;
    let top = arr.length - 1;
    let bottom = 0;
    if(arr.length % 2 === 0){
        let lower = Math.floor((top + bottom) / 2);
        let upper = Math.ceil((top + bottom) / 2);
        median = (Number(arr[upper]) + Number(arr[lower])) / 2;
    } else{
        median = (arr[(top+ bottom)/ 2]) ;
    }
    return median;
}

function firstQuart(arr){
    let firstQuartile;
    let top = arr.length - 1;
    let bottom = 0;
    if(arr.length % 4 === 0){
        let lower = Math.floor((top + bottom) / 4);
        let upper = Math.ceil((top + bottom) / 4);
        firstQuartile = (Number(arr[upper]) + Number(arr[lower])) / 2;
    } else{
        firstQuartile = (arr[(top + bottom) / 4]);
    }
    return firstQuartile;
}

function thirdQuart(arr){
    let thirdQuartile;
    let top = arr.length - 1;
    let bottom = 0;
    if(arr.length % 4 === 0){
        let lower = Math.floor(3 *((top + bottom) / 4) );
        let upper = Math.ceil(3 *((top + bottom) / 4));
        thirdQuartile = (Number(arr[upper]) + Number(arr[lower])) / 2;
    } else{
        thirdQuartile = (arr[3*((top + bottom) / 4)]);
    }
    return thirdQuartile;
}

function compareNumbers(x, y){
    return x - y; //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
}

function main(){
    let margin = 115;
    let width = 800 - margin;
    let height = 600 - margin;

    let svg = d3.select("body").append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin);

    let container_g = svg.append("g")
        .attr("transform",
            "translate(" + 100 + ", " + 0 + ")");

    let xScale = d3.scaleLinear().range([0, width]);

    d3.csv("RefereeStats.csv", converter).then(data => {
        container_g.append("text")
            .attr("font-family", "sans-serif")
            .attr("y", 45)
            .attr("x", 80)
            .attr("stroke", "black")
            .text("Total fouls called by each Referee in the NBA Regular Season, 2016-20");

        let fouls = data.map(function(d) {
            return d.Total_Fouls_Called})

        fouls.sort(compareNumbers);

        xScale.domain([0,5000]);

        let max = d3.max(fouls);    //line
        let min = d3.min(fouls);    //line
        console.log(min);
        let firstQuartile = firstQuart(fouls); //rect to median
        let thirdQuartile = thirdQuart(fouls); //rect from median
        let median = myMedian(fouls);

        // let inner_container = container_g.append("g");

        container_g.append("line")
            .attr("x1", xScale(min))
            .attr("x2", xScale(min))
            .attr("y1", 150)
            .attr("y2", 200)
            .style("stroke", "black");

        container_g.append("line")
            .attr("y1", 150)
            .attr("y2", 200)
            .attr("x1", xScale(max))
            .attr("x2", xScale(max))
            .style("stroke", "black");

        container_g.append("line")
            .attr("y1", 175)
            .attr("y2", 175)
            .attr("x1", xScale(min))
            .attr("x2", xScale(max))
            .style("stroke", "black");

        container_g.append("rect")
            .style("x", xScale(firstQuartile))
            .style("y", 140)
            .style("width", xScale(median - firstQuartile))
            .style("height", 70)
            .style("stroke", "black")
            .style("fill", "greenyellow");

        container_g.append("rect")
            .style("x", xScale(median))
            .style("y", 140)
            .style("width", xScale(thirdQuartile - median))
            .style("height", 70)
            .style("stroke", "black")
            .style("fill", "greenyellow");

        container_g.append("g")
            .attr("transform", "translate(0, " + 300 + ")")
            .call(d3.axisBottom(xScale).tickFormat(function(d){
                return d;
            }))
            .append("text")
            .attr("y", 45)
            .attr("x", 350)
            .attr("stroke", "black")
            .attr("fill", "black")
            .attr("font-size", 14)
            .text("Fouls Called by each Referee");
    })
}

main();