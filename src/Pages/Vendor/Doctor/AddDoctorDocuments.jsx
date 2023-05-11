import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GetData, PostData, apiheader } from '../../../utils/fetchData';
import { VendersContext } from '../../../context/Store';
import { useContext } from 'react';
import { useRef } from 'react';
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import Component from '../../../constants/Component';
import { toast } from 'react-hot-toast';


const AddDoctorDocuments = () => {
    let { id } = useParams();

    let { isLang } = useContext(VendersContext);
    const selectDate = useRef(null);
    const documentType = useRef(null);

    let navigate = useNavigate();

    // TODO:: select image
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const submit = e => {
        e.preventDefault()

        documentAdd({
            IDDoctor: id,
            DoctorDocumentType:  documentType.current.value,
            DoctorDocument: selectedImage,
            DoctorDocumentExpireDate: selectDate.current.value
        })

    }

    const documentAdd = async (addDocument) => {
        let data = await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors/documents/add`, addDocument, apiheader).then((res) => {

            if (res.data.Success === true) {
                toast.success(' Dr Documents has been added', {
                    duration: 4000,
                    position: 'bottom-center',
                    /*  icon: <Icons.upload color='#40AB45' size={25} />, */
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
                setTimeout(() => {
                    navigate(`/doctors/doctorProfile/${id}`);
                }, 2000);
            } else {
                toast.error(res.data.ApiMsg)
            }
        });
    }

    return (
        <>
            <Container fluid>
                <div className="app__addprodects">
                    {isLang === 'en' ?
                        <Component.SubNav sub__nav={[{ name: "Doctor Profile", path: `/doctors/doctorProfile/${id}` }, { name: "Add doctor document ", path: `/doctors/document/add/${id}` }]} />
                        :
                        <Component.SubNav sub__nav={[{ name: "الملف الشخصي للطبيب", path: `/doctors/doctorProfile/${id}` }, { name: "إضافة وثيقة الطبيب ", path: `/doctors/document/add/${id}` }]} />
                    }
                    <div className="app__addprodects__header ">

                        <Component.BaseHeader h1={isLang === 'ar' ? 'إضافة وثيقة الطبيب' : 'Add doctor document'} />
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
                                                />
                                            </Form.Group>


                                            <Form.Group controlId="formBasicEmail" >
                                                <Form.Label>{isLang == "ar" ? 'نوع وثيقة الطبيب' : 'Doctor document type'}</Form.Label>
                                                <Form.Select aria-label="Default select example" ref={documentType} >
                                                    {/* <option >{translateADS[isLang]?.optionAdvertisementLocation}</option> */}
                                                    {
                                                        [
                                                            { value: 'GRADUATION', textEn: 'Graduation', textAr: 'تخرُّج' },
                                                            { value: 'LICENSE', textEn: 'License  ', textAr: 'رخصة' },
                                                            { value: 'NATIONAL_ID', textEn: 'National id', textAr: 'الهوية الوطنية' },
                                                        ]?.map((item, index) => (
                                                            <option key={index} value={item.value}   >{isLang == "ar" ? item.textAr : item.textEn}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en d-flex justify-content-center">
                                            <Form.Group>
                                                <div className="mt-3  " style={{ width: "200px " }}>

                                                    {selectedImage && (
                                                        <img
                                                            loading="lazy"
                                                            src={URL.createObjectURL(selectedImage)}
                                                            alt={selectedImage.name}
                                                            className='rounded-3 w-100'
                                                        />
                                                    )
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
                                            <Link to={`/doctors/doctorProfile/${id}`}>
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

export default AddDoctorDocuments
