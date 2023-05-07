import React, { useRef, useEffect, useState, useContext } from 'react'
import { apiheader, GetData, PostData } from '../../../utils/fetchData';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Col, Container, Row, Form, Button, FormControl } from 'react-bootstrap';
import Icons from '../../../constants/Icons';
import Component from '../../../constants/Component'
import { VendersContext } from "../../../context/Store";
import translateSubCategories from './translateSubCate';



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
  // const [animalBagging, setAnimalBagging] = useState(null)
  // const [animalCut, setAnimalCut] = useState(null)
  //  !Get IDAnimalCategory 
  const IDAnimalCategoryGet = async () => {
    const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/animalcategories/ajax`, {}, apiheader);
    setAnimalCategory(data.Response)
  }
  //  !Get AnimalBagging 
  // const AnimalBagging = async () => {
  //   const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/baggings`, {}, apiheader);
  //   setAnimalBagging(data.Response)
  // }
  //  !Get AnimalCut 
  // const AnimalCut = async () => {
  //   const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/cuttings`, {}, apiheader);
  //   setAnimalCut(data.Response)
  // }


  const submit = e => {
    e.preventDefault()
    editCategory({
      AnimalSubCategoryNameEn: CategoryNameEn.current.value,
      AnimalSubCategoryNameAr: CategoryNameAr.current.value,
      AnimalSubCategoryImage: selectedImage,
      IDAnimalSubCategory: id,
      IDAnimalCategory: animalCategoryRef.current.value,
      AnimalBagging: animalBaggingRef.current.value,
      AnimalCutting: animalCutRef.current.value,
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
          navigate('/dashboard/animals/subcategories');
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
    IDAnimalCategoryGet()
    // AnimalBagging()
    // AnimalCut()
    window.scrollTo(0, 0);
 
  }, [id])
  useEffect(() => {
  }, [id])


  let { isLang } = useContext(VendersContext);


  return (
    <Container fluid>
      <div className="app__addprodects">

        {isLang === 'ar' ?
            <Component.SubNav sub__nav={[{ name: "تعديل الفئـة الفرعيــة", path: `/animals/subcategories/editsubcategories/${id}` } , { name: "قائمـة الفئـات الفرعيـة", path: '/animals/subcategories' }]} />
            :
            <Component.SubNav sub__nav={[{ name: "Animal Sub Categories", path: '/animals/subcategories' }, { name: "Edit Category ", path: `/animals/subcategories/editsubcategories/${id}` }]} />
        }

        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={translateSubCategories[isLang]?.LabelEditPage} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={submit}>
                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                    <Form.Group>
                      <Form.Label>{translateSubCategories[isLang]?.LabelAddImage}</Form.Label>
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
                      <Form.Label>{translateSubCategories[isLang]?.LabelAddNameEN}</Form.Label>
                      <Form.Control type="text" name='firstname' ref={CategoryNameEn} defaultValue={editPage?.AnimalSubCategoryNameEn} />
                    </Form.Group>


                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>{translateSubCategories[isLang]?.LabelAddCate}</Form.Label>

                      <Form.Select aria-label="Default select example" ref={animalCategoryRef}>
                        {
                          animalCategory?.map((item, index) => (
                            <option key={index} value={item?.IDAnimalCategory} selected={editPage?.IDAnimalCategory === item?.IDAnimalCategory && item?.AnimalCategoryName}>{item?.AnimalCategoryName}</option>
                          ))
                        }
                      </Form.Select>

                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>{translateSubCategories[isLang]?.LabelAddCut}</Form.Label>

                      <Form.Select aria-label="Default select example" ref={animalCutRef}>
                        {
                          [{IDCutting:1,CuttingName: isLang === 'ar' ? 'نعـم' : 'Yes'},{IDCutting:0,CuttingName: isLang === 'ar' ? 'لا' : 'No'}]?.map((item, index) => (
                            <option key={index} value={item?.IDCutting} selected={Number(editPage?.IDCutting) === 1 ? "Yes":"No"}>{item?.CuttingName}</option>
                          ))
                        }
                      </Form.Select>

                    </Form.Group>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail" >
                      <Form.Label>{translateSubCategories[isLang]?.LabelAddNameAR}</Form.Label>
                      <Form.Control type="text" name='email' ref={CategoryNameAr} defaultValue={editPage?.AnimalSubCategoryNameAr} style={{ direction: 'rtl' }} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>{translateSubCategories[isLang]?.LabelAddBag}</Form.Label>

                      <Form.Select aria-label="Default select example" ref={animalBaggingRef}>
                        {
                          [{ IDBagging: 1, BaggingName:  isLang === 'ar' ? 'نعـم' : 'Yes' }, { IDBagging: 0, BaggingName: isLang === 'ar' ? 'لا' : 'No' }]?.map((item, index) => (
                            <option key={index} value={item?.IDBagging} selected={Number(editPage?.IDBagging) === 1 ? "Yes":"No"}>{item?.BaggingName}</option>
                          ))
                        }
                      </Form.Select>

                    </Form.Group>
                  </Col>
                  <div className='d-flex justify-content-center align-content-center my-5'>

                    <div className='baseBtn1'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        {translateSubCategories[isLang]?.SaveBTN}
                      </Button>
                    </div>

                    <div className='baseBtn w-auto'>
                      <Link to={'/dashboard/animals/subcategories'}>
                        <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                          {translateSubCategories[isLang]?.CancelBTN}
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