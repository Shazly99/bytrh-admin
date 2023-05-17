import React from 'react'
// import Chart from 'react-apexcharts';
import { Col, Row } from 'react-bootstrap';


const CircleChart = ({ client, doctor, label1, label2, title, typeChart }) => {
    // const chartData = {
    //     series: [client, doctor],
    //     options: {
    //         chart: {
    //             type: { typeChart },
    //             width: 400,

    //             // stacked: true,
    //             // toolbar: {
    //             //     show: true
    //             // },
    //             // zoom: {
    //             //     enabled: true
    //             // }
    //         },
    //         labels: [label1, label2],
    //         colors: ['#8054A1', '#62B9B3'],
    //         dataLabels: {
    //             enabled: false
    //         },
    //         responsive: [
    //             {
    //                 breakpoint: 480,
    //                 options: {
    //                     chart: {
    //                         width: 200,
    //                     },
    //                     legend: {
    //                         position: 'bottom',
    //                     },
    //                 },
    //             },
    //         ],
    //     },
    // };

    return (
        <div id="chart" >
            <h2 className='ps-3 bolder'> {title}</h2>
            {/* <Chart options={chartData.options} series={chartData.series} type='donut' width={300} /> */}
            <Row className='leftSummary'>
      {/*           {
                    client && */}
                    <Col xl={6} lg={6} md={6} sm={6} className='w-100'>
                        <div className="chartSummry">
                            <div className="title">
                                {label1}
                            </div>
                            <div className="number">
                                {client}
                            </div>
                        </div>
                    </Col>
             {/*    } */}
      {/*           {
                    doctor && */}
                    <Col xl={6} lg={6} md={6} sm={6} className='w-100'>
                        <div className="chartSummry">
                            <div className="title">
                                {label2}
                            </div>
                            <div className="number">
                                {doctor}
                            </div>
                        </div>
                    </Col>
         {/*        } */}
            </Row>
        </div>
    );
};

export default CircleChart;
