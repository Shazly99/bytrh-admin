import React, { useContext, useEffect, useState } from 'react';
// import { useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import '../../Vendor/Dashboard/Dashboard.scss'
import { VendersContext } from '../../../context/Store';
// import { PostData, apiheader } from '../../../utils/fetchData';
import initialTranslate from './initialTranslate';
import VisitsCharts from './VisitsCharts';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import ButtonGroup from '@mui/material/ButtonGroup';


function VisitsReports() {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslate)
  const handelTranslate = () => {
    setTranslate(initialTranslate)
  }


//   const buttons = [
//     <Button style={{ textTransform: 'capitalize' }} variant={`${type === 'Jan' ? 'contained' : 'outlined'}`} size='large' key="one" onClick={() => setFilterType('Jan')}>{translate[isLang]?.months[0]}</Button>,
//     <Button style={{ textTransform: 'capitalize' }} variant={`${type === 'Feb' ? 'contained' : 'outlined'}`} size='large' key="two" onClick={() => setFilterType('Feb')}>{translate[isLang]?.months[1]}</Button>,
//     <Button style={{ textTransform: 'capitalize' }} variant={`${type === 'Mar' ? 'contained' : 'outlined'}`} size='large' key="three" onClick={() => setFilterType('Mar')}>{translate[isLang]?.months[2]}</Button>,
//     <Button style={{ textTransform: 'capitalize' }} variant={`${type === 'Apr' ? 'contained' : 'outlined'}`} size='large' key="fore" onClick={() => setFilterType('Apr')}>{translate[isLang]?.months[3]}</Button>,
//     <Button style={{ textTransform: 'capitalize' }} variant={`${type === 'May' ? 'contained' : 'outlined'}`} size='large' key="five" onClick={() => setFilterType('May')}>{translate[isLang]?.months[4]}</Button>,
//     <Button style={{ textTransform: 'capitalize' }} variant={`${type === 'Jun' ? 'contained' : 'outlined'}`} size='large' key="sex" onClick={() => setFilterType('Jun')}>{translate[isLang]?.months[5]}</Button>,
//     <Button style={{ textTransform: 'capitalize' }} variant={`${type === 'Jul' ? 'contained' : 'outlined'}`} size='large' key="seven" onClick={() => setFilterType('Jul')}>{translate[isLang]?.months[6]}</Button>,
//     <Button style={{ textTransform: 'capitalize' }} variant={`${type === 'Aug' ? 'contained' : 'outlined'}`} size='large' key="eight" onClick={() => setFilterType('Aug')}>{translate[isLang]?.months[7]}</Button>,
//     <Button style={{ textTransform: 'capitalize' }} variant={`${type === 'Sep' ? 'contained' : 'outlined'}`} size='large' key="nine" onClick={() => setFilterType('Sep')}>{translate[isLang]?.months[8]}</Button>,
//     <Button style={{ textTransform: 'capitalize' }} variant={`${type === 'Oct' ? 'contained' : 'outlined'}`} size='large' key="ten" onClick={() => setFilterType('Oct')}>{translate[isLang]?.months[9]}</Button>,
//     <Button style={{ textTransform: 'capitalize' }} variant={`${type === 'Nov' ? 'contained' : 'outlined'}`} size='large' key="eleven" onClick={() => setFilterType('Nov')}>{translate[isLang]?.months[10]}</Button>,
//     <Button style={{ textTransform: 'capitalize' }} variant={`${type === 'Dec' ? 'contained' : 'outlined'}`} size='large' key="twelve" onClick={() => setFilterType('Dec')}>{translate[isLang]?.months[11]}</Button>,
//   ];


  const [type, setFilterType] = useState('all');


  useEffect(() => {
    let timeOut = setTimeout(() => {
        handelTranslate();
    }, 100);
    return (() => {
        clearTimeout(timeOut);
    })
  }, [isLang])



  return (
    <>
      <Container fluid>
        <div className="app__dashboard">
        
            <div className="mt-5">
                <label htmlFor="selectMonth" className="fs-5 fw-semibold mb-2 color-red">{isLang === 'ar' ? 'اختـر شهـر' : 'Select a Month'}</label>
                <select name="selectMonth" id="selectMonth" defaultValue={'all'} dir='ltr' onChange={(e) => {
                    setFilterType(e.target.value);
                }} className=' p-2 form-select w-50 fw-semibold color-red'>
                    <option value="all">{isLang === 'ar' ? 'كل الشهــور' : 'All'}</option>
                    <option value="jan">{isLang === 'ar' ? 'ينـايـر' : 'Jan'}</option>
                    <option value="feb">{isLang === 'ar' ? 'فبرايـر' : 'Feb'}</option>
                    <option value="mar">{isLang === 'ar' ? 'مـارس' : 'Mar'}</option>
                    <option value="apr">{isLang === 'ar' ? 'ابريـل' : 'Apr'}</option>
                    <option value="may">{isLang === 'ar' ? 'مايـو' : 'May'}</option>
                    <option value="jun">{isLang === 'ar' ? 'يونيـو' : 'Jun'}</option>
                    <option value="jul">{isLang === 'ar' ? 'يوليـو' : 'Jul'}</option>
                    <option value="aug">{isLang === 'ar' ? 'اغسـطـس' : 'Aug'}</option>
                    <option value="sep">{isLang === 'ar' ? 'سبتمبـر' : 'Sep'}</option>
                    <option value="oct">{isLang === 'ar' ? 'اكتوبــر' : 'Oct'}</option>
                    <option value="nov">{isLang === 'ar' ? 'نوفمبــر' : 'Nov'}</option>
                    <option value="dec">{isLang === 'ar' ? 'ديسمبــر' : 'Dec'}</option>
                </select>
            </div>
            
            <ul className="nav nav-pills mt-5 mb-0" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link fw-semibold active" id="pills-income-tab" data-bs-toggle="pill" data-bs-target="#pills-income" type="button" role="tab" aria-controls="pills-income" aria-selected="true">{translate[isLang]?.income}</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link fw-semibold" id="pills-profit-tab" data-bs-toggle="pill" data-bs-target="#pills-profit" type="button" role="tab" aria-controls="pills-profit" aria-selected="false">{translate[isLang]?.profit}</button>
                </li>
            </ul>

            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-income" role="tabpanel" aria-labelledby="pills-income-tab" tabindex="0">
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>

                            {type === 'all' ?
                                <div className="app__dashboard_chart"  >
                                    <Container >
                                        <VisitsCharts
                                            isLang={isLang}
                                            color={'#8054A1'}
                                            title={translate[isLang]?.Column?.titleMonths}
                                            labels={translate[isLang]?.months}
                                        />
                                    </Container>
                                </div>
                                :
                                <div className="app__dashboard_chart"  >
                                    <Container >
                                        <VisitsCharts
                                            isLang={isLang}
                                            color={'#8054A1'}
                                            title={translate[isLang]?.Column?.titleDays}
                                            labels={translate[isLang]?.days}
                                        />
                                    </Container>
                                </div>
                            }

                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'right',
                                    direction: 'ltr',
                                    marginTop: '40px',
                                    '& > *': {
                                        m: 1,
                                    },
                                }}
                            >
                                <ButtonGroup color="secondary" className='d-flex gap-3  ' aria-label="  secondary button group">
                                    {buttons}
                                </ButtonGroup>
                            </Box> */}

                        </Col>

                        {/* <Col xl={4} lg={4} md={12} sm={12}>
                            <div className="app__dashboard_chart w-100"    >
                                <Component.ChartCircle
                                isLang={isLang}
                                client={dashbordData?.RegisteredClients}
                                doctor={dashbordData?.RegisteredDoctors}
                                label1={translate[isLang]?.Circle?.label1}
                                label2={translate[isLang]?.Circle?.label2}
                                title={translate[isLang]?.Circle?.titleUser}
                                />
                            </div>

                            <div className="app__dashboard_chart w-100"  >
                                <Component.ChartCircle
                                isLang={isLang}
                                client={dashbordData?.ActiveClients}
                                doctor={dashbordData?.ActiveDoctors}
                                label1={translate[isLang]?.Circle?.label1}
                                label2={translate[isLang]?.Circle?.label2}
                                title={translate[isLang]?.Circle?.titleActive}
                                />
                            </div>

                            <div className="app__dashboard_chart w-100"  >
                                <Component.ChartCircle
                                isLang={isLang}
                                doctor={dashbordData?.ActiveDoctors}
                                label2={translate[isLang]?.Circle?.label2}
                                title={translate[isLang]?.Circle?.titleOnline}
                                />
                            </div>

                            <div className="app__dashboard_chart"  >
                                <Component.ChatOneLine
                                isLang={isLang}
                                activeDr={dashbordData?.ActiveDoctors}
                                onlineDr={dashbordData?.OnlineDoctors}
                                typeChart='donut'
                                label1={translate[isLang]?.Circle?.label1}
                                label2={translate[isLang]?.Circle?.label2}
                                title={translate[isLang]?.Circle?.titleDoctors}
                                />
                            </div> 
                        </Col> */}
                        
                    </Row>
                </div>
                <div className="tab-pane fade" id="pills-profit" role="tabpanel" aria-labelledby="pills-profit-tab" tabindex="0">...</div>
            </div>

        </div>
      </Container>

    </>
  )
}

export default VisitsReports

