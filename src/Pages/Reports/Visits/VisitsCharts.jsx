import React from 'react'
import ReactApexChart from 'react-apexcharts'

const VisitsCharts = ({ isLang, color, title, labels , values , type }) => {


    // Data
    let series = [{
        name: `${title}`,
        // data: [Consults, UrgentConsults]
        data: [...values]
    }]
    
    let options = {
        chart: {
            type: 'bar',
            stacked: false,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
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
              borderRadius: 10, 
             
              dataLabels: {
                total: {
                  enabled: true,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900,
                  },
                },
              },
              // Custom column styles
              columnWidth: type === '0' ? '60px' : '30px', // Adjust the width of the columns
              colors: { 
                ranges: [
                  {
                    from: 0,
                    to: 10, 
                  },
                  {
                    from: 10,
                    to: 20, 
                  }, 
                ],
              },
            },
          }, 
        xaxis: {
            type: 'type',
            categories: [
                // label1, label2 
                ...labels
            ],
        },
        legend: {
            position: `${isLang === 'en' ? 'right' : 'left'}`,
            offsetY: 40
        },
        fill: {
            opacity: 0.8
        }
    }

    return (
        <>
            <div id="chart" >
                <h2>{title}</h2>
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
        </>
    )
}

export default VisitsCharts
