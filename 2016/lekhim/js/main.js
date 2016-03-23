// var basic = new Datamap({
//     element: document.getElementById("map")
// });





function javascript_abort() {
    throw new Error('This is not an error. This is just to abort javascript');
};



var bucketLimits = [1000, 2000, 5000, 10000, 20000, 30000, 40000, 50000];

console.log(bucketLimits[3]);


var colorschemeOfThisMap = colorbrewer.RdYlBu[9];


// If Coloring order is running in wrong direction uncomment the following
//	colorschemeOfThisMap.reverse();



d3.csv("gdpPerCapita2011_PWTrgdpe.csv", function(error, csvdata1) {

    for (var i = 0; i < csvdata1.length; i++) {
        csvdata1[i].fillKey = {};

        if (csvdata1[i].gdppercapita < bucketLimits[0]) { csvdata1[i].fillKey = '0'; }

        if (csvdata1[i].gdppercapita >= bucketLimits[0] && csvdata1[i].gdppercapita < bucketLimits[1]) { csvdata1[i].fillKey = '1'; }
        if (csvdata1[i].gdppercapita >= bucketLimits[1] && csvdata1[i].gdppercapita < bucketLimits[2]) { csvdata1[i].fillKey = '2'; }
        if (csvdata1[i].gdppercapita >= bucketLimits[2] && csvdata1[i].gdppercapita < bucketLimits[3]) { csvdata1[i].fillKey = '3'; }
        if (csvdata1[i].gdppercapita >= bucketLimits[3] && csvdata1[i].gdppercapita < bucketLimits[4]) { csvdata1[i].fillKey = '4'; }
        if (csvdata1[i].gdppercapita >= bucketLimits[4] && csvdata1[i].gdppercapita < bucketLimits[5]) { csvdata1[i].fillKey = '5'; }
        if (csvdata1[i].gdppercapita >= bucketLimits[5] && csvdata1[i].gdppercapita < bucketLimits[6]) { csvdata1[i].fillKey = '6'; }
        if (csvdata1[i].gdppercapita >= bucketLimits[6] && csvdata1[i].gdppercapita < bucketLimits[7]) { csvdata1[i].fillKey = '7'; }
        if (csvdata1[i].gdppercapita >= bucketLimits[7]) { csvdata1[i].fillKey = '8'; }



        csvdata1[csvdata1[i].ISO] = csvdata1[i];
        //console.log(csvdata1[i]);
        delete csvdata1[i].ISO;
        delete csvdata1[i];
    }
    myMap1.updateChoropleth(csvdata1);

});




var myMap1 = new Datamap(

    {
        scope: 'world',
        projection: 'equirectangular',
        element: document.getElementById('map'),
        // projection: 'mercator',

        geographyConfig: {
            borderWidth: 0.2,
            borderColor: '#4F4F4F',
            /*  highlightBorderColor: 'black',
								highlightBorderWidth: 0.5,
								highlightFillColor: '#FFEC38',
						 
								highlightOnHover: true,
								popupOnHover: true, //disable the popup while hovering
	*/
            popupTemplate: function(geography, csvdata1) {
                if (!csvdata1) return; // makes sure that the tooltip is shown only if there is data 
                return '<div class="hoverinfo">' + geography.properties.name + '<br> GDP per Capita: <strong>' + csvdata1.gdppercapita + '</strong> 2005 US Dollars';
            },
        },
        fills: {
            '0': colorschemeOfThisMap[0],
            '1': colorschemeOfThisMap[1],
            '2': colorschemeOfThisMap[2],
            '3': colorschemeOfThisMap[3],
            '4': colorschemeOfThisMap[4],
            '5': colorschemeOfThisMap[5],
            '6': colorschemeOfThisMap[6],
            '7': colorschemeOfThisMap[7],
            '8': colorschemeOfThisMap[8],
            defaultFill: 'grey'
        },
        data: {}


    });



// Max Plugin
//plugin added by me to have the legend vertically
function addLegendmaxstyle(layer, data, options) {
    data = data || {};
    if (!this.options.fills) {
        return;
    }

    var html = '<dl>';
    var label = '';
    if (data.legendTitle) {
        html = '<h4>' + data.legendTitle + '</h4>' + html;
    }

    for (var fillKey in this.options.fills) {

        if (fillKey === 'defaultFill') {
            if (!data.defaultFillName) {
                continue;
            }
            label = data.defaultFillName;
        } else {
            if (data.labels && data.labels[fillKey]) {
                label = data.labels[fillKey];
            } else {

                // Changed by Max //
                label = '' + fillKey;
                html += '<dd style="background-color:' + this.options.fills[fillKey] + '">&nbsp;</dd>';
                html += '<dt>' + label + '</dt>' + '<br>';

            }
        }
    }
    html += '</dl>';

    var hoverover = d3.select(this.options.element).append('div')
        .attr('class', 'datamaps-legend')
        .html(html);
}


//Legende anzeigen  
myMap1.addPlugin("mylegend", addLegendmaxstyle);
myMap1.mylegend({ legendTitle: "Level of GDP per Capita" })











/*  TITLE                      */
/* --------------------------- */

var TitleCanvas = d3.select("#TitleContainer")


TitleCanvas
    .append("text")
    .text("Real PPP-adjusted GDP per capita in 2011")
    .attr("x", 75)
    .attr("y", 18)
    .attr('class', 'mainTitleText');



TitleCanvas.append("svg:image")
    .attr('x', 3)
    .attr('y', 1)
    .attr('width', 65)
    .attr('height', 30)
    .attr("xlink:href", "../../maxstyle_for_d3/EPLogo.png");







/*--------------------------------------------------*/
/*    				  Credits    					*/
/*--------------------------------------------------*/

var creditsCanvas = d3.select("#CreditsContainer")
var xorigin = 8;
var yorigin = 1;


/*1. Zeile*/
creditsCanvas
    .append("text")
    .text("The author Max Roser licensed this visualisation under a")
    .attr("x", xorigin + 0)
    .attr("y", yorigin + 10)
    .attr("id", 'erstesTextstuck').attr('class', 'creditsText');
var erstesTextstuckLange = document.getElementById('erstesTextstuck').getComputedTextLength();

creditsCanvas.append("svg:a")
    .attr("xlink:href", "http://creativecommons.org/licenses/by-sa/4.0/deed.en_US")
    .attr("target", "_blank")
    .append("svg:text")
    .attr("x", xorigin + erstesTextstuckLange + 3)
    .attr("y", yorigin + 10)
    .attr('class', 'creditsLink').attr("id", 'zweitesTextstuck')
    .text("CC BY-SA license");
var zweitesTextstuckLange = document.getElementById('zweitesTextstuck').getComputedTextLength();


creditsCanvas
    .append("text")
    .text(". You are welcome to share but please refer to its source where you")
    .attr("x", xorigin + erstesTextstuckLange + 3 + zweitesTextstuckLange + 1)
    .attr("y", yorigin + 10)
    .attr("id", 'drittesTextstuck').attr('class', 'creditsText');
var drittesTextstuckLange = document.getElementById('drittesTextstuck').getComputedTextLength();


/*1. oder 2. Zeile*/

var TextViertesTextstuck = creditsCanvas
    .append("text")
    .text("find more information:")
    .attr("id", 'viertesTextstuck')
    .attr('class', 'creditsText');
var viertesTextstuckLange = document.getElementById('viertesTextstuck').getComputedTextLength();

var TextFunftesTextstuck = creditsCanvas.append("svg:a")
    .attr("xlink:href", "www.ourworldindata.org")
    .attr("target", "_blank")
    .append("svg:text")
    .attr('class', 'creditsLink')
    .text("www.ourworldindata.org")
    .attr("id", 'funftesTextstuck');
var funftesTextstuckLange = document.getElementById('funftesTextstuck').getComputedTextLength();

var creditsCanvasWidth = parseInt(creditsCanvas.style('width'));
var LongTextWidth = parseInt(xorigin + erstesTextstuckLange + 3 + zweitesTextstuckLange + 1 + drittesTextstuckLange + 3 + viertesTextstuckLange + 3 + funftesTextstuckLange);

if (creditsCanvasWidth > LongTextWidth) {
    TextViertesTextstuck
        .attr("x", xorigin + erstesTextstuckLange + 3 + zweitesTextstuckLange + 1 + drittesTextstuckLange + 3)
        .attr("y", yorigin + 10);
} else {
    TextViertesTextstuck
        .attr("x", xorigin + 0)
        .attr("y", yorigin + 21);
}


if (creditsCanvasWidth > LongTextWidth) {
    TextFunftesTextstuck
        .attr("x", xorigin + erstesTextstuckLange + 3 + zweitesTextstuckLange + 1 + drittesTextstuckLange + 3 + viertesTextstuckLange + 3)
        .attr("y", yorigin + 10);
} else {
    TextFunftesTextstuck
        .attr("x", xorigin + 102)
        .attr("y", yorigin + 21);
}



/*3. Zeile*/
creditsCanvas
    .append("text")
    .text("Data source: Penn World Table 8.0")
    .attr("x", xorigin + 0)
    .attr("y", yorigin + 32)
    .attr('class', 'creditsText');




/* ------- end credits ------ */
