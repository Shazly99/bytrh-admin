import React from 'react'
import Chart from 'react-apexcharts';


const ChatOneLine = ({ doctor, client, label1, label2 ,title}) => {
    const chartData = {
        series: [doctor, client],
        options: {
            chart: {
                type: 'donut',
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            labels: [label1, label2],
            colors: ['#8054A1', '#66b9b1'],
            // dataLabels: {
            //     enabled: false
            // },
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
            <Chart options={chartData.options} series={chartData.series} type={'pie'} width={300} />
        </div>
    );
};

export default ChatOneLine;

