import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Summary = () => {
    return (
        <>
            <Row>
                <Col xl={4} lg={4} md={6} sm={12}>
                    <div className="app__summary mt-3">
                        <h5>This Day Orders</h5>
                        <span>89 Order</span>
                    </div>
                </Col>
                <Col xl={4} lg={4} md={6} sm={12}>
                    <div className="app__summary mt-3">
                        <h5>This Month Orders</h5>
                        <span>780 Order</span>
                    </div>
                </Col>
                <Col xl={4} lg={4} md={6} sm={12}>
                    <div className="app__summary mt-3">
                        <h5>This year Orders</h5>
                        <span>1780 Order</span>

                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Summary
