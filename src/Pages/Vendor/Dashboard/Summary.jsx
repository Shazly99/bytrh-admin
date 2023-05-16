import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import initialTranslate from './initialTranslate'

const Summary = ({ IncomeMoney, doctorsIncomeMoney, totalProfit, isLang, WalletAmount }) => {

    const [translate, setTranslate] = useState(initialTranslate)
    const handelTranslate = () => {
        setTranslate(initialTranslate)
    }
    useEffect(() => {
        handelTranslate()
    }, [isLang])

    return (
        <>
            <Row>
                {/*   
                <Col xl={3} lg={3} md={6} sm={12}>
                    <div className="app__summary mt-3">
                        <h5>  money in wallets</h5>
                        <span>89 Sale </span>
                    </div>
                </Col> */}
                <Col xl={3} lg={3} md={6} sm={12}>
                    <div className="app__summary mt-4">
                        <h5> {translate[isLang]?.Summary?.IncomeMoney} </h5>
                        <span>{IncomeMoney} {' '} {translate[isLang]?.currency}</span>
                    </div>
                </Col>
                <Col xl={3} lg={3} md={6} sm={12}>
                    <div className="app__summary mt-4">
                        <h5> {translate[isLang]?.Summary?.doctorsIncomeMoney} </h5>
                        <span>{doctorsIncomeMoney}{' '} {translate[isLang]?.currency} </span>
                    </div>
                </Col>
                <Col xl={3} lg={3} md={6} sm={12}>
                    <div className="app__summary mt-4">
                        <h5>{translate[isLang]?.Summary?.totalProfit} </h5>
                        <span>{totalProfit} {' '} {translate[isLang]?.currency} </span>
                    </div>
                </Col>

                <Col xl={3} lg={3} md={6} sm={12}>
                    <div className="app__summary mt-4">
                        <h5>{translate[isLang]?.Summary?.WalletAmount} </h5>
                        <span>{WalletAmount} {' '} {translate[isLang]?.currency} </span>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Summary
