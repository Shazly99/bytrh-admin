import React, { useEffect, useRef, useState } from 'react';
import Component from '../../../constants/Component'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiheader, PostData } from '../../../utils/fetchData';
import Icons from '../../../constants/Icons';
import { Col, Container, Row, Form, Button, FormControl } from 'react-bootstrap';

const AddCuttingPricing = () => {
  let navigate = useNavigate();

  const IDCutting = useRef();
  const IDAnimalSubCategory = useRef();
  const SubCategoryCuttingPrice = useRef();

  // Gets
  const [animalCategory, setAnimalCategory] = useState(null)
  const [animalCut, setAnimalCut] = useState(null)
  //  !Get IDAnimalCategory 
  const IDAnimalCategory = async () => {
    const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/animalsubcategories/ajax`, { AnimalSubCategoryType: "CUTTING" }, apiheader);
    console.log(data);
    setAnimalCategory(data.Response)
  }
  //  !Get AnimalCut 
  const AnimalCut = async () => {
    const { data } = await PostData(`${process.env.REACT_APP_API_URL}/admin/cuttings`, {}, apiheader);
    console.log(data);
    setAnimalCut(data.Response)
  }

  const submit = e => {
    e.preventDefault()
    addNewCategory({
      SubCategoryCuttingPrice: SubCategoryCuttingPrice.current.value,
      IDAnimalSubCategory: IDAnimalSubCategory.current.value,
      IDCutting: IDCutting.current.value
    })
  }

  async function addNewCategory(category) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/cuttings/pricing/add`, category, apiheader).then((res) => {

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
          navigate('/animals/cuttingprice');
        }, 2000);
      } else {
        toast.error(res.data.ApiMsg)
      }
    });
  }
  useEffect(() => {
    IDAnimalCategory()
    AnimalCut()
    return () => {
      IDAnimalCategory()
      AnimalCut()
    };
  }, [])
  return (
    <Container fluid>
      <div className="app__addprodects">
        <Component.SubNav sub__nav={[{ name: "Cutting Price", path: '/animals/cuttingprice' }, { name: "Add cutting price ", path: '/animals/cuttingprice/addcuttingprice' }]} />
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={'Add Cutting Pricing'} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={submit}>

                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>  Cutting Price</Form.Label>
                      <Form.Control type="number" name='firstname' ref={SubCategoryCuttingPrice} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className='mt-3'>
                      <Form.Label>Animal Sub Category</Form.Label>

                      <Form.Select aria-label="Default select example" ref={IDAnimalSubCategory}>
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
                      <Form.Label>Animal Cut</Form.Label>

                      <Form.Select aria-label="Default select example" ref={IDCutting}>
                        {
                          animalCut?.map((item, index) => (
                            <option key={index} value={item?.IDCutting}>{item?.CuttingName}</option>
                          ))
                        }
                        {/* <option value="0">InActive</option> */}
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

export default AddCuttingPricing