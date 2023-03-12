import React, { useRef, useEffect, useState } from 'react'
import { apiheader, GetData, PostData } from '../../../utils/fetchData';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Col, Container, Row, Form, Button, FormControl } from 'react-bootstrap';
import Icons from '../../../constants/Icons';
import Component from '../../../constants/Component'
const EditAnimalsSubCategories = () => {
  let { id } = useParams()
  let navigate = useNavigate();
  const CategoryNameEn = useRef();
  const CategoryNameAr = useRef();
  const animalCategoryRef = useRef();
  const animalBaggingRef = useRef();
  const animalCutRef = useRef();

  const [editPage, setCategoryDetail] = useState(null)

  // TODO:: select image
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  // Gets
  const [animalCategory, setAnimalCategory] = useState(null)
  const [animalBagging, setAnimalBagging] = useState(null)
  const [animalCut, setAnimalCut] = useState(null)
  //  !Get IDAnimalCategory 
  const IDAnimalCategory = async () => {
    const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/animalcategories/ajax`, {}, apiheader);
     setAnimalCategory(data.Response)
  }
  //  !Get AnimalBagging 
  const AnimalBagging = async () => {
    const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/baggings`, {}, apiheader);
     setAnimalBagging(data.Response)
  }
  //  !Get AnimalCut 
  const AnimalCut = async () => {
    const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/cuttings`, {}, apiheader);
     setAnimalCut(data.Response)
  }


  const submit = e => {
    e.preventDefault()
    editCategory({
      AnimalSubCategoryNameEn: CategoryNameEn.current.value,
      AnimalCategoryNameAr: CategoryNameAr.current.value,
      AnimalSubCategoryImage: selectedImage,
      IDAnimalSubCategory: id,
      IDAnimalCategory: animalCutRef.current.value,
      AnimalBagging: animalBaggingRef.current.value,
      AnimalBagging: animalCategoryRef.current.value,
    })
  }

  async function editCategory(category) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/animalsubcategories/edit`, category, apiheader).then((res) => {

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
          navigate('/animals/subcategories');
        }, 2000);
      } else {
        toast.error(res.data.ApiMsg)
      }
    });
  }

  const categoryDetail = async () => {
    let data = await GetData(`${process.env.REACT_APP_API_URL}/admin/animalsubcategories/edit/page/${id}`, apiheader)
    setCategoryDetail(data.Response);
   }
  useEffect(() => {
    categoryDetail()
    IDAnimalCategory()
    AnimalBagging()
    AnimalCut()
    return () => {
      categoryDetail()
      IDAnimalCategory()
      AnimalBagging()
      AnimalCut()
    };
  }, [id])
  useEffect(() => {
  }, [id])

  return (
    <Container fluid>
      <div className="app__addprodects">
        <Component.SubNav sub__nav={[{ name: "Animal Categories", path: '/animals/subcategories' }, { name: "Edit Categorie ", path: `/animals/subcategories/editsubcategories/${id}` }]} />

        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={'Edit Animal Categories'} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={submit}>
                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                    <Form.Group>
                      <Form.Label>Ads Image:</Form.Label>
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
                            src={editPage?.AnimalSubCategoryImage}
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
                      <Form.Label> Name (En)</Form.Label>
                      <Form.Control type="text" name='firstname' ref={CategoryNameEn} defaultValue={editPage?.AnimalSubCategoryNameEn} />
                    </Form.Group>


                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>Animal Category</Form.Label>

                      <Form.Select aria-label="Default select example" ref={animalCategoryRef}>
                        {
                          animalCategory?.map((item, index) => (
                            <option key={index} value={item?.IDAnimalCategory} selected={editPage?.IDAnimalCategory === item?.IDAnimalCategory &&item?.AnimalCategoryName}>{item?.AnimalCategoryName}</option>
                          ))
                        }
                      </Form.Select>

                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>Animal Cut</Form.Label>

                      <Form.Select aria-label="Default select example" ref={animalCutRef}>
                        {
                          animalCut?.map((item, index) => (
                            <option key={index} value={item?.IDCutting} selected={editPage?.IDCutting === item?.IDCutting &&item?.CuttingName}>{item?.CuttingName}</option>
                          ))
                        } 
                      </Form.Select>

                    </Form.Group>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail" >
                      <Form.Label> Name (Ar)</Form.Label>
                      <Form.Control type="text" name='email' ref={CategoryNameAr} defaultValue={editPage?.AnimalSubCategoryNameAr} style={{ direction: 'rtl' }} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>Animal Bagging</Form.Label>

                      <Form.Select aria-label="Default select example" ref={animalBaggingRef}>
                        {
                          animalBagging?.map((item, index) => (
                            <option key={index} value={item?.IDBagging} selected={editPage?.IDBagging === item?.IDBagging &&item?.BaggingName}>{item?.BaggingName}</option>
                          ))
                        } 
                      </Form.Select>

                    </Form.Group>
                  </Col>
                  <div className='d-flex justify-content-center align-content-center my-5'>

                    <div className='baseBtn1'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        Save
                      </Button>
                    </div>

                    <div className='baseBtn'>
                      <Link to={'/animals/categories'}>
                        <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                          Cancel
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

export default EditAnimalsSubCategories