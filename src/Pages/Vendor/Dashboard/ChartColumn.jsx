import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const ChartColumn = () => { 

    let series = [{
        name: 'Visited',
        data: [ 23, 20, 8, 13, 27, 2 ,8, 13, 27,13, 2]
    }, {
        name: 'Not Visited',
        data: [ 55, 41, 67, 22, 15, 15, 22, 15, 44,15,20]
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
        colors: ['#C61A29', '#3182CE'],
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
                horizontal: false,
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
                '01/01/2022 GMT', '01/02/2022 GMT','01/03/2022 GMT','01/04/2022 GMT', '01/5/2022 GMT', 
                '01/6/2022 GMT',  '01/7/2022 GMT','01/8/2022 GMT','01/9/2022 GMT','01/10/2022 GMT','01/11/2022 GMT' 
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
                <h1>Yearly Visits</h1>
                <ReactApexChart options={options} series={series} type="bar" height={250} />
            </div>
        </>
    )
}

export default ChartColumn