const modal = document.getElementById('infoModal');
const body = document.body;

// Abre el modal
document.getElementById('infoButton').onclick = () => {
    modal.style.display = 'block';
    body.classList.add('modal-open'); // Ajusta la gráfica si es necesario
};

// Cierra el modal
document.getElementById('closeModal').onclick = () => {
    modal.style.display = 'none';
    body.classList.remove('modal-open'); // Restaura la gráfica
};

// Configuración de ECharts
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

// Función para formatear los números
function formatNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(2) + 'M'; // Formato millones (2.26M)
    } else if (number >= 1000) {
        return (number / 1000).toFixed(2) + 'k'; // Formato miles (685k)
    }
    return number; // Retorna el número tal cual si es menor a 1000
}

option = {
    legend: {
        data: ['Nuevos casos', 'Fallecidos']
    },
    tooltip: {},
    dataset: {
        source: [
            ['causa', 'Nuevos casos', 'Fallecidos'],
            ['Cáncer de mama', 2260000, 685000],
            ['Cáncer de pulmón', 2210000, 1800000],
            ['Cáncer gástrico', 1090000, 769000],
            ['Cáncer colorrectal', 1930000, 916000],
        ]
    },
    xAxis: {
        type: 'category',
        data: ['Cáncer de mama', 'Cáncer de pulmón', 'Cáncer gástrico', 'Cáncer colorrectal'],

    },
    yAxis: {
        axisLabel: {
            show: true,
            margin: 15, // Ajusta el margen
        }
    },
    series: [
        {
            name: 'Nuevos casos',
            type: 'bar',
            data: [2260000, 2210000, 1090000, 1930000],
            itemStyle: {
                color: function (params) {
                    // Definir colores según el tipo de cáncer
                    var colors = {
                        'Cáncer de mama': '#fa84d7', // Rosa
                        'Cáncer de pulmón': '#d6681e', // Naranja
                        'Cáncer gástrico': '#907bd9', // Azul-violeta
                        'Cáncer colorrectal': '#2a3af4' // Azul
                    };
                    return colors[params.name] || '#000'; // Devuelve el color asignado o negro por defecto
                }
            },
            label: {
                show: true,
                formatter: function (params) {
                    return formatNumber(params.value);
                }
            }
        },
        {
            name: 'Fallecidos',
            type: 'bar',
            data: [685000, 1800000, 769000, 916000],
            itemStyle: {
                color: '#706964' // Color fijo para todas las barras de "Fallecidos"
            },
            label: {
                show: true,
                formatter: function (params) {
                    return formatNumber(params.value);
                }
            }
        }
    ]
};

myChart.setOption(option);

window.addEventListener('resize', function () {
    myChart.resize();
});