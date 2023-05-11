import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Summary = () => {
    return (
        <>
            <Row>
                <Col xl={3} lg={3} md={6} sm={12}>
                    <div className="app__summary mt-3">
                        <h5>  Animals for sale</h5>
                        <span>89 Sale </span>
                    </div>
                </Col>
                <Col xl={3} lg={3} md={6} sm={12}>
                    <div className="app__summary mt-3">
                        <h5>  Animals for bidding</h5>
                        <span>78 Bidding</span>
                    </div>
                </Col>
                <Col xl={3} lg={3} md={6} sm={12}>
                    <div className="app__summary mt-3">
                        <h5>  Active client</h5>
                        <span>1780 </span>
                    </div>
                </Col>
                <Col xl={3} lg={3} md={6} sm={12}>
                    <div className="app__summary mt-3">
                        <h5>  Online doctors</h5>
                        <span>1780 </span>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Summary
