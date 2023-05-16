import React from 'react'
import Chart from 'react-apexcharts';


const ChatOneLine = ({  doctor  }) => {
    const chartData = {
        series: [  doctor,10],
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
            labels: ['Online doctors'],
            colors: ['#8054A1', '#F7F9FB'], 
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
            <h2 className='ps-3'> Online doctors</h2>
            <Chart options={chartData.options} series={chartData.series} type={'donut'} width={300} />
        </div>
    );
};

export default ChatOneLine;

