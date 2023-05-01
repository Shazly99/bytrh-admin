import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiheader, GetData, PostData } from '../../../utils/fetchData';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const EditMedicalFields = () => {
  let { id } = useParams()

  let navigate = useNavigate();
  const MedicalFieldsNameEn = useRef();
  const MedicalFieldsNameAr = useRef();
 

  const [editPage, setMedicalFieldsDetail] = useState(null)


  const submit = e => {
    e.preventDefault()
    editMedicalFields({
      MedicalFieldNameEn: MedicalFieldsNameEn.current.value,
      MedicalFieldNameAr: MedicalFieldsNameAr.current.value,
      IDMedicalField: id
    })
  }

  async function editMedicalFields(MedicalFields) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/medicalfields/edit`, MedicalFields, apiheader).then((res) => {

      if (res.data.Success === true) {
        toast.success('Medical Field has been updated!', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.Added color='#40AB45' size={20} />,
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          },
        });
        setTimeout(() => {
          navigate('/medicalfields');
        }, 2000);
      } else {
        toast.error(res.data.ApiMsg)
      }
    });
  }

  const MedicalFieldsDetail = async () => {
    let data = await GetData(`${process.env.REACT_APP_API_URL}/admin/medicalfields/edit/page/${id}`, apiheader)
    setMedicalFieldsDetail(data.Response);
   }

  useEffect(() => {
    MedicalFieldsDetail()
  }, [id])

  return (
    <Container fluid>
      <div className="app__addprodects">
        <Component.SubNav sub__nav={[{ name: "Medical Fields", path: '/medicalfields' }, { name: "Edit Area ", path: `/medicalfields/edit/${id}` }]} />
        <div className="app__addprodects__header ">
          <Component.BaseHeader h1={'Edit Medical Field'} />
          <div className="app__addOrder-form">
            <div className="app__addprodects-form">
              <form onSubmit={submit}>
                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label> Medical Field Name (En)</Form.Label>
                      <Form.Control type="text" name='firstname' ref={MedicalFieldsNameEn} defaultValue={editPage?.MedicalFieldNameEn} />
                    </Form.Group>

                  </Col>
                  <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Medical Field Name (Ar)</Form.Label>
                      <Form.Control type="text" name='firstname' ref={MedicalFieldsNameAr} defaultValue={editPage?.MedicalFieldNameAr} style={{ direction: 'rtl' }} />
                    </Form.Group>

                  </Col>
                  <div className='d-flex justify-content-center align-content-center my-5'>

                    <div className='baseBtn1'>
                      <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                        Save
                      </Button>
                    </div>

                    <div className='baseBtn w-auto'>
                      <Link to={'/medicalfields'}>
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

export default EditMedicalFields