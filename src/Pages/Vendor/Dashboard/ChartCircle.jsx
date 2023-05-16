import React from 'react'
import Chart from 'react-apexcharts';


const CircleChart = ({ client, doctor, label1, label2, title, typeChart }) => {
    const chartData = {
        series: [client, doctor],
        options: {
            chart: {
                type: { typeChart },
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            labels: [`${label1}  `, `${label2}`],
            colors: ['#8054A1', '#62B9B3'],
            dataLabels: {
                enabled: false
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    };

    return (
        <div id="chart" >
            <h2 className='ps-3'> {title}</h2>
            <Chart options={chartData.options} series={chartData.series} type={typeChart} width={300} />
        </div>
    );
};

export default CircleChart;
