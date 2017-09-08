type = ['','info','success','warning','danger'];


demo = {

  initChartist: function(){

    var dataSales = {
      labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
      series: [
      [287, 385, 490, 562, 594, 626, 698, 895, 952],
      [67, 152, 193, 240, 387, 435, 535, 642, 744],
      [23, 113, 67, 108, 190, 239, 307, 410, 410]
      ]
    };

    var optionsSales = {
      lineSmooth: false,
      low: 0,
      high: 1000,
      showArea: true,
      height: "245px",
      axisX: {
        showGrid: false,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
      showLine: true,
      showPoint: false,
    };

    var responsiveSales = [
    ['screen and (max-width: 640px)', {
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
    ];

    Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);


    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
      [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
      [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
      ]
    };

    var options = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      },
      height: "245px"
    };

    var responsiveOptions = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
    ];

    Chartist.Line('#chartActivity', data, options, responsiveOptions);

    var dataPreferences = {
      series: [
      [25, 30, 20, 25]
      ]
    };

    var optionsPreferences = {
      donut: true,
      donutWidth: 40,
      startAngle: 0,
      total: 100,
      showLabel: false,
      axisX: {
        showGrid: false
      }
    };

    Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

    Chartist.Pie('#chartPreferences', {
      labels: ['62%','32%','6%'],
      series: [62, 32, 6]
    });
  },

  showNotification: function(from, align){
   color = Math.floor((Math.random() * 4) + 1);

   $.notify({
     icon: "ti-gift",
     message: "Welcome to <b>Paper Dashboard</b> - a beautiful freebie for every web developer."

   },{
    type: type[color],
    timer: 4000,
    placement: {
      from: from,
      align: align
    }
  });
 },
 initDocumentationCharts: function(){
    //     	init single simple line chart
    var dataPerformance = {
      labels: ['6pm','9pm','11pm', '2am', '4am', '8am', '2pm', '5pm', '8pm', '11pm', '4am'],
      series: [
      [1, 6, 8, 7, 4, 7, 8, 12, 16, 17, 14, 13]
      ]
    };

    var optionsPerformance = {
      showPoint: false,
      lineSmooth: true,
      height: "200px",
      axisX: {
        showGrid: false,
        showLabel: true
      },
      axisY: {
        offset: 40,
      },
      low: 0,
      high: 16,
      height: "250px"
    };

    Chartist.Line('#chartPerformance', dataPerformance, optionsPerformance);

    //     init single line with points chart
    var dataStock = {
      labels: ['\'07','\'08','\'09', '\'10', '\'11', '\'12', '\'13', '\'14', '\'15'],
      series: [
      [22.20, 34.90, 42.28, 51.93, 62.21, 80.23, 62.21, 82.12, 102.50, 107.23]
      ]
    };

    var optionsStock = {
      lineSmooth: false,
      height: "200px",
      axisY: {
        offset: 40,
        labelInterpolationFnc: function(value) {
          return '$' + value;
        }

      },
      low: 10,
      height: "250px",
      high: 110,
      classNames: {
        point: 'ct-point ct-green',
        line: 'ct-line ct-green'
      }
    };

    Chartist.Line('#chartStock', dataStock, optionsStock);

    //      init multiple lines chart
    var dataSales = {
      labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
      series: [
      [287, 385, 490, 562, 594, 626, 698, 895, 952],
      [67, 152, 193, 240, 387, 435, 535, 642, 744],
      [23, 113, 67, 108, 190, 239, 307, 410, 410]
      ]
    };

    var optionsSales = {
      lineSmooth: false,
      low: 0,
      high: 1000,
      showArea: true,
      height: "245px",
      axisX: {
        showGrid: false,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
      showLine: true,
      showPoint: false,
    };

    var responsiveSales = [
    ['screen and (max-width: 640px)', {
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
    ];

    Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);

    //      pie chart
    Chartist.Pie('#chartPreferences', {
      labels: ['62%','32%','6%'],
      series: [62, 32, 6]
    });

    //      bar chart
    var dataViews = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
      [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
      ]
    };

    var optionsViews = {
      seriesBarDistance: 10,
      classNames: {
        bar: 'ct-bar'
      },
      axisX: {
        showGrid: false,

      },
      height: "250px"

    };

    var responsiveOptionsViews = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
    ];

    Chartist.Bar('#chartViews', dataViews, optionsViews, responsiveOptionsViews);

    //     multiple bars chart
    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
      [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
      [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
      ]
    };

    var options = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      },
      height: "245px"
    };

    var responsiveOptions = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
    ];

    Chartist.Line('#chartActivity', data, options, responsiveOptions);

  }

}
