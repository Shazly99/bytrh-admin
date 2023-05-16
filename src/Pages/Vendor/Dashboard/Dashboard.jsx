import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Component from '../../../constants/Component'
import './Dashboard.scss'
import { VendersContext } from '../../../context/Store';
import { PostData, apiheader } from '../../../utils/fetchData';
import initialTranslate from './initialTranslate';

function Dashboard() {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslate)
  const handelTranslate = () => {
    setTranslate(initialTranslate)
  }
  useEffect(() => {
    handelTranslate()
  }, [isLang])

  const [dashbordData, setDashborddata] = useState(null);
  const [isLoader, setIsloader] = useState(false);

  const HomePage = async (type) => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/home`, { FilterType: type }, apiheader).then(({ data }) => {
      setDashborddata(data.Response);
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 0);
      return () => clearTimeout(timeoutId);
    });

  }



  useEffect(() => {
    HomePage()
    handelTranslate()
  }, [isLang])



  return (
    <>
      {/* <div className="welcome__page   bg-body  " style={{ display: 'flex ', justifyContent: 'center', alignItems: 'center' }}>
        <div className="title_bytrh shadow-lg rounded-3">
          <h3>{translate[isLang]?.hello} </h3>
        </div>
      </div> */}
      <Container fluid>
        <div className="app__dashboard">
          <div className="app__dashboard_summary">
            <Component.Summary
              isLang={isLang}
              IncomeMoney={dashbordData?.IncomeAmount}
              doctorsIncomeMoney={dashbordData?.DoctorsIncomeAmount}
              totalProfit={dashbordData?.TotalProfit}
            />
          </div>

          <Row>
            <Col xl={8} lg={8} md={12} sm={12}>
              <div className="app__dashboard_chart"  >
                <Container >
                  <Component.ChartColumn
                    isLang={isLang}
                    urgent={dashbordData?.UrgentHomeVisits}
                    home={dashbordData?.HomeVisits}
                    center={dashbordData?.Visits}
                    color={'#66b9b1'}
                    label1={translate[isLang]?.Column?.label1}
                    label2={translate[isLang]?.Column?.label2}
                    label3={translate[isLang]?.Column?.label3}
                    title={translate[isLang]?.Column?.titleVisits}
                  />
                </Container>
              </div>

              <div className="app__dashboard_chart"  >
                <Container >
                  <Component.ChartColumn
                    isLang={isLang}
                    urgent={dashbordData?.AdoptedAnimals}
                    home={dashbordData?.SellingAnimals}
                    center={dashbordData?.BiddingAnimals}
                    color={'#8054A1'}
                    label1={translate[isLang]?.Column?.label4}
                    label2={translate[isLang]?.Column?.label5}
                    label3={translate[isLang]?.Column?.label6}
                    title={translate[isLang]?.Column?.titleAnimal}
                  />
                </Container>
              </div>
            </Col>
            <Col xl={4} lg={4} md={6} sm={6}>
              <div className="app__dashboard_chart"  >
                <Component.ChartCircle
                  isLang={isLang}
                  typeChart='donut'
                  client={dashbordData?.RegisteredClients}
                  doctor={dashbordData?.RegisteredDoctors}
                  label1={translate[isLang]?.Circle?.label1}
                  label2={translate[isLang]?.Circle?.label2}
                  title={translate[isLang]?.Circle?.titleUser}
                />
              </div>

              <div className="app__dashboard_chart"  >
                <Component.ChartCircle
                  isLang={isLang}
                  client={dashbordData?.ActiveClients}
                  doctor={dashbordData?.ActiveDoctors}
                  typeChart='pie'
                  label1={translate[isLang]?.Circle?.label3}
                  label2={translate[isLang]?.Circle?.label4}
                  title={translate[isLang]?.Circle?.titleActive}
                />
              </div>

              <div className="app__dashboard_chart"  >
                <Component.ChartCircle
                  isLang={isLang}
                  typeChart='donut'
                  client={dashbordData?.RegisteredClients}
                  doctor={dashbordData?.RegisteredDoctors}
                  label1={translate[isLang]?.Circle?.label1}
                  label2={translate[isLang]?.Circle?.label2}
                  title={translate[isLang]?.Circle?.titleUser}
                />
              </div>

              <div className="app__dashboard_chart"  >
                <Component.ChatOneLine
                  isLang={isLang}
                  doctor={dashbordData?.OnlineDoctors}
                  client={dashbordData?.ActiveDoctors}
                  typeChart='pie'
                  label1={translate[isLang]?.Circle?.label7}
                  label2={translate[isLang]?.Circle?.label8}
                  title={translate[isLang]?.Circle?.titleDoctors}
                />
              </div>
              {/* 
              <div className="app__dashboard_chart"  >
                <Component.ChartCircle
                  isLang={isLang} 
                  doctor={dashbordData?.OnlineDoctors}
                  typeChart='pie'
                  label1={translate[isLang]?.Circle?.label5} 
                  title={translate[isLang]?.Circle?.titleConsulting}
                />
              </div> 
              */}


            </Col>
          </Row>


        </div>
      </Container>
    </>
  )
}

export default Dashboard
