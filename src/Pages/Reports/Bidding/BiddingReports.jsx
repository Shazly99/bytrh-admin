import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'
import '../../Vendor/Dashboard/Dashboard.scss'
import { VendersContext } from '../../../context/Store';
import { apiheader } from '../../../utils/fetchData';
import initialTranslate from './initialTranslate';
import BiddingCharts from './BiddingCharts';


function BiddingReports() {

  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslate)
  const handelTranslate = () => {
    setTranslate(initialTranslate)
  }


  const [type, setFilterType] = useState('0');
//   const [typeText, setFilterTypeText] = useState('all');


 const api = `https://bytrh.com/api/admin/reports/bidding`

  const [loading, setLoading] = useState(false);
  const [fetchLabels, setFetchLabels] = useState([]);
  const [fetchValues, setFetchValues] = useState([]);

  async function getData() {
    setLoading(true);
    await axios.post(api , {
        FilterType: type,
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
  }, [isLang , type])



  return (
    <>
      <Container fluid>
        <div className="app__dashboard">
        
            <div className="mt-5 row d-flex align-items-center gy-3 gy-md-0">
                <div className="col-md-7 col-8">
                    <div className="group-reports">
                        <label htmlFor="selectMonth" className="fs-5 fw-semibold mb-2 color-red">{translate[isLang]?.LabelMonths}</label>
                        <select name="selectMonth" id="selectMonth" defaultValue={'0'} dir='ltr' onChange={(e) => {
                            setFilterType(e.target.value);
                            // setFilterTypeText(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text);
                        }} className=' p-2 form-select fw-semibold color-red'>
                            {translate[isLang]?.OptionMonths.map((el , i) => {
                                return <option key={i} value={el.val}>{el.label}</option>
                            })}
                        </select>
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
                                        <BiddingCharts
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
                                        <BiddingCharts
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

                        </Col>
                        
                    </Row>
                {/* </div> */}
                {/* <div className="tab-pane fade" id="pills-profit" role="tabpanel" aria-labelledby="pills-profit-tab" tabindex="0">...</div> */}
            {/* </div> */}

        </div>
      </Container>

    </>
  )
}

export default BiddingReports