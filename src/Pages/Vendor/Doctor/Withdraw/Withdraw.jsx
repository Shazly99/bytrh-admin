import React, { useContext, useEffect, useRef, useState } from 'react'
import { PostData, apiheader } from '../../../../utils/fetchData'
import { useParams } from 'react-router-dom'
import useSkeletonTable from '../../../../utils/useSkeletonTable'
import initialTranslation from './Translation'
import { VendersContext } from '../../../../context/Store'
import { DropdownButton, Table, Dropdown, Modal, Button, Row, Col, FormControl, Form } from 'react-bootstrap'
import Component from '../../../../constants/Component'
import { toast } from 'react-hot-toast'
import img from '../../../../assets/Img'
const Withdraw = () => {

    let { id } = useParams()
    let { isLang } = useContext(VendersContext);
    // TODO:: select image
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const [withdrawData, setWithdrawData] = useState([])
    const [isLoader, setIsloader] = useState(false);
    let { SkeletonTable, SkeletonFilters } = useSkeletonTable();

    let startDate = useRef()
    let endDate = useRef()


    // ** display Reason 
    const [modalShowReason, setModalShowReason] = useState(false);
    const [modalIndexReason, setModalIndexReason] = useState(0);
    const handleModalCloseReason = () => setModalShowReason(false);
    // ToDo::change  status rejected
    const [modalShow, setModalShow] = React.useState(false);
    const [modalIndex, setModalIndex] = React.useState(0);
    let reasonRef = useRef()
    //!Modal 
    const handleModalClose = () => setModalShow(false)
    function handleModalOpen(index) {
        setModalIndex(index);
        setModalShow(true);
    }
    function handleModalOpenReason(index) {
        setModalIndexReason(index);
        setModalShowReason(true);
    }
    //!change withdraws reason to processed 
    const [modalShowProcessed, setModalShowProcessed] = React.useState(false);
    const [modalIndexProcessed, setModalIndexProcessed] = React.useState(0);
    const handleModalCloseProcessed = () => setModalShowProcessed(false)
    function handleModalOpenProcessed(index) {
        setModalIndexProcessed(index);
        setModalShowProcessed(true);
    }
    // withdrow status
    const handleActionSelect = async (id, action) => {
        if (action === "PROCESSED") {
            handleModalOpenProcessed(id)
        } else if (action === "REJECTED") {
            handleModalOpenReason(id)
        }
    };
    const WithdrawGetData = async () => {
        await PostData(
            `${process.env.REACT_APP_API_URL}/admin/doctors/withdraws`,
            { IDDoctor: id },
            apiheader
        )
            .then(({ data }) => {
                setWithdrawData(data.Response);
                const timeoutId = setTimeout(() => {
                    setIsloader(true)
                }, 0);
                return () => clearTimeout(timeoutId);
            })
            .catch((error) => {
                if (error.response && error.response.status === 429) {
                    const retryAfter = error.response.headers["retry-after"];
                    setTimeout(() => {
                        WithdrawGetData();
                    }, (retryAfter || 60) * 1000);
                }
            });
    };

    // reason rejected
    const reasonReject = async (id, action) => {
        await doctorWithdrawRequestStatus({
            IDDoctorWithdraw: id,
            WithdrawRejectReason: reasonRef.current.value,
            WithdrawStatus: action,
        }).then((res) => {
            if (res?.data?.Success === true) {
                toast.success(<strong>{initialTranslation[isLang]?.toast.update}</strong>, {
                    duration: 4000,
                    position: 'bottom-center',
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
                handleModalCloseReason()
            } else {
                toast.error(res?.data?.ApiMsg)
            }
        });
        await WithdrawGetData();
    }
    // withdrow file send when status is processed
    const WithdrawFileProcessed = async (id, action) => {
        console.log(
            {
                IDDoctorWithdraw: id,
                WithdrawFilePath: selectedImage,
                WithdrawStatus: action,
            })

        // );
        await doctorWithdrawRequestStatus({
            IDDoctorWithdraw: id,
            WithdrawFilePath: selectedImage,
            WithdrawStatus: action,
        }).then((res) => {
            if (res?.data?.Success === true) {
                toast.success(<strong>{initialTranslation[isLang]?.toast.update}</strong>, {
                    duration: 4000,
                    position: 'bottom-center',
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
                handleModalCloseProcessed()
            } else {
                toast.error(res?.data?.ApiMsg)
            }
        });
        await WithdrawGetData();
    }
    const doctorWithdrawRequestStatus = async (status) => {
        return await PostData(`https://bytrh.com/api/admin/doctors/withdraws/status`, status, apiheader)
    }


    useEffect(() => {
        WithdrawGetData()
        return () => {
            WithdrawGetData()
        }
    }, [id])

    return (
        <>


            <div className="app__Users ">

                <Component.SubNav sub__nav={[
                    { name: initialTranslation[isLang]?.nav[0].navList1, path: `/doctors` },
                    { name: initialTranslation[isLang]?.nav[1].navList2, path: `/doctors/withdraw/${id}` }
                ]} />
                <div className="app__Users-table ">


                    {isLoader ? <>
                        <>
                            {
                                withdrawData?.length > 0 ?
                                    <Table responsive={true} className="rounded-3 ">
                                        <thead>
                                            <tr className="text-center  " style={{ background: "#F9F9F9" }}  >
                                                {initialTranslation[isLang]?.TableHeader?.map((el, i) => (
                                                    <th key={i}>{el}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {withdrawData?.map((item, index) => (
                                                <tr key={index}>
                                                    <td className='img'>
                                                        <div>{item?.WithdrawAccountNumber}</div>
                                                    </td>

                                                    <td className='img'>
                                                        <div className="d-flex gap-1">
                                                            <h6 className={`mb-0 ${isLang === 'ar' ? 'ps-2' : 'pe-2'} color-red`}>{item?.WithdrawAmount}{' '}{isLang === 'ar' ? 'ريال سعودي' : 'SAR'}</h6>
                                                        </div>
                                                    </td>

                                                    <td className='img'>
                                                        <div>{item?.WithdrawAccountName}</div>
                                                    </td>

                                                    <td className='img'>
                                                        <div>{item?.WithdrawBankName}</div>
                                                    </td>

                                                    <td className='img'>
                                                        <div>{item?.WithdrawIBAN}</div>
                                                    </td>

                                                    <td className='text-center d-flex '>
                                                        <div className='blog__status d-flex flex-column justify-content-center '>
                                                            <div className='blog__status d-flex flex-row'>
                                                                <span style={{ height: 'fit-content !important' }} className={`   ${item.WithdrawStatus === 'PENDING' && 'txt_pending'}  ${item?.WithdrawStatus === 'PROCESSED' && 'txt_delivered'} ${item?.WithdrawStatus === 'REJECTED' && 'txt_rejected'}  `} >
                                                                    {isLang === 'en' && item?.WithdrawStatus && item?.WithdrawStatus[0].toUpperCase()}
                                                                    {isLang === 'en' && item?.WithdrawStatus && item?.WithdrawStatus.slice(1).toLowerCase().replace('_', ' ')}
                                                                    {isLang === 'ar' && item?.WithdrawStatus === 'PROCESSED' ? 'تمت المعالجة ' : ''}
                                                                    {isLang === 'ar' && item?.WithdrawStatus === 'REJECTED' ? ' مرفوض ' : ''}
                                                                    {isLang === 'ar' && item?.WithdrawStatus === 'PENDING' ? ' قيد الانتظار ' : ''}
                                                                </span>
                                                            </div>

                                                            {
                                                                item?.WithdrawStatus == "REJECTED" &&
                                                                <div className="app__reason">
                                                                    <a onClick={() => handleModalOpen(item?.IDDoctorWithdraw)} >Reason</a>
                                                                </div>
                                                            }

                                                        </div>
                                                    </td>

                                                    <td >
                                                        <div className="d-flex flex-column justify-content-center align-content-center" style={{ gap: "0" }}  >
                                                            <span className="ClientName">  {" "}    {item?.WithdrawDate.split(" ")[0]}{" "}   </span>
                                                            <span className="ClientPhone">  {" "} {item?.WithdrawDate.split(" ")[1]}  </span>
                                                        </div>
                                                    </td>
                                                    <td className='img'>
                                                        {
                                                            item?.WithdrawFilePathType === "NONE" &&
                                                            <img
                                                                loading="lazy"
                                                                src={img.defaultImg} // use normal <img> attributes as props
                                                                className=" rounded-2"
                                                                width={'150px'}
                                                                height={'100px'}
                                                            />
                                                        }

                                                        {
                                                            item?.WithdrawFilePathType === "PDF" &&
                                                            <a className='btn btn-outline-primary' href={item.WithdrawFilePath} target='_blank' download>
                                                                {isLang === 'ar' ? 'تحميل الملف' : 'Download File'}
                                                            </a>
                                                        }

                                                        {
                                                            item?.WithdrawFilePathType === "IMAGE" &&
                                                            <img
                                                                loading="lazy"
                                                                src={item.WithdrawFilePath} // use normal <img> attributes as props
                                                                className=" rounded-2"
                                                                width={'150px'}
                                                                height={'100px'}
                                                            />
                                                        }
                                                    </td>
                                                    <td>
                                                        <div >
                                                            <span>
                                                                <DropdownButton
                                                                    id={`dropdown-${item.IDUser}`}
                                                                    title={initialTranslation[isLang].ActionsNamebtn}
                                                                    variant="outline-success"
                                                                    onSelect={(eventKey) => handleActionSelect(item.IDDoctorWithdraw, eventKey)}
                                                                    className="DropdownButton "
                                                                    disabled={item.WithdrawStatus === 'PENDING' ? false : true}
                                                                >
                                                                    {
                                                                        initialTranslation[isLang]?.FilterStatus?.filter?.((item) => item.value !== "All").map((status, index) => (
                                                                            <React.Fragment key={index}>
                                                                                {
                                                                                    item?.UserStatus === status.value ? '' : <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey={status.value}>{status.text}</Dropdown.Item>
                                                                                }
                                                                            </React.Fragment>
                                                                        ))
                                                                    }
                                                                </DropdownButton>
                                                            </span>
                                                        </div>


                                                    </td>

                                                    <Modal
                                                        show={modalShow && modalIndex === item.IDDoctorWithdraw}
                                                        onHide={handleModalClose}
                                                        centered
                                                        dir={isLang === 'ar' ? 'rtl' : 'ltr'}
                                                    >
                                                        <Modal.Header closeButton>
                                                            <Modal.Title className='  w-100 '>  Reason</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                                                            <textarea className="form-control" rows="5" defaultValue={item?.WithdrawRejectReason} />
                                                        </Modal.Body>
                                                        <Modal.Footer className="d-flex justify-content-center align-items-center">
                                                            <Button onClick={handleModalClose}    >
                                                                Cancel
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>

                                                    <Modal
                                                        show={modalShowReason && modalIndexReason === item.IDDoctorWithdraw}
                                                        onHide={handleModalCloseReason}
                                                        centered
                                                        dir={isLang === 'ar' ? 'rtl' : 'ltr'}
                                                    >
                                                        <Modal.Header closeButton>
                                                            <Modal.Title className='  w-100 '>{isLang == "ar" ? 'سبب الرفض ' : 'Reject Reason'} </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                                                            <textarea className="form-control" rows="5" ref={reasonRef} />
                                                        </Modal.Body>
                                                        <Modal.Footer className="d-flex justify-content-center align-items-center">
                                                            <Button variant="danger" style={{ border: '#dc3545' }} onClick={() => reasonReject(item.IDDoctorWithdraw, 'REJECTED')} >
                                                                {isLang == "ar" ? '   تحديد السبب ' : 'Set Reason'}
                                                            </Button>
                                                            <Button variant="outline-primary" onClick={handleModalCloseReason}>
                                                                {isLang == "ar" ? '   رجوع ' : 'Cancel '}
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>


                                                    <Modal
                                                        show={modalShowProcessed && modalIndexProcessed === item.IDDoctorWithdraw}
                                                        onHide={handleModalCloseProcessed}
                                                        centered
                                                        dir={isLang === 'ar' ? 'rtl' : 'ltr'}
                                                    >
                                                        <Modal.Header closeButton>
                                                            <Modal.Title className='  w-100 '>
                                                                {isLang == "ar" ? '  سحب الملف   ' : 'ٍWithdraw File'}
                                                            </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                                                            <Row>
                                                                <Col xl={12} lg={12} md={12} sm={12} className="mt-3">
                                                                    <Form.Group>
                                                                        <FormControl
                                                                            id="custom-file"
                                                                            type="file"
                                                                            label={selectedImage ? selectedImage.name : 'Choose file'}
                                                                            ref={fileInputRef}
                                                                            onChange={handleImageSelect}
                                                                            accept="image/* pdf/*"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xl={12} lg={12} md={12} sm={12} className="mt-3 d-flex justify-content-center">
                                                                    <Form.Group>
                                                                        <div className="mt-3  " style={{ width: "200px " }}>
                                                                            {selectedImage && (
                                                                                <img
                                                                                    loading="lazy"
                                                                                    src={URL.createObjectURL(selectedImage)}
                                                                                    alt={selectedImage.name}
                                                                                    className='rounded-3 w-100'
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </Modal.Body>
                                                        <Modal.Footer className="d-flex justify-content-center align-items-center">
                                                            <Button className='btn__processed' style={{ border: '#66b9b1' }} onClick={() => WithdrawFileProcessed(item.IDDoctorWithdraw, 'PROCESSED')} >

                                                                {isLang == "ar" ? '   تحديد الملف ' : 'Set Withdraw File'}

                                                            </Button>
                                                            <Button variant="outline-primary" onClick={handleModalCloseProcessed}>
                                                                {isLang == "ar" ? '   رجوع ' : 'Cancel '}

                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    :
                                    <Component.DataNotFound />
                            }
                        </>
                    </> :
                        SkeletonTable()
                    }
                </div>
            </div>
        </>
    )
}

export default Withdraw