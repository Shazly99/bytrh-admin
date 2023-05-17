import React from 'react'
import ReactApexChart from 'react-apexcharts'

const ChartColumn = ({ isLang, color, urgent, home, center, label1, label2, label3, title }) => {


    // Data
    let series = [{
        name: `${title}`,
        data: [urgent, home, center]
    }
    ]
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
              borderRadius: 8, // قيمة التدوير لحافة العمود العلوية
        
             
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
              columnWidth: '60px', // Adjust the width of the columns
              colors: {
                // Apply different colors to each column
                ranges: [
                  {
                    from: 0,
                    to: 10,
                    
                    // color: '#FF0000', // Red color for the first column
                  },
                  {
                    from: 10,
                    to: 20,
                    // color: '#00FF00', // Green color for the second column
                  },
                  {
                    from: 20,
                    to: 30,
                    // color: '#0000FF', // Blue color for the third column
                  },
                ],
              },
            },
          },
        
        // plotOptions: {
        //     bar: {
        //         horizontal: false,
        //         borderRadiusTop:10,
        //         dataLabels: {
        //             total: {
        //                 enabled: true,
        //                 style: {
        //                     fontSize: '13px',
        //                     fontWeight: 900,
        //                 }
        //             }
        //         }
        //     },
        // },
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

export default ChartColumn