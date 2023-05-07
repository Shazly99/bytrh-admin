
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Component from '../../../../constants/Component';
import { VendersContext } from '../../../../context/Store';
import { GetData, PostData, apiheader } from '../../../../utils/fetchData';
import translateBaggingPrice from './baggingPrice';


const AddDoctorService = () => {
  let { id } = useParams()
  let navigate = useNavigate();
  const IDDoctorService = useRef();
  const DoctorServicePrice = useRef();

  // Gets
  const [DoctorService, setDoctorService] = useState(null)
  //  !Get IDDoctorService 
  const GetDoctorsServices = async () => {
    const data = await GetData(`${process.env.REACT_APP_API_URL}/admin/services/ajax`, apiheader);
    setDoctorService(data.Response)
  }


  const submit = e => {
    e.preventDefault()
    addNewDoctorService({
      IDDoctor: id,
      IDService: IDDoctorService.current.value,
      DoctorServicePrice: DoctorServicePrice.current.value
    })
  }

  async function addNewDoctorService(category) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/doctors/services/add`, category, apiheader).then((res) => {
      if (res.data.Success === true) {
        toast.success(translateBaggingPrice[isLang]?.toast, {
          duration: 4000,
          position: 'top-center',
          // icon: <Icons.Added color='#40AB45' size={25} />,
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          },
        });
        setTimeout(() => {
          navigate(`/doctors/Service/list/${id}`);
        }, 2000);
      } else {
        toast.error(res.data.ApiMsg)
      }
    });
  }
  useEffect(() => {
    GetDoctorsServices()
    window.scrollTo(0, 0);
    return () => {
      GetDoctorsServices()
    };
  }, [])



  let { isLang } = useContext(VendersContext);


  return (
    <>
      <Container fluid>
        <div className="app__addprodects">
          <Component.SubNav sub__nav={[
            { name: translateBaggingPrice[isLang]?.nav[2].navAdd1, path: `/doctors/Service/list/${id}` },
            { name: translateBaggingPrice[isLang]?.nav[3].navAdd2, path: `/doctors/Service/add/${id}` }
          ]} />
          <div className="app__addprodects__header ">
            <Component.BaseHeader h1={translateBaggingPrice[isLang]?.LabelAddPage} />
            <div className="app__addOrder-form">
              <div className="app__addprodects-form">
                <form onSubmit={submit}>

                  <Row>
               
               
                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>{translateBaggingPrice[isLang]?.DoctorServicePrice}</Form.Label>
                        <Form.Control type="number" name='firstname' ref={DoctorServicePrice} />
                      </Form.Group>
                    </Col>

                    <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">
                      <Form.Group controlId="formBasicEmail"  >
                        <Form.Label>{translateBaggingPrice[isLang]?.AnimalSubCate}</Form.Label>

                        <Form.Select aria-label="Default select example" ref={IDDoctorService}>
                          <option>{translateBaggingPrice[isLang]?.SubCateOption}</option>
                          {
                            DoctorService?.map((item, index) => (
                              <option key={index} value={item?.IDService}>{item?.ServiceName}</option>
                            ))
                          }
                        </Form.Select>

                      </Form.Group>
                    </Col>

                    <div className='d-flex justify-content-center align-content-center my-5'>

                      <div className='baseBtn1'>
                        <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                          {translateBaggingPrice[isLang]?.SaveBTN}
                        </Button>
                      </div>

                      <div className='baseBtn w-auto'>
                        <Link to={`/dashboard/doctors/Service/list/${id}`}>
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
    </>
  )
}

export default AddDoctorService
