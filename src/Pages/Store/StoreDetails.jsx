import React, { useState, useEffect, useContext} from 'react'
import Component from '../../constants/Component'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './store.scss'
import { GetData } from '../../utils/fetchData';
import { apiheader } from './../../utils/fetchData';
import Img from '../../assets/Img';
import Skeleton from '@mui/material/Skeleton';
import StoreChat from './StoreChat';
import ProductRequests from './ProductRequests';
import Icons from '../../constants/Icons';
import initialTranslation from './Translation';
import { VendersContext } from '../../context/Store';

const StoreDetails = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => {
      setTranslate(initialTranslation)
  }

  let { id } = useParams()
  const [animal, setAnimal] = useState([]);
  const [isLoader, setIsloader] = useState(false);

  // get store
  const store = async () => {
    await GetData(`${process.env.REACT_APP_API_URL}/admin/animalproducts/details/${id}`, apiheader).then((res) => {
      setAnimal(res.Response);
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 0);
      return () => clearTimeout(timeoutId);
    }).catch((error) => {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers["retry-after"];
        setTimeout(() => {
          store();
        }, (retryAfter || 60) * 1000);
      }
    });
  };

  useEffect(() => {
    store();
    window.scrollTo(0, 0);
    handelTranslate()
    return () => {
      store();
    }
  }, [id,isLang]);

  const SkeletonCard = () => {
    return (
      <div className="summary_blog gap-1">
        <Skeleton variant='rounded' height={12} width="70%" />
        <Skeleton variant='rounded' height={10} width="40%" />
      </div>
    )
  }
  const SkeletonSummary = () => {
    return (
      <>
        <Skeleton variant='rounded' height={9} width="40%" />
        <Skeleton variant='rounded' height={10} width="70%" />
      </>
    )
  }
  const SkeletonDesc = () => {
    return (
      <div className="summary_blog d-flex flex-column gap-1 mt-3">
        <Skeleton variant='rounded' height={30} width="40%" className='mb-2' />
        <Skeleton variant='rounded' animation='wave' height={10} width="70%" />
        <Skeleton variant='rounded' animation='wave' height={10} width="70%" />
        <Skeleton variant='rounded' animation='wave' height={10} width="70%" />
      </div>
    )
  }
  const SkeletonImage = () => {
    return (
      <Skeleton variant="rounded" width={'100%'} height={170} />

    )
  }
  return (
    <>
      <div className='app__blog'>
        <Container fluid>
          <div className="app__addprodects">
            <Component.SubNav sub__nav={[{ name: translate[isLang]?.store?.nav1, path: '/store' }, { name: translate[isLang]?.store?.nav2, path: `/store/details/${id}` }]} />
          </div>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} className='store_info'>
              <div className="store_header">
                {translate[isLang]?.store?.header1}
              </div>
              <div className="store_info_body">
                <Row >
                  <Col xl={5} lg={5} md={5} sm={5}  >
                    {isLoader ? <> {animal.AnimalProductImage ?
                      <img src={animal.AnimalProductImage} alt={animal.AnimalProductImage} loading='lazy' height={170} width='100%' className='w-100 rounded' /> :
                      <img src={Img.defaultImg} alt={animal.defaultImg} width='100%' loading='lazy' height={170} className='w-100 rounded' />}
                    </> : SkeletonImage()}
                  </Col>
                  <Col xl={7} lg={7} md={7} sm={7} className="store_info_animal">
                    {isLoader ? <div className="summary_blog">
                      <span className='title'>{translate[isLang]?.store?.category}</span>
                      <span className='body'>{animal?.AnimalCategoryName}</span>
                    </div> : SkeletonCard()}

                    {isLoader ? <div className="summary_blog">
                      <span className='title'> {translate[isLang]?.store?.subCategory}</span>
                      <span className='body'>{animal?.AnimalSubCategoryName}</span>
                    </div> : SkeletonCard()}

                    {isLoader ? <div className="summary_blog">
                      <span className='title'> {translate[isLang]?.store?.type}</span>
                      <span className='body'>{animal?.AnimalProductType?.charAt(0).toUpperCase() + animal?.AnimalProductType?.slice(1).toLowerCase()}</span>
                    </div> : SkeletonCard()}
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} className='store_info'>
              <div className="store_header">
              {translate[isLang]?.store?.cinfo}
              </div>
              <div className="store_info_body">
                <Row>
                  <Col xl={5} lg={5} md={5} sm={5}  >
                    {
                      isLoader ? <>
                        {animal.ClientPicture ?
                          <img src={animal.ClientPicture} alt={'Client Picture'} loading='lazy' height={170} width='100%' className='w-100 rounded' /> :
                          <img src={Img.defaultImg} alt={'Client tPicture'} loading='lazy' height={170} width='100%' className='w-100 rounded' />}
                      </> : SkeletonImage()}
                  </Col>
                  <Col xl={7} lg={7} md={7} sm={7} className="store_info_animal">
                    {
                      isLoader ? <div className="summary_blog">
                        <span className='title'> {translate[isLang]?.store?.name}</span>
                        <span className='body'>{animal?.ClientName}</span>
                      </div> : SkeletonCard()
                    }
                    {
                      isLoader ? <div className="summary_blog">
                        <span className='title'>{translate[isLang]?.store?.phone}</span>
                        <span className={`body ${isLang ==="en"?'text-left':'text-right'} `} dir='ltr' >{animal?.ClientPhone}</span>
                      </div> : SkeletonCard()
                    }
                    {
                      isLoader ? <div className="summary_blog">
                        <span className='title'> {translate[isLang]?.store?.city}</span>
                        <span className='body'>{animal?.CityName}</span>
                      </div> : SkeletonCard()
                    }
                  </Col>
                </Row>
              </div>
            </Col>
            <div className="summary">
              <Row>
                <Col className="summary_blog">
                  {isLoader ? <>
                    <span className='title'>{animal?.AnimalProductPrice}</span>
                    <span className='body'>{translate[isLang]?.store?.price}</span>
                  </> : SkeletonSummary()}
                </Col>
                <Col className="summary_blog">
                  {isLoader ? <>
                    <span className='title'>{animal?.AnimalProductAge}</span>
                    <span className='body'>{translate[isLang]?.store?.age}</span>
                  </> : SkeletonSummary()}
                </Col>
                <Col className="summary_blog">
                  {isLoader ? <>
                    <span className='title'>{animal?.AnimalProductGender?.charAt(0)?.toUpperCase() + animal?.AnimalProductGender?.slice(1).toLowerCase()}</span>
                    <span className='body'>{translate[isLang]?.store?.gender}</span>
                  </> : SkeletonSummary()}
                </Col>
                <Col className="summary_blog">
                  {isLoader ? <>
                    <span className='title'>{animal?.AnimalProductSize}</span>
                    <span className='body'>{translate[isLang]?.store?.size}</span>
                  </> : SkeletonSummary()}
                </Col>
                <Col className="summary_blog">
                  {isLoader ? <>
                    <span className='title'>{animal?.HasBagging === 1 ? <Icons.Check color='#40AB45' size={18} /> : <Icons.Uncheck color='#E20000' size={18} />}</span>
                    <span className='body'>{translate[isLang]?.store?.bagging}</span>
                  </> : SkeletonSummary()}
                </Col>
                <Col className="summary_blog">

                  {isLoader ? <>
                    <span className='title'>{animal?.HasCutting === 1 ? <Icons.Check color='#40AB45' size={18} /> : <Icons.Uncheck color='#E20000' size={18} />}</span>
                    <span className='body'> {translate[isLang]?.store?.cutting}</span>
                  </> : SkeletonSummary()}
                </Col>
                <Col className="summary_blog">
                  {isLoader ? <>
                    <span className='title'>{animal?.HasDelivery === 1 ? <Icons.Check color='#40AB45' size={18} /> : <Icons.Uncheck color='#E20000' size={18} />}</span>
                    <span className='body'> {translate[isLang]?.store?.delivery}</span>
                  </> : SkeletonSummary()}
                </Col>
                <Col className="summary_blog">

                  {isLoader ? <>
                    <span className='title'>{animal?.AllowPhone === 1 ? <Icons.Check color='#40AB45' size={18} /> : <Icons.Uncheck color='#E20000' size={18} />}</span>
                    <span className='body'>  {translate[isLang]?.store?.phone}</span>
                  </> : SkeletonSummary()}
                </Col>
                <Col className="summary_blog">

                  {isLoader ? <>
                    <span className='title'>{animal?.AllowWhatsapp === 1 ? <Icons.Check color='#40AB45' size={18} /> : <Icons.Uncheck color='#E20000' size={18} />}</span>
                    <span className='body'>  {translate[isLang]?.store?.whatsapp}</span>
                  </> : SkeletonSummary()}
                </Col>
                <Col className="summary_blog">
                  {isLoader ? <>
                    <span className={`  ${animal.AnimalProductStatus === "PENDING" &&
                      "txt_pending"
                      } ${animal.AnimalProductStatus === "CANCELLED" &&
                      "txt_rejected"
                      }   ${animal.AnimalProductStatus === "RESERVED" &&
                      "txt_delivery"
                      } ${animal.AnimalProductStatus === "REJECTED" &&
                      "txt_rejected"
                      }   ${animal.AnimalProductStatus === "SOLD" &&
                      "txt__status"
                      } ${animal.AnimalProductStatus === "ACTIVE" &&
                      "txt_delivered"
                      }`}>{animal?.AnimalProductStatus?.charAt(0)?.toUpperCase() + animal?.AnimalProductStatus?.slice(1).toLowerCase()}</span>
                    <span className='body'  >{translate[isLang]?.store?.status}</span>
                  </> : SkeletonSummary()}
                </Col>
              </Row>
            </div>
            {isLoader ? <>
              {animal?.AnimalProductDescription &&
                <div className="product_description">
                  <h3 >{translate[isLang]?.store?.des}</h3>
                  <p>{animal?.AnimalProductDescription}</p>
                </div>
              }
            </> : SkeletonDesc()
            }
          </Row>
          {animal?.AnimalProductGallery?.length > 0 &&
            <div className="app__blog_gallary">
              <div className=' '  >
                {isLoader ? <> 
                  <div className="product_description">
                    <h3 >{translate[isLang]?.store?.gallery}</h3>
                  </div>
                </> : <Skeleton variant='rounded' height={30} width="40%" className='mt-3 mb-2' />
                }

                <div className='row'>
                  {isLoader ? <> 
                        {animal?.AnimalProductGallery?.length > 8 ? animal?.AnimalProductGallery?.slice(0, 8).map((item, i) => (
                          <Col key={i}
                            xl={animal?.AnimalProductGallery?.length === 4 ? 6 : 12 / Math.min(animal?.AnimalProductGallery?.length, 4)}
                            lg={animal?.AnimalProductGallery?.length === 4 ? 6 : 12 / Math.min(animal?.AnimalProductGallery?.length, 4)}
                            md={12 / Math.min(animal?.AnimalProductGallery?.length, 2)}
                            sm={12} className='mt-3  '  >
                            <img
                              loading="lazy"
                              className='rounded-2  image'
                              src={item?.AnimalProductGalleryPath} // use normal <img> attributes as props
                              width={item?.AnimalProductGallery?.length < 2 ? "20%" : '100%'}
                              alt={'Animal Product Gallery'}
                            />
                          </Col>
                        )) :
                          animal?.AnimalProductGallery?.map((item, i) => (
                            <Col key={i}
                              xl={animal?.AnimalProductGallery?.length === 4 ? 6 : 12 / Math.min(animal?.AnimalProductGallery?.length, 4)}
                              lg={animal?.AnimalProductGallery?.length === 4 ? 6 : 12 / Math.min(animal?.AnimalProductGallery?.length, 4)}
                              md={12 / Math.min(animal?.AnimalProductGallery?.length, 2)}
                              sm={12} className='mt-3  ' style={{ maxHeight: '400px' }}  >
                              <img
                                loading="lazy"
                                className='rounded-2  image'
                                src={item?.AnimalProductGalleryPath} // use normal <img> attributes as props
                                width={'100%'}
                                height={'100%'}
                                alt={'Animal Product Gallery'}

                              />
                            </Col>
                          ))
                        }
                     
                  </> :

                    <>
                      <div className="col">
                        <Skeleton variant="rounded" animation='wave' width={'100%'} height={150} />
                      </div>
                      <div className="col">
                        <Skeleton variant="rounded" animation='wave' width={'100%'} height={150} />
                      </div>
                      <div className="col">
                        <Skeleton variant="rounded" animation='wave' width={'100%'} height={150} />
                      </div>
                    </>
                  }
                </div>
              </div>
            </div>
          }

          <div className="app__store__chat">
            {
              animal?.AnimalProductChats?.length > 0 &&
              <StoreChat translate={translate[isLang]?.store} chat={animal?.AnimalProductChats} isLoader={isLoader} />
            }
          </div>

          <div className="app__store__chat">
            {
              animal?.AnimalProductRequests?.length > 0 &&
              <ProductRequests translate={translate[isLang]?.store}Request={animal?.AnimalProductRequests} isLoader={isLoader} />
            }
          </div>
        </Container>
      </div>

    </>
  )
}

export default StoreDetails
