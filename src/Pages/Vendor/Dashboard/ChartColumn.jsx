import React from 'react'
import ReactApexChart from 'react-apexcharts'

const ChartColumn = ({ isLang, color, urgent, home, center, label1, label2, label3, title }) => {


    // Data
    let series = [{
        name: 'visits',
        data: [urgent, home, center]
    }
    ]
    let options = {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        colors: [color],
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
                borderRadius: 15,
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
            type: 'type',
            categories: [
                label1, label2, label3
            ],
        },
        legend: {
            position: `${isLang === 'en' ? 'right' : 'left'}`,
            offsetY: 40
        },
        fill: {
            opacity: 1
        }
    }

    return (
        <>
            <div id="chart" >
                <h2>{title}</h2>
                <ReactApexChart options={options} series={series} type="area" height={450} />
            </div>
        </>
    )
}

export default ChartColumn