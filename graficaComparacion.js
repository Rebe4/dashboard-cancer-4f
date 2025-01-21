var chartDom = document.getElementById('main2');
var myChart = echarts.init(chartDom);
var option;

// Definir colores según el tipo de cáncer
var colors = {
    'Cáncer de pulmón': '#d6681e', // Naranja
    'Cáncer de mama': '#fa84d7', // Rosa
    'Cáncer colorrectal': '#2a3af4', // Azul marino
    'Cáncer de próstata': '#80BFFF', // Azul celeste
    'Cáncer gástrico': '#907bd9', // Azul-violeta
};

option = {
    title: {
        text: 'Comparación de la Carga de Cáncer: 2022 vs 2050',
        left: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: function (params) {
            var res = params[0].name + '<br/>';
            params.forEach(function (param) {
                res += param.seriesName + ': ' + param.data + ' millones de casos<br/>';
            });
            return res;
        }
    },
    legend: {
        data: ['Incidencia 2022', 'Proyección Global 2050'],
        top: '8%'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
    },
    yAxis: {
        type: 'category',
        data: ['Cáncer de pulmón', 'Cáncer de mama', 'Cáncer colorrectal', 'Cáncer de próstata', 'Cáncer gástrico'],
        name: 'Tipos de Cáncer'
    },
    series: [
        {
            name: 'Incidencia 2022',
            type: 'bar',
            data: [2.5, 2.3, 1.9, 1.5, 0.97],
            itemStyle: {
                color: function (params) {
                    // Usa params.name para asignar colores
                    var categoryName = option.yAxis.data[params.dataIndex];
                    return colors[categoryName] || '#000'; // Devuelve el color asignado o negro por defecto
                }
            }
        },
        {
            name: 'Proyección Global 2050',
            type: 'bar',
            data: [4.425, 4.071, 3.363, 2.655, 1.719],
            itemStyle: {
                color: '#91CC75' // Color fijo para esta serie
            }
        },
    ]
};

option && myChart.setOption(option);