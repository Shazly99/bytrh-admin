import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { VendersContext } from "../../../context/Store";
import { PostData, apiheader } from '../../../utils/fetchData';
import translateBaggingPrice from './baggingPrice';


const AddBaggingPricing = () => {

  let navigate = useNavigate();

  const IDBagging = useRef();
  const IDAnimalSubCategory = useRef();
  const SubCategoryBaggingPrice = useRef();

  // Gets
  const [animalCategory, setAnimalCategory] = useState(null)
  const [animalCut, setAnimalCut] = useState(null)
  //  !Get IDAnimalCategory 
  const IDAnimalCategory = async () => {
    const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/animalsubcategories/ajax`, { AnimalSubCategoryType: "BAGGING" }, apiheader);
    setAnimalCategory(data.Response)
  }
  //  !Get AnimalCut 
  const AnimalCut = async () => {
    const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/baggings`, {}, apiheader);
    setAnimalCut(data.Response)
  }

  const submit = e => {
    e.preventDefault()
    addNewCategory({
      SubCategoryBaggingPrice: SubCategoryBaggingPrice.current.value,
      IDAnimalSubCategory: IDAnimalSubCategory.current.value,
      IDBagging: IDBagging.current.value
    })
  }

  async function addNewCategory(category) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/baggings/pricing/add`, category, apiheader).then((res) => {

      if (res.data.Success === true) {
        toast.success('New price bagging added successfully!', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.Added color='#40AB45' size={25} />,
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          },
        });
        setTimeout(() => {
          navigate('/dashboard/animals/baggingprice');
        }, 2000);
      } else {
        toast.error(res.data.ApiMsg)
      }
    });
  }
  useEffect(() => {
    IDAnimalCategory()
    AnimalCut()
    window.scrollTo(0, 0);
    return () => {
      IDAnimalCategory()
      AnimalCut()
    };
  }, [])


  let { isLang } = useContext(VendersContext);



  return (
    <Container fluid>
      <div className="app__addprodects">
        {isLang === 'ar' ?
            <Component.SubNav sub__nav={[{ name: "إضافـة سعـر التكييـس", path: '/animals/baggingprice/addbaggingprice' } , { name: "قائمـة أسعـار التكييـس", path: '/animals/baggingprice' }]} />
            :
            <Component.SubNav sub__nav={[{ name: "Bagging Prices", path: '/animals/baggingprice' }, { name: "Add Bagging price ", path: '/animals/baggingprice/addbaggingprice' }]} />
        }
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={translateBaggingPrice[isLang]?.LabelAddPage} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={submit}>

                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>{translateBaggingPrice[isLang]?.BaggingPrice}</Form.Label>
                      <Form.Control type="number" name='firstname' ref={SubCategoryBaggingPrice} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>{translateBaggingPrice[isLang]?.AnimalSubCate}</Form.Label>

                      <Form.Select aria-label="Default select example" ref={IDAnimalSubCategory}>
                        <option>{translateBaggingPrice[isLang]?.SubCateOption}</option>
                        {
                          animalCategory?.map((item, index) => (
                            <option key={index} value={item?.IDAnimalSubCategory}>{item?.AnimalSubCategoryName}</option>
                          ))
                        }
                      </Form.Select>

                    </Form.Group>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                    <Form.Group controlId="formBasicEmail"  >
                      <Form.Label>{translateBaggingPrice[isLang]?.BaggingName}</Form.Label>
                      <Form.Select aria-label="Default select example" ref={IDBagging}>
                        <option>{translateBaggingPrice[isLang]?.BaggingOption}</option>
                        {
                          animalCut?.map((item, index) => (
                            <option key={index} value={item?.IDBagging}>{item?.BaggingName}</option>
                          ))
                        } 
                      </Form.Select>

                    </Form.Group>




                  </Col>
                  <div className='d-flex justify-content-center align-content-center my-5'>

                    <div className='baseBtn w-auto'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        {translateBaggingPrice[isLang]?.SaveBTN}
                      </Button>
                    </div>

                    <div className='baseBtn w-auto'>
                      <Link to={'/dashboard/animals/baggingprice'}>
                        <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                          {translateBaggingPrice[isLang]?.CancelBTN}
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

export default AddBaggingPricing