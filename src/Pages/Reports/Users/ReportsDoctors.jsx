import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { Dropdown, Form, FormControl, Row, Col, Button, Table } from 'react-bootstrap';
import { PostData, apiheader } from '../../../utils/fetchData';
import { useContext } from 'react';
import { VendersContext } from '../../../context/Store';
import initialTranslation from './Translation';
import Component from '../../../constants/Component';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ReportsDoctors = () => {
    const [translate, setTranslate] = useState(initialTranslation)
    const handelTranslate = () => setTranslate(initialTranslation)


    const [data, setData] = useState([]);
    const [transactionsData, setTransactions] = useState([]);
    let { isLang } = useContext(VendersContext);

    // !Filter by start date and end date
    let doctorRef = useRef()
    let startDate = useRef();
    let endDate = useRef();
    const [selectedItem, setSelectedItem] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoader, setIsloader] = useState(false);

    const handleSelect = (eventKey, event) => {
        const selectedItem = data?.find((item) => Number(item.IDDoctor) === Number(eventKey));
        setSelectedItem(selectedItem.DoctorName);
        doctorRef.current.value = selectedItem.IDDoctor
    };
    const filteredItems = data?.filter((item) => item.DoctorName.toLowerCase().includes(searchTerm.toLowerCase()));
    const doctorsAjax = async () => {
        const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors/ajax`, {}, apiheader);
        setData(data.Response)
    }
    const cacheDoctorsAjax = async () => {
        const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/cache`, { CachePage: 'DOCTOR_TRANSACTION' }, apiheader);
        setTransactions(data.Response)
        if (data.Response === null) {
            doctorsTransactions({
                IDDoctor: doctorRef.current.value,
                StartDate: startDate.current.value,
                EndDate: endDate.current.value
            })
        } else {
            startDate.current.value = data.Response.StartDate.split(" ")[0];
            endDate.current.value = data.Response.EndDate.split(" ")[0];
            // setSelectedItem(data.Response.IDDoctor)

            doctorsTransactions({
                IDDoctor: data.Response.IDDoctor,
                StartDate: data.Response.StartDate.split(" ")[0],
                EndDate: data.Response.EndDate.split(" ")[0]
            })
        }
    }
    const doctorsTransactions = async (dataDoctorsTransactions) => {
        return await PostData(`${process.env.REACT_APP_API_URL}/admin/reports/doctor/transactions`, dataDoctorsTransactions, apiheader).then(({ data }) => {
            setTransactions(data.Response)
            const timeoutId = setTimeout(() => {
                setIsloader(true)
            }, 0);
            return () => clearTimeout(timeoutId);
        }).catch((error) => {
            if (error.response && error.response.status === 429) {
                const retryAfter = error.response.headers['retry-after'];
                setTimeout(() => {
                    doctorsTransactions();
                }, (retryAfter || 60) * 1000);
            }
        })
    }

    useEffect(() => {
        doctorsAjax()
        handelTranslate()
        const currentDate = moment().format('YYYY-MM-DD');
        startDate.current.value = currentDate;
        endDate.current.value = currentDate;
        cacheDoctorsAjax()
        return () => {
            doctorsAjax()
        }
    }, [])

    const doctorsTransactionsClick = async () => {
        return await PostData(`${process.env.REACT_APP_API_URL}/admin/reports/doctor/transactions`, {
            IDDoctor: doctorRef.current.value,
            StartDate: startDate.current.value,
            EndDate: endDate.current.value
        }, apiheader).then(({ data }) => {
            setTransactions(data.Response)
            const timeoutId = setTimeout(() => {
                setIsloader(true)
            }, 0);
            return () => clearTimeout(timeoutId);
        }).catch((error) => {
            if (error.response && error.response.status === 429) {
                const retryAfter = error.response.headers['retry-after'];
                setTimeout(() => {
                    doctorsTransactions();
                }, (retryAfter || 60) * 1000);
            }
        })
    }
    return (
        <dic className='h-100'>
            <div className="app__addOrder-form ">
                <Row className="mb-3">
                    <Col xl={4} lg={4} md={6} sm={12} className=' mt-2'>
                        <Form.Group controlId="formBasicEmail" >

                            <Dropdown onSelect={handleSelect} >
                                <Dropdown.Toggle
                                    id="my-dropdown"
                                    as={FormControl}
                                    size='sm'
                                    defaultValue={selectedItem}
                                    type="text"
                                    placeholder={translate[isLang]?.placeholder1}
                                // placeholder="choose doctors name"

                                />

                                <Dropdown.Menu style={{ width: '100%', maxHeight: '200px', overflowY: 'auto' }}>
                                    <div style={{ position: 'sticky', left: '0', right: '0', background: '#fff', top: '-8px', padding: '5px 0px' }}>
                                        <FormControl
                                            id="my-dropdown"
                                            autoFocus
                                            className="filter__dropdown mx-3 my-2 "
                                            placeholder={translate[isLang]?.placeholder3}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            value={searchTerm}
                                        />
                                    </div>
                                    <div style={{ maxHeight: 'calc(100% - 40px)', overflowY: 'auto' }}>
                                        {filteredItems?.map((item) => (
                                            <Dropdown.Item
                                                ref={doctorRef}
                                                active={selectedItem === item.DoctorName}
                                                key={item.IDDoctor}
                                                eventKey={item.IDDoctor}
                                            >
                                                {item.DoctorName}
                                            </Dropdown.Item>
                                        ))}
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={12} >
                        <Form.Control size="sm" type="date" ref={startDate} className="w-100 mt-2" />
                    </Col>

                    <Col xl={3} lg={3} md={6} sm={12} >
                        <Form.Control size="sm" type="date" ref={endDate} className="w-100 mt-2" />
                    </Col>

                    <Col xl={2} lg={2} md={6} sm={12} >
                        <Button onClick={doctorsTransactionsClick} variant="outline-primary" size="sm" className="w-100 mt-2">{isLang === 'en' ? 'Search  ' : '    العثور على التقارير'}</Button>
                    </Col>
                </Row>
            </div>
            <div className="app__Users-table">
                {isLoader ? <>
                    <>
                        {
                            transactionsData?.length > 0 ?
                                <Table responsive={true} className='rounded-3 '>
                                    <thead>
                                        <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                                            {
                                                translate[isLang]?.TableHeader?.map((item, index) => (
                                                    <th key={index}>{item}</th>
                                                ))
                                            }
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {
                                            transactionsData?.map((item, index) => (

                                                <tr key={index}>
                                                    <td >
                                                        <Link to={`/reports/doctors/doctorTransactionsDetails/${item.IDLedger}`}>
                                                            <span className='ClientName'>{item?.UserName?.charAt(0).toUpperCase() + item?.UserName?.slice(1).toLowerCase()}</span>
                                                        </Link>
                                                    </td>
                                                    <td >
                                                        <span className='ClientName'>{item?.LedgerTransactionType?.charAt(0).toUpperCase() + item?.LedgerTransactionType?.slice(1).toLowerCase()}</span>
                                                    </td>
                                                    <td >
                                                        <span className='ClientName'>{item?.LedgerSource?.replace('_', " ").split("_").join(" ").charAt(0).toUpperCase() + item?.LedgerSource?.slice(1).toLowerCase().replace('_', " ").split("_").join(" ")}</span>
                                                    </td>
                                                    <td >
                                                        <span className='ClientName'>{item?.LedgerDestination?.replace('_', " ").split("_").join(" ").charAt(0).toUpperCase() + item?.LedgerDestination?.slice(1).toLowerCase().replace('_', " ").split("_").join(" ")}</span>

                                                    </td>

                                                    <td >
                                                        <h6 className="mb-0  pe-2 color-red">
                                                            {item?.LedgerAmount}  {translate[isLang]?.currency}
                                                        </h6>
                                                    </td>
                                                    <td >
                                                        <h6 className="mb-0  pe-2 color-red">
                                                            {item?.LedgerAmount}  {translate[isLang]?.currency}
                                                        </h6>
                                                    </td>

                                                    <td >
                                                        <h6 className="mb-0  pe-2 color-red">
                                                            {item?.BytrhCommission}  {translate[isLang]?.currency}
                                                        </h6>
                                                    </td>
                                                    <td >
                                                        <span className='ClientName'>{item?.LedgerDate.split(" ")[0]}</span>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>

                                </Table>
                                :
                                <Component.DataNotFound />
                        }
                    </>
                </> :
                    <Component.ReportsLoading reportName="doctor" />
                }
            </div>
        </dic>
    )
}

export default ReportsDoctors