const data = [
    { value: 30, name: 'Radioterapia' },   // Ajustado a 30%
    { value: 40, name: 'Cirugía' },        // Ajustado a 40%
    { value: 25, name: 'Quimioterapia' },  // Ajustado a 25%
    { value: 10, name: 'Terapia hormonal' }, // Ajustado a 10%
    { value: 15, name: 'Inmunoterapia' },  // Ajustado a 15%
    { value: 20, name: 'Otros tratamientos' },  // Ajustado a 20%

];

const defaultPalette = [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc'
];
const radius = ['30%', '80%'];

// Configuración del gráfico de pastel
const pieOption = {
    series: [
        {
            type: 'pie',
            id: 'distribution',
            radius: radius,
            label: {
                show: true,
                position: 'outside',
                formatter: '{b}: {c}' // Mostrar nombre y valor
            },
            labelLine: {
                show: true
            },
            universalTransition: true,
            animationDurationUpdate: 1000,
            data: data
        }
    ]
};

// Configuración del gráfico de parlamento
const parliamentOption = (function () {
    let sum = data.reduce(function (sum, cur) {
        return sum + cur.value;
    }, 0);
    let angles = [];
    let startAngle = -Math.PI / 2;
    let curAngle = startAngle;
    data.forEach(function (item) {
        angles.push(curAngle);
        curAngle += (item.value / sum) * Math.PI * 2;
    });
    angles.push(startAngle + Math.PI * 2);

    function parliamentLayout(startAngle, endAngle, totalAngle, r0, r1, size) {
        let rowsCount = Math.ceil((r1 - r0) / size);
        let points = [];
        let r = r0;
        for (let i = 0; i < rowsCount; i++) {
            let totalRingSeatsNumber = Math.round((totalAngle * r) / size);
            let newSize = (totalAngle * r) / totalRingSeatsNumber;
            for (
                let k = Math.floor((startAngle * r) / newSize) * newSize;
                k < Math.floor((endAngle * r) / newSize) * newSize - 1e-6;
                k += newSize
            ) {
                let angle = k / r;
                let x = Math.cos(angle) * r;
                let y = Math.sin(angle) * r;
                points.push([x, y]);
            }
            r += size;
        }
        return points;
    }

    return {
        series: {
            type: 'custom',
            id: 'distribution',
            data: data,
            coordinateSystem: undefined,
            universalTransition: true,
            animationDurationUpdate: 1000,
            renderItem: function (params, api) {
                var idx = params.dataIndex;
                var viewSize = Math.min(api.getWidth(), api.getHeight());
                var r0 = ((parseFloat(radius[0]) / 100) * viewSize) / 2;
                var r1 = ((parseFloat(radius[1]) / 100) * viewSize) / 2;
                var cx = api.getWidth() * 0.5;
                var cy = api.getHeight() * 0.5;
                var size = viewSize / 50;
                var points = parliamentLayout(
                    angles[idx],
                    angles[idx + 1],
                    Math.PI * 2,
                    r0,
                    r1,
                    size + 3
                );
                return {
                    type: 'group',
                    children: points.map(function (pt) {
                        return {
                            type: 'circle',
                            autoBatch: true,
                            shape: {
                                cx: cx + pt[0],
                                cy: cy + pt[1],
                                r: size / 2
                            },
                            style: {
                                fill: defaultPalette[idx % defaultPalette.length]
                            }
                        };
                    })
                };
            }
        }
    };
})();

// Inicializar el gráfico en el elemento con ID "chart2"
const chart2 = echarts.init(document.getElementById('chart2'));

// Configuración inicial del gráfico (empieza con pieOption)
let currentOption = pieOption;
chart2.setOption(currentOption);

// Variable para almacenar el ID del intervalo
let animationInterval = setInterval(function () {
  currentOption = currentOption === pieOption ? parliamentOption : pieOption;
  chart2.setOption(currentOption);
}, 2000);

// Detener la animación al hacer clic en el gráfico
chart2.getZr().on('click', function () {
  clearInterval(animationInterval);
  console.log('Animación detenida al hacer clic en el gráfico.');
});
