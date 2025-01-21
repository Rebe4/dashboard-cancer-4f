var chartDom = document.getElementById('chartA');
var myChart = echarts.init(chartDom);
var option;

option = {
  
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%'
    },
    legend: {
        data: ['CRISPR', 'IA', 'Cirugía robótica', 'Criomicroscopia electrónica', 'Infinium', 'Telemedicina']
    },
    series: [
        {
            name: 'Tecnologías innovadoras',
            type: 'funnel',
            left: '10%',
            width: '80%',
            label: {
                formatter: '{b}',
                color: '#000'
            },
            labelLine: {
                show: false
            },
            itemStyle: {
                opacity: 0.7
            },
            emphasis: {
                label: {
                    position: 'inside',
                    formatter: '{b}  {c}%'
                }
            },
            data: [
                { value: 90, name: 'CRISPR' },
                { value: 80, name: 'IA' },
                { value: 60, name: 'Cirugía robótica' },
                { value: 50, name: 'Criomicroscopia electrónica' },
                { value: 40, name: 'Infinium' },
                { value: 20, name: 'Telemedicina' }
            ]
        },
        {
            name: 'Avances en los tratamientos',
            type: 'funnel',
            left: '10%',
            width: '80%',
            maxSize: '80%',
            label: {
                position: 'inside',
                formatter: '{c}%',
                color: '#fff'
            },
            itemStyle: {
                opacity: 0.5,
                borderColor: '#fff',
                borderWidth: 2
            },
            emphasis: {
                label: {
                    position: 'inside',
                    formatter: '{b} {c}%'
                }
            },
            data: [
                { value: 60, name: 'CRISPR' },
                { value: 50, name: 'IA' },
                { value: 40, name: 'Cirugía robótica' },
                { value: 30, name: 'Criomicroscopia electrónica' },
                { value: 20, name: 'Infinium' },
                { value: 10, name: 'Telemedicina' }
            ],
            z: 100,
            
        }
    ]
};

option && myChart.setOption(option);
