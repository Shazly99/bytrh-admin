
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import translateBaggingPrice from './baggingPrice';
import Component from "../../../../constants/Component";
import Icons from "../../../../constants/Icons";
import useSkeletonTable from "../../../../utils/useSkeletonTable";
import { VendersContext } from "../../../../context/Store";
import { useParams } from "react-router-dom";
import { apiheader, GetData, PostData } from "../../../../utils/fetchData";



const DoctorService = () => {
    let { id } = useParams()

    let { isLang } = useContext(VendersContext);
    const [docService, setDocService] = useState(null);
    const [editdocService, setEditDocService] = useState({});
    const [page, setPage] = useState(1);
    const [PagesNumber, setPagesNumber] = useState("");
    const [isLoader, setIsloader] = useState(false);

    let { SkeletonTable, SkeletonFilters } = useSkeletonTable();

    let changePrice = useRef()
    // Modal Table Delete
    const [modalShow, setModalShow] = React.useState(false);
    const [modalIndex, setModalIndex] = React.useState(0);
    function handleModalClose() {
        setModalShow(false);
    }
    function handleModalOpen(index) {
        setModalIndex(index);
        setModalShow(true);
    }
    // Modal Table Edit
    const [modalShowEdit, setModalShowEdit] = React.useState(false);
    const [modalIndexEdit, setModalIndexEdit] = React.useState(0);
    function handleModalCloseEdit() {
        setModalShowEdit(false);
    }
    function handleModalOpenEdit(index,IDDoctorService) {
        getDeatailsdoctorService(IDDoctorService).then((res)=>{
            setEditDocService(res.Response)
        })
        setModalIndexEdit(index);
        setModalShowEdit(true);
    }

    // pagination
    const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;

    // get doctorService
    const doctorService = async () => {
        await PostData(
            `${process.env.REACT_APP_API_URL}/admin/doctors/services`,
            { IDDoctor: id },
            apiheader
        )
            .then(({ data }) => {
                setDocService(data.Response.DoctorServices);
                setPagesNumber(data.Response.Pages);
                const timeoutId = setTimeout(() => {
                    setIsloader(true)
                }, 0);
                return () => clearTimeout(timeoutId);
            })
            .catch((error) => {
                if (error.response && error.response.status === 429) {
                    const retryAfter = error.response.headers["retry-after"];
                    setTimeout(() => {
                        doctorService();
                    }, (retryAfter || 60) * 1000);
                }
            });
    };

    // pagination
    const handleChange = (event, value) => {
        setPage(value);
    };

    // change status Delete 
    const handleActionSelect = async (id) => {
        await doctorServiceStatus(id).then((res) => {
            toast.success(translateBaggingPrice[isLang]?.toast3, {
                duration: 4000,
                position: "top-center",
                // icon: <Icons.UploadItem color="#3182CE" size={20} />,
                iconTheme: {
                    primary: "#E20000",
                    secondary: "#fff",
                },
            });
        });
        handleModalClose()
        await doctorService();
    };
    const doctorServiceStatus = async (id) => {
        return await GetData(
            `${process.env.REACT_APP_API_URL}/admin/doctors/services/status/${id}`,
            apiheader
        );
    };



    const handleChangePrice = async (IDDocService) => {
        await doctorServiceChangePrice(
            {
                IDDoctor: id, IDService: IDDocService, DoctorServicePrice: changePrice.current.value
            }
        ).then((res) => {
            toast.success(translateBaggingPrice[isLang]?.toast2, {
                duration: 4000,
                position: "top-center",
                // icon: <Icons.UploadItem color="#3182CE" size={20} />,
                iconTheme: {
                    primary: "#3182CE",
                    secondary: "#fff",
                },
            });
        });
        handleModalCloseEdit()
        await doctorService();
    };
    const doctorServiceChangePrice = async (priceUpdate) => {
        return await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors/services/add `, priceUpdate, apiheader);
    };

    const getDeatailsdoctorService = async (IDService) => {
        return await GetData(`${process.env.REACT_APP_API_URL}/admin/doctors/services/edit/page/${IDService}`, apiheader);
    };

    // search and filter

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            doctorService(page);
            window.scrollTo(0, 0);
        }, 200);
        return () => clearTimeout(timeoutId);

    }, [page, isLang]);
    useEffect(() => { }, [page, PagesNumber]);


    return (
        <>

            <div className="app__Users ">

                <Component.SubNav sub__nav={[
                    { name: translateBaggingPrice[isLang]?.nav[0].navList1, path: `/doctors` },
                    { name: translateBaggingPrice[isLang]?.nav[1].navList2, path: `/doctors/Service/list/${id}` }
                ]} />
                <div className="app__Users-table ">
                    {isLoader ? <>
                        <Component.ButtonBase
                            title={translateBaggingPrice[isLang]?.addBTN}
                            bg={"primary"}
                            icon={<Icons.Add size={21} color={"#ffffffb4"} />}
                            path={`/doctors/Service/add/${id}`}
                        />
                    </> :
                        <div className="mt-3 p-2">
                            {SkeletonFilters(40, 150)}
                        </div>
                    }
                    {isLoader ? <>
                        <Table responsive={true} className="rounded-3 ">
                            <thead>
                                <tr
                                    className="text-center  "
                                    style={{ background: "#F9F9F9" }}
                                >
                                    {translateBaggingPrice[isLang]?.TableHeader?.map((el, i) => (
                                        <th key={i}>{el}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {docService?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div>{item?.ServiceName}</div>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <h6 className={`mb-0 ${isLang === 'ar' ? 'ps-2' : 'pe-2'} color-red`}>{item?.DoctorServicePrice}{' '}{isLang === 'ar' ? 'ريال سعودي' : 'SAR'}</h6>
                                                <Icons.edit
                                                    onClick={() => handleModalOpenEdit(index,item.IDDoctorService )}
                                                />
                                                <Modal
                                                    show={modalShowEdit && modalIndexEdit === index}
                                                    onHide={handleModalCloseEdit}
                                                    centered
                                                    dir={isLang === 'ar' ? 'rtl' : 'ltr'}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title className='w-100 text-center'>{translateBaggingPrice[isLang]?.ModalHeader}</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                                                        <input className="form-control" defaultValue={item.DoctorServicePrice} ref={changePrice} />
                                                    </Modal.Body>
                                                    <Modal.Footer className="d-flex justify-content-center align-items-center">

                                                        <Button variant="outline-primary" onClick={handleModalCloseEdit}>
                                                            {translateBaggingPrice[isLang]?.CancelBTN}
                                                        </Button>
                                                        <Button onClick={() => handleChangePrice(editdocService?.IDService)}>
                                                            {translateBaggingPrice[isLang]?.ModalSetPrice}
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>


                                            </div>
                                        </td>
                                        <td >
                                            <div>
                                                <span style={{ height: 'fit-content !important' }} className={`  ${item?.DoctorServiceActivated === 1 && 'txt_delivered'}  ${item?.DoctorServiceActivated === 0 && 'txt_rejected'} `} >
                                                    {item?.DoctorServiceActivated === 1 ?
                                                        isLang === 'ar' ? 'نشــط' : 'Active'
                                                        :
                                                        isLang === 'ar' ? 'غير نشـط' : 'InActive'
                                                    }
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <span>
                                                    <Button
                                                        variant=" outline-sucess"
                                                        onClick={() => handleModalOpen(index)}
                                                        className="DropdownButton outline-sucess"
                                                    >
                                                        {isLang === 'ar' ? 'حـذف' : 'Detete'}
                                                    </Button>
                                                    <Modal
                                                        show={modalShow && modalIndex === index}
                                                        onHide={handleModalClose}
                                                        centered
                                                        dir={isLang === 'ar' ? 'rtl' : 'ltr'}
                                                    >
                                                        <Modal.Header closeButton>
                                                            <Modal.Title className='  w-100 '>{translateBaggingPrice[isLang]?.ModalHeaderDel}</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                                                            <Component.HandelDelete />

                                                            <input className="form-control" defaultValue={item.DoctorServicesPrice} disabled />
                                                        </Modal.Body>
                                                        <Modal.Footer className="d-flex justify-content-center align-items-center">

                                                            <Button variant="danger" style={{ border: '#dc3545' }} onClick={() => handleActionSelect(item.IDDoctorService)}>
                                                                {translateBaggingPrice[isLang]?.ModalDelPrice}
                                                            </Button>
                                                            <Button variant="outline-primary" onClick={handleModalClose}>
                                                                {translateBaggingPrice[isLang]?.CancelBTN}
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </> :
                        SkeletonTable()
                    }
                </div>
            </div>
            <div className="pagination " dir="ltr">
                {
                    pageCount &&
                    <Box
                        sx={{
                            margin: "auto",
                            width: "fit-content",
                            alignItems: "center",
                        }}
                    >
                        <Pagination
                            count={pageCount}
                            page={page}
                            onChange={handleChange}
                        />
                    </Box>
                }
            </div>
        </>
    )
}

export default DoctorService