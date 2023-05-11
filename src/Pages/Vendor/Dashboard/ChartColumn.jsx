import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const ChartColumn = () => { 

    let series = [{
        name: 'Visited',
        data: [ 23, 20, 8 ,40,30]
    }, {
        name: 'Not Visited',
        data: [ 55, 41, 67 ,52,22]
    }
    ]
    let options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#8054A1', '#66b9b1'],
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 0,
                dataLabels: {
                    total: {
                        enabled: true,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900,
                        }
                    }
                }
            },
        },
        xaxis: {
            type: 'datetime',
            categories: [
                // '01/01/2022 GMT', '01/02/2022 GMT','01/03/2022 GMT','01/04/2022 GMT', '01/5/2022 GMT', 
              
            ],
        },
        legend: {
            position: 'right',
            offsetY: 40
        },
        fill: {
            opacity: 1
        }
    }


    return (
        <>
            <div id="chart">
                <h2>Yearly Visits</h2>
                <ReactApexChart options={options} series={series} type="bar" height={250} />
            </div>
        </>
    )
}

export default ChartColumn