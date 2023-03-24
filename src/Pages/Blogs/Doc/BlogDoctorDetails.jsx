 import React, { useEffect, useState } from 'react';
import { Col, Container, Dropdown, DropdownButton, Row, Button } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Img from '../../../assets/Img';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { apiheader, GetData } from '../../../utils/fetchData';
import '../blog.scss';

const BlogDoctorDetails = () => {
  let { id } = useParams()
  const [lgShow, setLgShow] = useState(false);
  const [blogsDetails, setBlogsDetails] = useState(null)
  const [DoctorBlogGallery, setDoctorBlogGallery] = useState(null)
  const [DoctorBlogComments, setDoctorBlogComments] = useState(null)


  const BlogList = async () => {
    await GetData(`${process.env.REACT_APP_API_URL}/admin/doctors/blogs/details/${id}`, apiheader).then(({ Response }) => {
      setBlogsDetails(Response)
      setDoctorBlogGallery(Response.DoctorBlogGallery)
      setDoctorBlogComments(Response.DoctorBlogComments)
    }).catch((error) => {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          BlogList();
        }, (retryAfter || 30) * 1000);
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
    await GetData(`${process.env.REACT_APP_API_URL}/admin/doctors/blogs/comments/remove/${idComment}`).then((res) => {
      if (res.Success === true) {
        toast.success('The comment has been deleted ', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.Bin color='#E20000' size={20} />,
          iconTheme: {
            primary: '#0a0',
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
  }, [id])
  return (

    <>
      {
        blogsDetails ?

          <div className='app__blog'>
            <Container fluid>
              <div className="app__addprodects">
                <Component.SubNav sub__nav={[{ name: " Blogs", path: '/blogs/doctor' }, { name: "Blog Details ", path: `/blogs/doctor/details/${id}` }]} />
                {DoctorBlogGallery?.length > 0 &&
                  <>
                    <div className="app__addprodects__header ">
                      <Component.BaseHeader h2={'BLog Gallery'} />
                      <a onClick={() => setLgShow(true)} className='blog__popup'>show more</a>
                      <Modal
                        size="xl"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                        fullscreen={'md-down'}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-custom-modal-styling-title">
                            BLog Gallery
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Row className='d-flex justify-content-center align-item-center'>
                            {DoctorBlogGallery?.map((item, i) => (
                              <Col xl={4} lg={4} md={6} sm={12} className='mt-3'>
                                <div key={i} className='mt-3'  >
                                  <img
                                    className='rounded-2 image'
                                    loading="lazy"
                                    src={item.DoctorBlogGalleryPath} // use normal <img> attributes as props
                                    width={"100%"} />
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
                          {DoctorBlogGallery?.length > 8 ? DoctorBlogGallery?.slice(0, 8).map((item, i) => (
                            <Col key={i}
                              xl={DoctorBlogGallery?.length === 4 ? 6 : 12 / Math.min(DoctorBlogGallery?.length, 4)}
                              lg={DoctorBlogGallery?.length === 4 ? 6 : 12 / Math.min(DoctorBlogGallery?.length, 4)}
                              md={12 / Math.min(DoctorBlogGallery?.length, 2)}
                              sm={12} className='mt-3  '  >
                              <img
                                loading="lazy"
                                className='rounded-2  image'
                                src={item.DoctorBlogGalleryPath} // use normal <img> attributes as props
                                width={"100%"}
                              />
                            </Col>
                          )) :
                            DoctorBlogGallery?.map((item, i) => (
                              <Col key={i}
                                xl={DoctorBlogGallery?.length === 4 ? 6 : 12 / Math.min(DoctorBlogGallery?.length, 4)}
                                lg={DoctorBlogGallery?.length === 4 ? 6 : 12 / Math.min(DoctorBlogGallery?.length, 4)}

                                md={12 / Math.min(DoctorBlogGallery?.length, 2)}
                                sm={12} className='mt-3  d-flex align-items-center justify-content-center'  >
                                <img
                                  className='rounded-2  image'
                                  src={item.DoctorBlogGalleryPath} // use normal <img> attributes as props
                                  width={DoctorBlogGallery?.length < 2 ? "20%" : '100%'}
                                  loading="lazy"
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
                    <img src={Img?.icon} width={50} height={50} loading="lazy" />
                    <h3>{blogsDetails?.DoctorName}</h3>
                  </div>
                  <div className="blog_body">
                    <p>{blogsDetails?.BlogBody}</p>
                  </div>
                  <div className="summary">
                    <Row>
                      <Col className="summary_blog">
                        <span className='title'>{blogsDetails?.BlogLikes}</span>
                        <span className='body'>Likes</span>
                      </Col>
                      <Col className="summary_blog">
                        <span className='title'>{blogsDetails?.BlogComments}</span>
                        <span className='body'>Comments</span>
                      </Col>
                      <Col className="summary_blog">
                        <span className='title'>{blogsDetails?.BlogVisibility.charAt(0).toUpperCase() + blogsDetails?.BlogVisibility.slice(1).toLowerCase()}</span>
                        <span className='body'>Visibility</span>
                      </Col>

                      <Col className="summary_blog">
                        <span className='title'>{blogsDetails?.AnimalCategoryNameEn}</span>
                        <span className='body'>Category Name (EN)</span>
                      </Col>

                      <Col className="summary_blog">
                        <span className='title'>{blogsDetails?.AnimalCategoryNameAr}</span>
                        <span className='body'>Category Name (Ar)</span>
                      </Col>
                    </Row>
                  </div>
                  {blogsDetails?.BlogComments !== 0 ?
                    <div className="comment">
                      <div className="title">
                        <h3>Comments</h3>
                      </div>

                      <div className="content">
                        {
                          DoctorBlogComments?.map((item, index) => (

                            <div className="body" key={index}>
                              <img loading="lazy" src={Img.icon} alt="" width={50} height={50} />
                              <div className="header">

                                <div className="header__comment">
                                  <div className='info'>
                                    <span>{item?.Name}</span>
                                    <span className='Comment__User'>({item?.CommentUser.charAt(0).toUpperCase() + item?.CommentUser.slice(1).toLowerCase() })</span>

                                  </div>

                                  <div className="action">
                                    <div className="date">
                                      {item?.CreateDate.split(' ')[0]}{/*  , {item?.CreateDate.split(' ')[1]}  */}
                                    </div>
                                    <div className="delete">
                                      <DropdownButton
                                        title={<img src={Img.dropdown} loading="lazy" />}
                                        id="dropdown-menu"
                                        onClick={() => setShowDropdown(!showDropdown)}
                                      >
                                        <Dropdown.Item onClick={() => handleModalOpenEdit(index)}>Delete</Dropdown.Item>
                                        <Modal
                                          show={modalShowEdit && modalIndexEdit === index}
                                          onHide={handleModalCloseEdit}
                                          centered
                                        >
                                          <Modal.Header closeButton>
                                            <Modal.Title className='  w-100 text-center'>  price Details</Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body className="d-flex justify-content-center align-items-center gap-1 flex-column" >
                                          <Component.HandelDelete/>

                                          </Modal.Body>
                                          <Modal.Footer className="d-flex justify-content-center align-items-center">

                                            <Button variant="outline-primary" onClick={handleModalCloseEdit}>
                                              Cancel
                                            </Button>
                                            <Button variant="danger" style={{ border: '#dc3545' }} onClick={() => handleDelete(item.IDDoctorBlogComment)}>
                                              Delete now
                                            </Button>
                                          </Modal.Footer>
                                        </Modal>
                                      </DropdownButton>
                                    </div>
                                  </div>
                                </div>

                                <div className='comments_content'>
                                  <p>{item?.DoctorBlogComment}</p>
                                  {/* <p>Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra,m mmper inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p> */}
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
              {/* </div> */}
            </Container >

          </div >
          : <Component.Loader />
      }
    </>

  )
}

export default BlogDoctorDetails
