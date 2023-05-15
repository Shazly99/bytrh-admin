import React from 'react'
import ReactApexChart from 'react-apexcharts' 

const ChartColumn = ({ isLang, urgent, home, center }) => {
 

    // Data
    let series = [{
        name:'visits',
        data: [15, 20, 50]
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
        colors: ['#66b9b1'],
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
                ' urgent', '  center ', ' home'
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
                <h2>Visits (urgent - center - home)    </h2>
                <ReactApexChart  options={options} series={series} type="bar" height={450} />
            </div>
        </>
    )
}

export default ChartColumn