// 数字判断
function _is_numeric(num, cond) {
	if ( String(num).search(/^[+-]?[0-9]+$/) < 0) {
		return false;
	}
	if (cond != null) {
		for (key in cond) {
			if (!eval(num +cond[key])) {
				return false;
			}
		}
	}
	return true;
}
/*
饼图，无子分类。 
data = [
    ['类别', 10(百分比)], 
    []
]
*/
var chart;
function _graph_pie(targetId, title, subtitle, data) {
    chart = new Highcharts.Chart({
        chart: {
            renderTo: targetId,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        tooltip: {
            formatter: function() {
//                return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
     	        return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        return this.y > 1 ? '<b>'+ this.point.name +':</b> '+ this.y +'%'  : null;
//                        return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            data: data
        }]
    });
}

/*
 饼图，带子分类。
data = [
  	{	y: 10(大类百分比), 
  		color: colors[0],
  		drilldown: {
  			categories: ['子分类名称1','子分类名称2','子分类名称3'],
  			data: [ 10, 30, 60(子分类百分比) ],
  			color: colors[0]
  	}
  },
  {
    
  }
]
*/
function _graph_pie_with_sub(targetId, title, subtitle, categories, data) {
	var colors = Highcharts.getOptions().colors;
    var mainData = [];
    var subData = [];
    for (var i = 0; i < data.length; i++) {

        // add main data
        mainData.push({
            name: categories[i],
            y: data[i].y,
            color: colors[i]
        });

        // add sub data
        for (var j = 0; j < data[i].drilldown.data.length; j++) {
            var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
            subData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(colors[i]).brighten(brightness).get()
            });
        }
    }

    // Create the chart
    chart = new Highcharts.Chart({
        chart: {
            renderTo: targetId,
            type: 'pie'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        plotOptions: {
            pie: {
                shadow: false
            }
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
            }
        },
        series: [{
            data: mainData,
            size: '60%',
            dataLabels: {
                formatter: function() {
                    return this.y > 5 ? this.point.name : null;
                },
                color: 'white',
                distance: -30
            }
        }, {
            data: subData,
            innerSize: '60%',
            dataLabels: {
                formatter: function() {
                    // display only if larger than 1
                    return this.y > 1 ? '<b>'+ this.point.name +':</b> '+ this.y +'%'  : null;
                }
            }
        }]
    });
}
function _graph_spline_with_tooltip(targetId, title, subtitle, x_categories, x_labels_rotation, ytitle, series) {
	chart = new Highcharts.Chart({
	    chart: {
	        renderTo: targetId,
	        defaultSeriesType: 'spline'
	    },
	    title: {
	        text: title
	    },
	    subtitle: {
	        text: subtitle
	    },
	    xAxis: {
	        categories: x_categories,
	        labels: { rotation: x_labels_rotation, y:25 }
	    },
	    yAxis: {
	        title: {
	            text: ytitle
	        },
	        labels: {
	            formatter: function() {
	                return this.value
	            }
	        }
	    },
	    tooltip: {
	        crosshairs: true,
	        shared: true
	    },
	    plotOptions: {
	        spline: {
	            marker: {
	                radius: 4,
	                lineColor: '#666666',
	                lineWidth: 1
	            }
	        }
	    },
	    series: series
	});
}