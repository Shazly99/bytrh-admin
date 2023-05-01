import React, { useRef , useState , useContext} from 'react';
import Component from '../../../constants/Component'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiheader, PostData } from '../../../utils/fetchData';
import Icons from '../../../constants/Icons';
import { Col, Container, Row, Form, Button, FormControl } from 'react-bootstrap';
import { VendersContext } from "../../../context/Store";
import translateCategories from './translateCategories';

const AddAnimalCat = () => {
    let navigate = useNavigate();
    const CategoryNameEn = useRef();
    const CategoryNameAr = useRef();
    // TODO:: select image
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const submit = e => {
        e.preventDefault()
        addNewCategory({
            AnimalCategoryNameEn: CategoryNameEn.current.value,
            AnimalCategoryNameAr: CategoryNameAr.current.value,
            AnimalCategoryImage:selectedImage
        })
    }

    async function addNewCategory(category) {
        await PostData(`${process.env.REACT_APP_API_URL}/admin/animalcategories/add`, category, apiheader).then((res) => {

            if (res.data.Success === true) {
                toast.success('New user added successfully!', {
                    duration: 4000,
                    position: 'top-center',
                    icon: <Icons.Added color='#40AB45' size={25} />,
                    iconTheme: {
                        primary: '#0a0',
                        secondary: '#fff',
                    },
                });
                setTimeout(() => {
                    navigate('/animals/categories');
                }, 2000);
            } else {
                toast.error(res.data.ApiMsg)
            }
        });
    }


    let { isLang } = useContext(VendersContext);


    return (
        <Container fluid>
            <div className="app__addprodects">
                {isLang === 'ar' ?
                    <Component.SubNav sub__nav={[{ name: "إضافـة فئـة", path: '/animals/categories/addAnimal' } , { name: "قائمــة الفئــات", path: '/animals/categories' }]} />
                    :
                    <Component.SubNav sub__nav={[{ name: "Animal Categories", path: '/animals/categories' }, { name: "Add Category ", path: '/animals/categories/addAnimal' }]} />
                }
                <div className="app__addprodects__header ">
                    <Component.BaseHeader h1={translateCategories[isLang]?.LabelAddPage} />
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
                                <Row>
                                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                        <Form.Group controlId="firstname">
                                            <Form.Label>{translateCategories[isLang]?.LabelAddNameEN}</Form.Label>
                                            <Form.Control type="text" name='firstname' ref={CategoryNameEn} />
                                        </Form.Group>

                                    </Col>
                                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                        <Form.Group controlId="email" >
                                            <Form.Label>{translateCategories[isLang]?.LabelAddNameAR}</Form.Label>
                                            <Form.Control type="text" name='email' ref={CategoryNameAr} style={{ direction: 'rtl' }} />
                                        </Form.Group>

                                    </Col>
                                    <div className='d-flex justify-content-center align-content-center my-5'>

                                        <div className='baseBtn1  '>
                                            <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                {translateCategories[isLang]?.SaveBTN}
                                            </Button>
                                        </div>

                                        <div className='baseBtn w-auto'>
                                            <Link to={'/animals/categories'}>
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

export default AddAnimalCat