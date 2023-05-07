import CircularProgress from '@mui/material/CircularProgress';
import React, { useContext, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { VendersContext } from "../../../context/Store";
import { PostData, apiheader } from '../../../utils/fetchData';
import docs from './docstranslate';


const AddDocs = () => {
  let navigate = useNavigate();
  const docImage = useRef();
  const docDate = useRef();

  const [loading, setLoading] = useState(false);

  const submit = e => {
    e.preventDefault();
    setLoading(true);
    addNewDocument({
        MedicalCenterDocument: docImage.current.files[0],
        CenterDocumentExpireDate: docDate.current.value,
    })
  }

  async function addNewDocument(document) {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/medicalcenter/documents/upload`, document, apiheader).then((res) => {

      if (res.data.Success === true) {
        setLoading(false);
        toast.success('New user added successfully!', {
          duration: 1000,
          position: 'top-center',
          icon: <Icons.Added color='#40AB45' size={25} />,
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          },
        });
        setTimeout(() => {
          navigate('/docs');
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
            <Component.SubNav sub__nav={[{ name: "إضافـة مستند جديد", path: '/docs/add' } , { name: "قائمـة المستندات", path: '/docs' }]} />
            :
            <Component.SubNav sub__nav={[{ name: "Documents", path: '/docs' }, { name: "Add a new Document ", path: '/docs/add' }]} />
        }
        <div className="app__addprodects__header ">
            <Component.BaseHeader h1={docs[isLang]?.LabelAddPage} />
            <div className="app__addOrder-form">
                <div className="app__addprodects-form">
                    <form onSubmit={submit}>

                        <Row>
                            <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                <Form.Group controlId="docImage">
                                    <Form.Label htmlFor='docImage'>{docs[isLang]?.LabelAddImage}</Form.Label>
                                    <Form.Control type="file" accept='image/*' className='py-3' name='docImage' ref={docImage} />
                                </Form.Group>

                            </Col>
                            <Col xl={6} lg={6} md={6} sm={12} className="app__addprodects-form-en">

                                <Form.Group controlId="docDate" >
                                    <Form.Label htmlFor='docDate'>{docs[isLang]?.LabelAddExDate}</Form.Label>
                                    <Form.Control type="date" name='docDate' ref={docDate} style={{ direction: 'rtl' }} />
                                </Form.Group>

                            </Col>
                            <div className='d-flex justify-content-center align-content-center my-5'>

                                <div className='baseBtn1'>
                                    <Button type='submit' variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                        {loading ? <CircularProgress size={27} style={{color: '#fff'}} />: 
                                            docs[isLang]?.SaveBTN
                                        }
                                    </Button>
                                </div>

                                <div className='baseBtn w-auto'>
                                    <Link to={'/docs'}>
                                        <Button variant={'primary'} className='d-flex align-items-center justify-content-center'>
                                            {docs[isLang]?.CancelBTN}
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

export default AddDocs