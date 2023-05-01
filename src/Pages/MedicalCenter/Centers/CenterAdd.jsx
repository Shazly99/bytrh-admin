import React, { useRef, useContext, useState } from 'react';
import Component from '../../../constants/Component'
import { Link , useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiheader, PostData } from '../../../utils/fetchData';
import Icons from '../../../constants/Icons';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { VendersContext } from "../../../context/Store";
import docs from '../Docs/docstranslate';
import CircularProgress from '@mui/material/CircularProgress';


const CenterAdd = () => {


  let { id } = useParams()

//   let navigate = useNavigate();
  const docImage = useRef();
  const docDate = useRef();

  const [loading, setLoading] = useState(false);

  const submit = e => {
    e.preventDefault();
    setLoading(true);
    addNewDocument({
        IDMedicalCenter: id,
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
        //   navigate('/docs');
          window.history.go(-1);
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
            <Component.SubNav sub__nav={[{ name: "إضافـة مستند جديد", path: `/medicalcenter/add/${id}` } , { name: "قائمـة المراكـز الطبيـة", path: '/medicalcenter' }]} />
            :
            <Component.SubNav sub__nav={[{ name: "Medical Centers", path: '/medicalcenter' }, { name: "Add a new Document ", path: `/medicalcenter/add/${id}` }]} />
        }
        <div className="app_addprodects_header ">
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
                                    <Link to={'/medicalcenter'}>
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

export default CenterAdd