import React, { useRef, useEffect, useState, useContext } from 'react'
import { apiheader, GetData, PostData } from '../../../utils/fetchData';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Col, Container, Row, Form, Button, FormControl } from 'react-bootstrap';
import Icons from '../../../constants/Icons';
import Component from '../../../constants/Component'
import { VendersContext } from "../../../context/Store";
import translateCategories from './translateCategories';


const EditAnimalCat = () => {
    let { id } = useParams()
    let navigate = useNavigate();
    const CategoryNameEn = useRef();
    const CategoryNameAr = useRef();
    const [editPage, setCategoryDetail] = useState(null)

    // TODO:: select image
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };


    const submit = e => {
        e.preventDefault()
        editCategory({
            AnimalCategoryNameEn: CategoryNameEn.current.value,
            AnimalCategoryNameAr: CategoryNameAr.current.value,
            AnimalCategoryImage: selectedImage,
            IDAnimalCategory: id
        })
    }

    async function editCategory(category) {
        await PostData(`${process.env.REACT_APP_API_URL}/admin/animalcategories/edit`, category, apiheader).then((res) => {

            if (res.data.Success === true) {
                toast.success('Animal Category  has been updated!', {
                    duration: 4000,
                    position: 'top-center',
                    icon: <Icons.Added color='#40AB45' size={25} />,
                    iconTheme: {
                        primary: '#0a0',
                        secondary: '#fff',
                    },
                });
                setTimeout(() => {
                    navigate('/dashboard/animals/categories');
                }, 2000);
            } else {
                toast.error(res.data.ApiMsg)
            }
        });
    }

    const categoryDetail = async () => {
        let data = await GetData(`${process.env.REACT_APP_API_URL}/admin/animalcategories/edit/page/${id}`, apiheader)
        setCategoryDetail(data.Response);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        categoryDetail()
    }, [id])
    useEffect(() => {

    }, [id])


    let { isLang } = useContext(VendersContext);


    return (

        <Container fluid>
            <div className="app__addprodects">
                {isLang === 'ar' ?
                    <Component.SubNav sub__nav={[{ name: "تعديـل الفئــة", path: `/animals/categories/editAnimal/${id}` } , { name: "قائمـة الفئــات", path: '/animals/categories' }]} />
                    :
                    <Component.SubNav sub__nav={[{ name: "Animal Categories", path: '/animals/categories' }, { name: "Edit Categorie ", path: `/animals/categories/editAnimal/${id}` }]} />
                }
                <div className="app__addprodects__header ">
                    <Component.BaseHeader h1={translateCategories[isLang]?.LabelEditPage} />
                    <div className="app__addOrder-form">
                        <div className="app__addprodects-form">
                            <form onSubmit={submit}>
                                <Row>
                                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                                        <Form.Group>
                                            <Form.Label>{translateCategories[isLang]?.LabelAddImage}</Form.Label>
                                            <FormControl
                                                id="custom-file"
                                                type="file"
                                                label={selectedImage ? selectedImage.name : 'Choose file'}
                                                ref={fileInputRef}
                                                onChange={handleImageSelect}
                                                accept="image/*"
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
                                                        src={editPage?.AnimalCategoryImage}
                                                        className='rounded-3 w-100'
                                                    />
                                                }
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>{translateCategories[isLang]?.LabelAddNameEN}</Form.Label>
                                            <Form.Control type="text" name='firstname' ref={CategoryNameEn} defaultValue={editPage?.AnimalCategoryNameEn} />

                                        </Form.Group>

                                    </Col>
                                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                        <Form.Group controlId="formBasicEmail" >
                                            <Form.Label>{translateCategories[isLang]?.LabelAddNameAR}</Form.Label>
                                            <Form.Control type="text" name='email' ref={CategoryNameAr} defaultValue={editPage?.AnimalCategoryNameAr} style={{ direction: 'rtl' }} />
                                        </Form.Group>

                                    </Col>
                                    <div className='d-flex justify-content-center align-content-center my-5'>

                                        <div className='baseBtn1'>
                                            <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                {translateCategories[isLang]?.SaveBTN}
                                            </Button>
                                        </div>

                                        <div className='baseBtn w-auto'>
                                            <Link to={'/dashboard/animals/categories'}>
                                                <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                    {translateCategories[isLang]?.CancelBTN}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Row>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Container>

    )
}

export default EditAnimalCat