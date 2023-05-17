import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GetData, PostData, apiheader } from '../../../utils/fetchData';
import { VendersContext } from '../../../context/Store';
import { useContext } from 'react';
import { useRef } from 'react';
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import Component from '../../../constants/Component';
import { toast } from 'react-hot-toast'; 


const EditDoctorDocuments = () => {
    let { idDoc, idDocument } = useParams();
    let { isLang } = useContext(VendersContext);
    const selectDate = useRef(null);
    const [selectedDate, setSelectedDate] = useState('');

    let navigate = useNavigate();

    const [editPage, setEditPage] = useState(null)

    const EditPage = async () => {
        let data = await GetData(`${process.env.REACT_APP_API_URL}/admin/doctors/documents/edit/page/${idDocument}`, apiheader)
        setEditPage(data.Response);
        setSelectedDate(data?.Response?.DoctorDocumentExpireDate?.split(" ")[0])
    }
    // TODO:: select image
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const submit = e => {
        e.preventDefault()
        
        documentsEdit({
            IDDoctor: idDoc,
            IDDoctorDocument: idDocument,
            DoctorDocument: selectedImage,
            DoctorDocumentExpireDate: selectDate.current.value
        })

    }

    const documentsEdit = async (editAds) => {
        let data = await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors/documents/edit`, editAds, apiheader).then((res) => {

            if (res.data.Success === true) {
                toast.success(' Dr Documents has been modified', {
                    duration: 4000,
                    position: 'bottom-center',
                    /*  icon: <Icons.upload color='#40AB45' size={25} />, */
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
                setTimeout(() => {
                    navigate(`/doctors/doctorProfile/${idDoc}`);
                }, 2000);
            } else {
                toast.error(res.data.ApiMsg)
            }
        });
    }
    useEffect(() => {

        let timeOut = setTimeout(() => {
            EditPage()
        }, 100);
        return () => {
            clearTimeout(timeOut)
        }
    }, [isLang])

    return (
        <>
            <Container fluid>
                <div className="app__addprodects">
                    { isLang === 'en' ?
                        <Component.SubNav sub__nav={[{ name: "Doctor Profile", path: `/doctors/doctorProfile/${idDoc}` }, { name: "Edit doctor document ", path: `/doctors/document/edit/${idDoc}/${idDocument}` }]} />
                        :
                        <Component.SubNav sub__nav={[{ name: "الملف الشخصي للطبيب", path: `/doctors/doctorProfile/${idDoc}` }, { name: "تحرير وثيقة الطبيب ", path: `/doctors/document/edit/${idDoc}/${idDocument}` }]} />
                    }
                    <div className="app__addprodects__header ">

                        <Component.BaseHeader h1={isLang === 'ar' ? 'تحرير وثيقة الطبيب' : 'Edit doctor document'} />
                        <div className="app__addOrder-form">
                            <div className="app__addprodects-form">
                                <form onSubmit={submit}>
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                                            <Form.Group>
                                                <Form.Label>{isLang === 'ar' ? '  الوثيقــة  ' : ' Document'}</Form.Label>
                                                <FormControl
                                                    id="custom-file"
                                                    type="file"
                                                    label={selectedImage ? selectedImage.name : 'Choose file'}
                                                    ref={fileInputRef}
                                                    onChange={handleImageSelect}
                                                    accept="image/*"
                                                />
                                            </Form.Group>

                                            <Form.Group className='mt-4'>
                                                <Form.Label>{isLang === 'ar' ? 'تاريخ انتهاء الصلاحية' : 'Expire Date'}</Form.Label>
                                                <FormControl
                                                    id="custom-file"
                                                    type="date"
                                                    ref={selectDate}
                                                    value={selectedDate}
                                                /> 
                                            </Form.Group>
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en d-flex justify-content-center">
                                            <Form.Group>
                                                <div className="mt-3  " style={{ width: "200px " }}>

                                                    {selectedImage ? (
                                                        <img
                                                            loading="lazy"
                                                            src={URL.createObjectURL(selectedImage)}
                                                            alt={selectedImage.name}
                                                            className='rounded-3 w-100'
                                                        />
                                                    ) :
                                                        <img
                                                            loading="lazy"
                                                            src={editPage?.DoctorDocumentPath}
                                                            className='rounded-3 w-100'
                                                        />
                                                    }
                                                </div>
                                            </Form.Group>
                                        </Col>


                                    </Row>
                                    <div className='d-flex justify-content-center align-content-center my-5'>

                                        <div className='baseBtn1'>
                                            <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                {isLang == "en" ? 'Save' : 'حفــظ'}
                                            </Button>
                                        </div>

                                        <div className='baseBtn w-auto'>
                                            <Link to={`/doctors/doctorProfile/${idDoc}`}>
                                                <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                    {isLang == "en" ? 'Cancel' : 'رجـوع'}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default EditDoctorDocuments
