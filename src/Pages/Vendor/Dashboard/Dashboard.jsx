import React from 'react'
import { Container } from 'react-bootstrap'
import Component from '../../../constants/Component'
import './Dashboard.scss'
function Dashboard() {
  
  return (
    <>
      <Container fluid>
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
      </Container>
    </>
  )
}

export default Dashboard
