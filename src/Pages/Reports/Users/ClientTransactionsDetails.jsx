import { FaMoneyBillAlt, FaUser, FaClock } from 'react-icons/fa';
import './payment.scss'
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { VendersContext } from '../../../context/Store';
import initialTranslation from './Translation';
import { GetData, apiheader } from '../../../utils/fetchData';
import { Container, Row, Col } from 'react-bootstrap';
import Component from './../../../constants/Component';
import PaymentLoader from '../../../Components/Shared/Payment/PaymentLoader';

const ClientTransactionsDetails = () => {
    let { id } = useParams()
    let { isLang } = useContext(VendersContext);
    const [translate, setTranslate] = useState(initialTranslation)
    const handelTranslate = () => {
        setTranslate(initialTranslation)
    }
    const [dataDoctorTransactionsDetails, setDataDoctorTransactionsDetails] = useState([]);
    const [isLoader, setIsloader] = useState(false);

    // get store
    const getDoctorTransactionsDetails = async () => {
        await GetData(`${process.env.REACT_APP_API_URL}/admin/reports/client/transactions/details/${id}`, apiheader).then((res) => {
            setDataDoctorTransactionsDetails(res.Response);
            const timeoutId = setTimeout(() => {
                setIsloader(true)
            }, 0);
            return () => clearTimeout(timeoutId);
        }).catch((error) => {
            if (error.response && error.response.status === 429) {
                const retryAfter = error.response.headers["retry-after"];
                setTimeout(() => {
                    getDoctorTransactionsDetails();
                }, (retryAfter || 60) * 1000);
            }
        });
    };
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day} , ${hours}:${minutes}`;
    };

    useEffect(() => {
        getDoctorTransactionsDetails();
        window.scrollTo(0, 0);
        handelTranslate()
        return () => {
            getDoctorTransactionsDetails();
        }
    }, [id, isLang]);
  return (
    <div className='app__blog'>
    <Container fluid>
        <Row>
            <Col xl={8} lg={8} md={8} sm={12} >
                <div className="app__addprodects">
                    <Component.SubNav sub__nav={[{ name: translate[isLang]?.nav.navDoctor3, path: '/reports/clients' },
                    { name: translate[isLang]?.nav.navDoctor2, path: `/reports/clients/clientTransactionsDetails/${id}` }]} />
                </div>

                <div className="payment-container">
                    <div className="payment-header d-flex gap-2 ">
                        <FaMoneyBillAlt className="payment-icon" />
                        <span className="payment-type">{translate[isLang]?.paymentClient.title} </span>
                    </div>
                    <div className="payment-details row">
                        <Col xl={6} lg={6} md={12} sm={12}>
                            <div className="payment-row">
                                <div className="payment-label">{translate[isLang]?.paymentClient?.label1}</div>
                                <div className="payment-value">{dataDoctorTransactionsDetails.DoctorName}</div>
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={12} sm={12}>
                            <div className="payment-row">
                                <div className="payment-label">{translate[isLang]?.paymentClient?.label4}</div>
                                <div className="payment-value">
                                    {dataDoctorTransactionsDetails?.LedgerType?.replace('_', " ").split("_").join(" ").charAt(0).toUpperCase() + dataDoctorTransactionsDetails?.LedgerType?.slice(1).toLowerCase().replace('_', " ").split("_").join(" ")}
                                </div>
                            </div>
                        </Col>

                        <Col xl={6} lg={6} md={12} sm={12}>
                            <div className="payment-row">
                                <div className="payment-label">{translate[isLang]?.paymentClient?.label5}</div>
                                {
                                    dataDoctorTransactionsDetails.StartTime &&
                                    <div className="payment-value">{formatDateTime(dataDoctorTransactionsDetails.StartTime)}</div>
                                }
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={12} sm={12}>
                            <div className="payment-row">
                                <div className="payment-label">{translate[isLang]?.paymentClient?.label6}</div>
                                {
                                    dataDoctorTransactionsDetails.EndTime &&
                                    <div className="payment-value">{formatDateTime(dataDoctorTransactionsDetails.EndTime)}</div>
                                }
                            </div>
                        </Col>

                        <Col xl={6} lg={6} md={12} sm={12}>
                            <div className="payment-row">
                                <div className="payment-label">{translate[isLang]?.paymentClient?.label2}</div>
                                <h6 className="mb-0 fw-bold  pe-2 color-red payment-value">
                                    {dataDoctorTransactionsDetails.ClientPayment}{' '}{translate[isLang]?.currency}
                                </h6>
                            </div>
                        </Col>
            {/*             <Col xl={6} lg={6} md={12} sm={12}>
                            <div className="payment-row">
                                <div className="payment-label">{translate[isLang]?.payment?.label3}</div>
                                <h6 className="mb-0 fw-bold pe-2 color-red payment-value">
                                    {dataDoctorTransactionsDetails.DoctorShare}{' '}{translate[isLang]?.currency}
                                </h6>
                            </div>
                        </Col> 

                        <Col xl={6} lg={6} md={12} sm={12}>
                            <div className="payment-row">
                                <div className="payment-label">{translate[isLang]?.payment?.label7}</div>
                                <h6 className="mb-0 fw-bold pe-2 color-red payment-value">
                                    {dataDoctorTransactionsDetails.AppShare}{' '}{translate[isLang]?.currency}
                                </h6>
                            </div>
                        </Col>  */}
                    </div>
                </div>
            </Col>
            <Col xl={4} lg={4} md={4} sm={12} className='d-flex justify-content-center align-items-center'>
                <PaymentLoader />
            </Col>
        </Row>
    </Container>
</div>
  )
}

export default ClientTransactionsDetails