import React, { useRef, useEffect, useState, useContext } from 'react'
import { apiheader, GetData, PostData } from '../../../utils/fetchData';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import Icons from '../../../constants/Icons';
import Component from '../../../constants/Component';
import { VendersContext } from "../../../context/Store";
import translateBagging from './translateBagging';



const EditBagging = () => {
  let { id } = useParams()
  let navigate = useNavigate();
  const baggingsNameEn = useRef();
  const baggingsNameAr = useRef();
  const [editPage, setCategoryDetail] = useState(null)

  const submit = e => {
    e.preventDefault()
    editCategory({
      BaggingNameEn: baggingsNameEn.current.value,
      BaggingNameAr: baggingsNameAr.current.value,
      IDBagging: id
    })
  }

  async function editCategory(baggings) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/baggings/edit`, baggings, apiheader).then((res) => {

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
          navigate('/animals/bagging');
        }, 2000);
      } else {
        toast.error(res.data.ApiMsg)
      }
    });
  }

  const categoryDetail = async () => {
    let data = await GetData(`${process.env.REACT_APP_API_URL}/admin/baggings/edit/page/${id}`, apiheader)
    setCategoryDetail(data.Response);
  }
  useEffect(() => {
    categoryDetail()
     window.scrollTo(0, 0);
  }, [id])


  let { isLang } = useContext(VendersContext);



  return (
    <Container fluid>
      <div className="app__addprodects">
        {isLang === 'ar' ?
            <Component.SubNav sub__nav={[{ name: "تعديـل التكييس", path: `/animals/bagging/editbagging/${id}` } , { name: "قائمـة التكييس", path: '/animals/bagging '}]} />
            :
            <Component.SubNav sub__nav={[{ name: "Baggings ", path: '/animals/bagging '}, { name: "Edit Bagging ", path: `/animals/bagging/editbagging/${id}` }]} />
        }
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={translateBagging[isLang]?.LabelEditPage} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={submit}>
 
                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>{translateBagging[isLang]?.LabelAddNameEN}</Form.Label>
                      <Form.Control type="text" name='firstname' ref={baggingsNameEn} defaultValue={editPage?.BaggingNameEn} />

                    </Form.Group>

                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail" >
                      <Form.Label>{translateBagging[isLang]?.LabelAddNameAR}</Form.Label>
                      <Form.Control type="text" name='email' ref={baggingsNameAr} defaultValue={editPage?.BaggingNameAr} style={{ direction: 'rtl' }} />
                    </Form.Group>

                  </Col>
                  <div className='d-flex justify-content-center align-content-center my-5'>

                    <div className='baseBtn1'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        {translateBagging[isLang]?.SaveBTN}
                      </Button>
                    </div>

                    <div className='baseBtn'>
                      <Link to={'/animals/bagging'}>
                        <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                          {translateBagging[isLang]?.CancelBTN}
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

export default EditBagging