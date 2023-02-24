import React, { useRef ,useEffect ,useState} from 'react'
import { apiheader, GetData, PostData } from '../../../utils/fetchData';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import Icons from '../../../constants/Icons';
import Component from '../../../constants/Component' 

const EditAnimalCat = () => {
    let { id } = useParams()
    let navigate = useNavigate();
    const CategoryNameEn = useRef();
    const CategoryNameAr = useRef();
    const [editPage, setCategoryDetail] = useState(null)

    const submit = e => {
        e.preventDefault()
        editCategory({
            AnimalCategoryNameEn: CategoryNameEn.current.value,
            AnimalCategoryNameAr: CategoryNameAr.current.value,
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
                    navigate('/categ/animals');
                }, 2000);
            } else {
                toast.error(res.data.ApiMsg)
            }
        });
    }

    const categoryDetail = async () => {
        let data = await GetData(`${process.env.REACT_APP_API_URL}/admin/animalcategories/edit/page/${id}`, apiheader)
        setCategoryDetail(data.Response);
        console.log(data.Response);
      }
      useEffect(() => {
        categoryDetail()
      }, [id])
    useEffect(() => {

    }, [id])

    return (
        <>
            <Container fluid>
                <div className="app__addprodects">
                    <Component.SubNav sub__nav={[{ name: "Animal Categories", path: '/categ/animals' }, { name: "Edit Categorie ", path: `/categ/animals/editAnimal/${id}` }]} />

                    <div className="app__addprodects__header ">
                        <Component.BaseHeader h1={'Edit User'} />
                        <div className="app__addOrder-form">
                            <div className="app__addprodects-form">
                                <form onSubmit={submit}>
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Animal Category Name (En)</Form.Label>
                                                <Form.Control type="text" name='firstname' ref={CategoryNameEn}  defaultValue={editPage?.AnimalCategoryNameEn}/>
                                    
                                            </Form.Group>

                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                            <Form.Group controlId="formBasicEmail" >
                                                <Form.Label>Animal Category Name (Ar)</Form.Label>
                                                <Form.Control type="text" name='email' ref={CategoryNameAr}  defaultValue={editPage?.AnimalCategoryNameAr}style={{ direction: 'rtl' }} />
                                            </Form.Group>

                                        </Col>
                                        <div className='d-flex justify-content-center align-content-center my-5'>
                                            <div className='baseBtn'>
                                                <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                                    Update Category
                                                </Button>
                                            </div>
                                        </div>
                                    </Row>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default EditAnimalCat