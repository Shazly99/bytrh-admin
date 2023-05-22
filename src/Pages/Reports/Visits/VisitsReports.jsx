import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'
import '../../Vendor/Dashboard/Dashboard.scss'
import { VendersContext } from '../../../context/Store';
import { apiheader } from '../../../utils/fetchData';
import initialTranslate from './initialTranslate';
import VisitsCharts from './VisitsCharts';
import Select from "react-select";


function VisitsReports() {

  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslate)
  const handelTranslate = () => {
    setTranslate(initialTranslate)
  }


  const [type, setFilterType] = useState('0');
//   const [typeText, setFilterTypeText] = useState('all');

  const typeVisits = [
    { value: "HOME_VISIT", label: isLang === 'en' ? "Home Visits" : 'زيارات منزلية' },
    { value: "URGENT_HOME_VISIT", label: isLang === 'en' ? "Urgent Visits" : 'زيارات عاجلة' },
    { value: "CENTER_VISIT", label: isLang === 'en' ? "Center Visits" : 'زيارات المركز' },
  ];

  const [selectedValues, setSelectedValues] = useState([]);
  const [groupTypes, setGroupTypes] = useState(["HOME_VISIT" , "URGENT_HOME_VISIT" , "CENTER_VISIT"]);

  let typesList = [];

  function handleChangeType (selectedOptions) {
    setSelectedValues(selectedOptions);
    for (let i of selectedOptions) {
      typesList.push(i.value);
    }
    setGroupTypes(typesList);
  };


 const api = `https://bytrh.com/api/admin/reports/visits`

  const [loading, setLoading] = useState(false);
  const [fetchLabels, setFetchLabels] = useState([]);
  const [fetchValues, setFetchValues] = useState([]);

  async function getData() {
    setLoading(true);
    await axios.post(api , {
        FilterType: type,
        VisitType: groupTypes.length < 1 ? ["HOME_VISIT" , "URGENT_HOME_VISIT" , "CENTER_VISIT"] : groupTypes,
    } , apiheader )
      .then(res => {
        if (res.status === 200 && res.request.readyState === 4) {
          setFetchLabels(res.data.Response.map(el => el.Name));
          setFetchValues(res.data.Response.map(el => el.Amount));
          setLoading(false);
        }
      })
      .catch(err => { 
        console.log(err);
      })
  }


  useEffect(() => {
    let timeOut = setTimeout(() => {
        handelTranslate();
        getData()
    }, 100);
    return (() => {
        clearTimeout(timeOut);
    })
  }, [isLang , type , groupTypes])



  return (
    <>
      <Container fluid>
        <div className="app__dashboard">
        
            <div className="mt-5 row d-flex justify-content-center align-items-center gy-3 gy-md-0">
                <div className="col-md-6">
                    <div className="group-reports">
                        <label htmlFor="selectMonth" className="fs-5 fw-semibold mb-2 color-red">{isLang === 'ar' ? 'اختـر شهـر' : 'Select a Month'}</label>
                        <select name="selectMonth" id="selectMonth" defaultValue={'all'} dir='ltr' onChange={(e) => {
                            setFilterType(e.target.value);
                            // setFilterTypeText(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text);
                        }} className=' p-2 form-select fw-semibold color-red'>
                            <option value="0">{isLang === 'ar' ? 'كل الشهــور' : 'All'}</option>
                            <option value="01">{isLang === 'ar' ? 'ينـايـر' : 'Jan'}</option>
                            <option value="02">{isLang === 'ar' ? 'فبرايـر' : 'Feb'}</option>
                            <option value="03">{isLang === 'ar' ? 'مـارس' : 'Mar'}</option>
                            <option value="04">{isLang === 'ar' ? 'ابريـل' : 'Apr'}</option>
                            <option value="05">{isLang === 'ar' ? 'مايـو' : 'May'}</option>
                            <option value="06">{isLang === 'ar' ? 'يونيـو' : 'Jun'}</option>
                            <option value="07">{isLang === 'ar' ? 'يوليـو' : 'Jul'}</option>
                            <option value="08">{isLang === 'ar' ? 'اغسـطـس' : 'Aug'}</option>
                            <option value="09">{isLang === 'ar' ? 'سبتمبـر' : 'Sep'}</option>
                            <option value="010">{isLang === 'ar' ? 'اكتوبــر' : 'Oct'}</option>
                            <option value="011">{isLang === 'ar' ? 'نوفمبــر' : 'Nov'}</option>
                            <option value="012">{isLang === 'ar' ? 'ديسمبــر' : 'Dec'}</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="group-reports">
                        <label htmlFor="selectMonth" className="fs-5 fw-semibold mb-2 color-red">{isLang === 'ar' ? 'نوع الزيـارة / الزيارات' : 'Select Visits Type'}</label>
                        <Select
                            defaultValue={[...typeVisits]}
                            isMulti
                            name="type-visits"
                            id="type-visits"
                            options={typeVisits}
                            className="basic-multi-select w-100 py-0 color-red"
                            classNamePrefix="select"
                            placeholder={isLang === 'ar' ? 'نوع الزيـارة / الزيارات' : 'Select Visits Type..'}
                            onChange={handleChangeType}
                            value={selectedValues}
                        />
                    </div>
                </div>
            </div>
            
            {/* <ul className="nav nav-pills mt-5 mb-0" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link fw-semibold active" id="pills-income-tab" data-bs-toggle="pill" data-bs-target="#pills-income" type="button" role="tab" aria-controls="pills-income" aria-selected="true">{translate[isLang]?.income}</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link fw-semibold" id="pills-profit-tab" data-bs-toggle="pill" data-bs-target="#pills-profit" type="button" role="tab" aria-controls="pills-profit" aria-selected="false">{translate[isLang]?.profit}</button>
                </li>
            </ul> */}

            {/* <div className="tab-content" id="pills-tabContent"> */}
                {/* <div className="tab-pane fade show active" id="pills-income" role="tabpanel" aria-labelledby="pills-income-tab" tabindex="0"> */}
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>

                            {type === '0' ?
                                <div className="app__dashboard_chart"  >
                                    <Container >
                                        <VisitsCharts
                                            isLang={isLang}
                                            color={'#8054A1'}
                                            title={translate[isLang]?.Column?.titleMonths}
                                            labels={fetchLabels}
                                            values={fetchValues}
                                            type={type}
                                        />
                                    </Container>
                                </div>
                                :
                                <div className="app__dashboard_chart"  >
                                    <Container >
                                        <VisitsCharts
                                            isLang={isLang}
                                            color={'#8054A1'}
                                            title={`${translate[isLang]?.Column?.titleDays}`}
                                            labels={fetchLabels}
                                            values={fetchValues}
                                            type={type}
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
                {/* </div> */}
                {/* <div className="tab-pane fade" id="pills-profit" role="tabpanel" aria-labelledby="pills-profit-tab" tabindex="0">...</div> */}
            {/* </div> */}

        </div>
      </Container>

    </>
  )
}

export default VisitsReports

