import React, { useState, useContext, useEffect } from 'react'
import { VendersContext } from '../../../context/Store';
// import { Container } from 'react-bootstrap'
// import Component from '../../../constants/Component'
import './Dashboard.scss'
import Map from './../../../GoogleMap/Map';
import MapModal from './../../../GoogleMap/MapModal';
function Dashboard() {
  let { isLang } = useContext(VendersContext);
  let initialTranslate = {
    "ar": {
      hello: 'مرحبًا بك في لوحة تحكم بيطرة '
    },
    "en": {
      hello: 'Welcome to Dashboard Bytrh'
    }
  }
  const [translate, setTranslate] = useState(initialTranslate)

  const handelTranslate = () => {
    setTranslate({
      "ar": {
        hello: 'مرحبًا بك في لوحة تحكم بيطرة '
      },
      "en": {
        hello: 'Welcome to Dashboard Bytrh'
      }
    })
  }
  useEffect(() => {
    handelTranslate()
  }, [isLang])

  return (
    <>
    <MapModal/>
      <div className="welcome__page   bg-body  " style={{ display: 'flex ', justifyContent: 'center', alignItems: 'center' }}>
        <div className="title_bytrh shadow-lg rounded-3">
          <h3>{translate[isLang]?.hello} </h3>
        </div>
      </div>
      {/* <Container fluid>
        <div className="app__dashboard">
          <div className="app__dashboard_summary">
            <Component.Summary />
          </div>

          <div className="app__dashboard_chart"  >
            <Container >
              <Component.ChartLine />
            </Container>
          </div>
          
          <div className="app__dashboard_chart"  >
            <Container >
              <Component.ChartColumn />
            </Container>
          </div>

 
        </div>
      </Container> */}
    </>
  )
}

export default Dashboard
