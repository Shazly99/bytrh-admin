import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Img from '../../../assets/Img';
import Component from '../../../constants/Component';
import { VendersContext } from '../../../context/Store';
import { GetData, apiheader } from '../../../utils/fetchData';
import '../blog.scss';
import initialTranslation from './Translation';

const BlogClientDetails = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => {
    setTranslate(initialTranslation)
  }
  let { id } = useParams()
  const [lgShow, setLgShow] = useState(false);
  const [blogsDetails, setBlogsDetails] = useState(null)
  const [clientBlogGallery, setClientBlogGallery] = useState(null)
  const [clientBlogComments, setClientBlogComments] = useState(null)


  const BlogList = async () => {
    await GetData(`${process.env.REACT_APP_API_URL}/admin/clients/blogs/details/${id}`, apiheader).then(({ Response }) => {
      setBlogsDetails(Response)
      setClientBlogGallery(Response.ClientBlogGallery)
      setClientBlogComments(Response.ClientBlogComments)
    }).catch((error) => {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          BlogList();
        }, (retryAfter || 60) * 1000);
      }
    })

  }
  const [showDropdown, setShowDropdown] = useState(false);
  // Modal Table Edit
  const [modalShowEdit, setModalShowEdit] = React.useState(false);
  const [modalIndexEdit, setModalIndexEdit] = React.useState(0);
  function handleModalCloseEdit() {
    setModalShowEdit(false);
  }
  function handleModalOpenEdit(index) {
    setModalIndexEdit(index);
    setModalShowEdit(true);
  }
  const handleDelete = async (idComment) => {
    // perform delete action using the id
    await GetData(`${process.env.REACT_APP_API_URL}/admin/clients/blogs/comments/remove/${idComment}`).then((res) => {
      if (res.Success === true) {
        handleModalCloseEdit()
        toast.success(<strong>{translate[isLang]?.blogDetails?.toast}</strong>, {
          duration: 4000,
          position: 'bottom-center',
          // icon: <Icons.Bin color='#E20000' size={20} />,
          iconTheme: {
            primary: '#E20000',
            secondary: '#fff',
          },
        });
        BlogList()
      } else {
        toast.error(res.data.ApiMsg)
      }
    })
  }

  useEffect(() => {
    BlogList()
    window.scrollTo(0, 0);
    handelTranslate()
  }, [id, isLang])

  return (

    <>
      {
        blogsDetails ?
          <div className='app__blog'>
            <Container fluid>
              <div className="app__addprodects">
                <Component.SubNav sub__nav={[{ name: translate[isLang]?.blogDetails?.nav1, path: '/blogs/client' }, { name: translate[isLang]?.blogDetails?.nav2, path: `/blogs/client/details/${id}` }]} />
                {clientBlogGallery?.length > 0 &&
                  <>
                    <div className="app__addprodects__header ">
                      <Component.BaseHeader h2={translate[isLang]?.blogDetails?.galleryTitle} />
                      <a onClick={() => setLgShow(true)} className='blog__popup'>{translate[isLang]?.blogDetails?.galleryBtn}  </a>
                      <Modal
                        dir={isLang === "ar" ? 'rtl' : 'ltr'}
                        size="xl"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                        fullscreen={'md-down'}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-custom-modal-styling-title">
                            {translate[isLang]?.blogDetails?.galleryTitle}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Row className='d-flex justify-content-center align-item-center'>
                            {clientBlogGallery?.map((item, i) => (
                              <Col xl={4} lg={4} md={6} sm={12} className='mt-3'>
                                <div key={i} className='mt-3'  >
                                  <img
                                    className='rounded-2 image'
                                    loading="lazy"
                                    src={item.ClientBlogGalleryPath} // use normal <img> attributes as props
                                    width={"100%"} 
                                    height={'270px'} 
                                  />
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </Modal.Body>
                      </Modal>
                    </div>
                    <div className="app__blog_gallary">
                      <div className=' overflow-hidden'  >
                        <div className='row'>
                          {clientBlogGallery?.length > 8 ? clientBlogGallery?.slice(0, 8).map((item, i) => (
                            <Col key={i}
                              xl={clientBlogGallery?.length === 4 ? 6 : 12 / Math.min(clientBlogGallery?.length, 4)}
                              lg={clientBlogGallery?.length === 4 ? 6 : 12 / Math.min(clientBlogGallery?.length, 4)}
                              md={12 / Math.min(clientBlogGallery?.length, 2)}
                              sm={12} className='mt-3  '  >
                              <img
                                loading="lazy"
                                className='rounded-2  image'
                                src={item.ClientBlogGalleryPath} // use normal <img> attributes as props
                                width={clientBlogGallery?.length < 2 ? "20%" : '100%'}
                                height={'270px'}
                              />
                            </Col>
                          )) :
                            clientBlogGallery?.map((item, i) => (
                              <Col key={i}
                                xl={clientBlogGallery?.length === 4 ? 6 : 12 / Math.min(clientBlogGallery?.length, 4)}
                                lg={clientBlogGallery?.length === 4 ? 6 : 12 / Math.min(clientBlogGallery?.length, 4)}

                                md={12 / Math.min(clientBlogGallery?.length, 2)}
                                sm={12} className='mt-3  '  >
                                <img
                                  loading="lazy"
                                  className='rounded-2  image'
                                  src={item.ClientBlogGalleryPath} // use normal <img> attributes as props
                                  width={"100%"}
                                  height={'270px'}

                                />
                              </Col>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </>}

                <div className="app__blog_content">
                  <div className="header">
                    <div className="title">
                      {blogsDetails?.BlogTitle}
                    </div>
                    <div className="date">
                      {blogsDetails?.BlogDate.split(' ')[0]} , {blogsDetails?.BlogDate.split(' ')[1]}
                    </div>
                  </div>
                  <div className="content">
                    <img loading="lazy" src={Img?.icon} width={50} height={50} />
                    <h3>{blogsDetails?.ClientName}</h3>
                  </div>
                  <div className="blog_body">
                    <p>{blogsDetails?.BlogBody}</p>
                  </div>
                  <div className="summary">
                    <Row>
                      <Col className="summary_blog">
                        <span className='title'>{blogsDetails?.BlogLikes}</span>
                        <span className='body'>{translate[isLang]?.blogDetails?.like}</span>
                      </Col>
                      <Col className="summary_blog">
                        <span className='title'>{blogsDetails?.BlogComments}</span>
                        <span className='body'>{translate[isLang]?.blogDetails?.comment}</span>
                      </Col>
                      <Col className="summary_blog">
                        <span className='title'>{blogsDetails?.BlogVisibility.charAt(0).toUpperCase() + blogsDetails?.BlogVisibility.slice(1).toLowerCase()}</span>
                        <span className='body'>{translate[isLang]?.blogDetails?.Visibility}</span>
                      </Col>

                      <Col className="summary_blog">
                        <span className='title'>{blogsDetails?.AnimalCategoryNameEn}</span>
                        <span className='body'>{translate[isLang]?.blogDetails?.nameEn}</span>
                      </Col>

                      <Col className="summary_blog">
                        <span className='title'>{blogsDetails?.AnimalCategoryNameAr}</span>
                        <span className='body'>{translate[isLang]?.blogDetails?.nameAr}</span>
                      </Col>
                    </Row>
                  </div>
                  {blogsDetails?.BlogComments !== 0 ?
                    <div className="comment">
                      <div className="title">
                        <h3>{translate[isLang]?.blogDetails?.comment}</h3>
                      </div>

                      <div className="content">
                        {
                          clientBlogComments?.map((item, index) => (

                            <div className="body" key={index}>
                              <img src={Img.icon} loading="lazy" width={50} height={50} />
                              <div className="header">

                                <div className="header__comment">
                                  <div className='info gap-2'>
                                    <span>{item?.Name}</span>
                                    <span className='Comment__User'>({item?.CommentUser.charAt(0).toUpperCase() + item?.CommentUser.slice(1).toLowerCase()})</span>
                                  </div>

                                  <div className="action">
                                    <div className="date">
                                      {item?.CreateDate.split(' ')[0]}{/*  , {item?.CreateDate.split(' ')[1]}  */}
                                    </div>
                                    <div className="delete">
                                      <DropdownButton
                                        title={<img src={Img.dropdown} />}
                                        id="dropdown-menu"
                                        onClick={() => setShowDropdown(!showDropdown)}
                                      >
                                        <Dropdown.Item onClick={() => handleModalOpenEdit(index)}>{translate[isLang]?.blogDetails?.deleteBtn}</Dropdown.Item>
                                        <Modal
                                          dir={isLang === "ar" ? 'rtl' : 'ltr'}
                                          show={modalShowEdit && modalIndexEdit === index}
                                          onHide={handleModalCloseEdit}
                                          centered
                                        >
                                          <Modal.Header closeButton>
                                            <Modal.Title className='  w-100 '>{translate[isLang]?.blogDetails?.deleteTitle}</Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                                            <Component.HandelDelete />
                                          </Modal.Body>
                                          <Modal.Footer className="d-flex justify-content-center align-items-center">

                                            <Button variant="outline-primary" onClick={handleModalCloseEdit}>
                                              {translate[isLang]?.blogDetails?.cancel}
                                            </Button>
                                            <Button variant="danger" style={{ border: '#dc3545' }} onClick={() => handleDelete(item.IDClientBlogComment)}>
                                              {translate[isLang]?.blogDetails?.deleteBtn}
                                            </Button>
                                          </Modal.Footer>
                                        </Modal>
                                      </DropdownButton>
                                    </div>
                                  </div>
                                </div>

                                <div className='comments_content'>
                                  <p>{item?.ClientBlogComment}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div> : ''
                  }
                </div>
              </div>
            </Container >

          </div >

          : <Component.Loader />
      }
    </>

  )
}

export default BlogClientDetails
