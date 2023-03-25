import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Component from '../../../constants/Component';
import './Adoption.scss';
import $ from 'jquery';
import axios from 'axios';
import { apiheader } from '../../../utils/fetchData';
import Loader from '../../../Components/Shared/Loader/Loader';
import { BsEyeFill } from 'react-icons/bs';
import { VendersContext } from '../../../context/Store';


export default function AdoptionDetails() {

  let {id} = useParams();

  const apiAdoptionDetails = `https://bytrh.com/api/admin/adoptions/details/${id}`;

  const [fetchAdoptionDts, setFetchAdoptionDts] = useState([]);
  const [fetchGallery, setFetchGallery] = useState([]);
  const [fetchChats, setFetchChats] = useState([]);

  const [loading, setLoading] = useState(false);

  async function getAdoptionData() {
    setLoading(true);
    await axios.get(apiAdoptionDetails,  apiheader )
      .then(res => {
        if (res.status === 200 && res.request.readyState === 4) {
          setFetchAdoptionDts(res.data.Response);
          setFetchGallery(res.data.Response.AdoptionGallery);
          setFetchChats(res.data.Response.AdoptionChats);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  useEffect(() => {
    getAdoptionData();
  }, [])
  

  useEffect(() => {
    if(loading) {
      $('body').addClass('d-none');
      $('body').removeClass('d-block')
    }
    $('body').addClass('d-block');
    $('body').removeClass('d-none')
  }, [loading]);


  let { isLang } = useContext(VendersContext);



  return (
    loading ? 
    <Loader /> :
    <Container fluid className='py-3'>
      <div className="adoption-details">

        {isLang === 'ar' ?
            <Component.SubNav sub__nav={[{ name: 'تفاصيـل الحيـوان', path: `/adoption/details/${id}` } , { name: 'قائمـة التبنـي', path: '/adoption' }]} />
            :
            <Component.SubNav sub__nav={[{ name: "Adoption", path: '/adoption' }, { name: "Animal Details", path: `/adoption/details/${id}` }]} />
        }
        <div className="row gx-lg-4 gx-0 gy-lg-0 gy-4 d-flex justify-content-lg-start justify-content-center">
            <div className="col-lg-6">
              <h5 className='my-2 info'>{isLang === 'ar' ? 'معلومـات الحيـوان' : 'Animal Info'}</h5>
              <div className="doc-info bg-light shadow-sm rounded-3 p-2">
                <div className="row gx-md-3 gx-2 gy-0 d-flex align-items-center">
                  <div className="col-4">
                    <div className="img-doc">
                      <img src={fetchAdoptionDts.PetPicture} className='img-fluid d-block rounded-3' loading='lazy' alt="pet" />
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="personal-info">

                      <small className='my-0 text-black-50' style={{fontWeight: '500'}}>{isLang === 'ar' ? 'الإســم' : 'Name'}:</small>
                      <h6 className='mb-2 text-black' style={{fontWeight: '700' , wordWrap:  'break-word'}}>{fetchAdoptionDts.PetName}</h6>

                      <small className='my-0 text-black-50' style={{fontWeight: '500'}}>{isLang === 'ar' ? 'نـوع الحيـوان' : 'Animal Type'}:</small>
                      <h6 className='mb-2 text-black' style={{fontWeight: '700' , wordWrap: 'break-word'}}>{fetchAdoptionDts.PetStrain}</h6>

                      <small className='my-0 text-black-50' style={{fontWeight: '500'}}>{isLang === 'ar' ? 'الموقـع' : 'Location'}:</small>
                      <h6 className='mb-2 mb-lg-3 text-black' style={{fontWeight: '700' , wordWrap: 'break-word'}}>{fetchAdoptionDts.CityName}</h6>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <h5 className='my-2 info'>{isLang === 'ar' ? 'تفاصيـل العميـل' : 'Client Details'}</h5>
              <div className="doc-info bg-light shadow-sm rounded-3 p-2">
                <div className="row gx-md-3 gx-2 gy-0 d-flex align-items-center">
                  <div className="col-4">
                    <div className="img-doc">
                      <img src={fetchAdoptionDts.ClientPicture} className='img-fluid d-block rounded-3' loading='lazy' alt="client" />
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="personal-info position-relative">

                      <small className='my-0 text-black-50' style={{fontWeight: '500'}}>{isLang === 'ar' ? 'الإســم' : 'Name'}:</small>
                      <h6 className='mb-2 text-black' style={{fontWeight: '700' , wordWrap:  'break-word'}}>{fetchAdoptionDts.ClientName}</h6>

                      <small className='my-0 text-black-50' style={{fontWeight: '500'}}>{isLang === 'ar' ? 'رقـم التليفـون' : 'Mobile Number'}:</small>
                      <h6 className='mb-2 text-black' style={{fontWeight: '700' , wordWrap: 'break-word'}}>{fetchAdoptionDts.ClientPhone}</h6>

                      <small className='my-0 text-black-50' style={{fontWeight: '500'}}>{isLang === 'ar' ? 'البريـد الإلكترونـي' : 'Email'}:</small>
                      <h6 className='mb-2 mb-lg-3 text-black' style={{fontWeight: '700' , wordWrap: 'break-word'}}>{fetchAdoptionDts.ClientEmail}</h6>

                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div className="row gx-0 gy-sm-0 gy-3 my-5">
          <div className=" col-sm col-6 single-details">
              <h5 className="title">{fetchAdoptionDts.PetAgeYear}</h5>
              <h6 className="body">{isLang === 'ar' ? 'العمـر' : 'Age'}</h6>
          </div>
          <div className=" col-sm col-6 single-details">
              <h5 className="title">{fetchAdoptionDts.PetColor}</h5>
              <h6 className="body">{isLang === 'ar' ? 'اللـون' : 'Color'}</h6>
          </div>
          <div className=" col-sm col-4 single-details">
              <h5 className="title">{fetchAdoptionDts.PetGender && fetchAdoptionDts.PetGender[0].toUpperCase() + fetchAdoptionDts.PetGender.slice(1).toLowerCase()}</h5>
              <h6 className="body">{isLang === 'ar' ? 'النـوع' : 'Gender'}</h6>
          </div>
          <div className=" col-sm col-4 single-details">
              <h5 className="title">{fetchAdoptionDts.PetSize}</h5>
              <h6 className="body">{isLang === 'ar' ? 'الحجـم' : 'Size'}</h6>
          </div>
          <div className=" col-sm col-4 single-details">
              <h5 className="title">{fetchAdoptionDts.AdoptionStatus && fetchAdoptionDts.AdoptionStatus[0].toUpperCase() + fetchAdoptionDts.AdoptionStatus.slice(1).toLowerCase()}</h5>
              <h6 className="body">{isLang === 'ar' ? 'حالة النشـاط' : 'Activity'}</h6>
          </div>
        </div>

        {fetchAdoptionDts.PetDescription !== undefined && fetchAdoptionDts.PetDescription !== null  ? 
          <>
            <h5 className='mb-3'>{isLang === 'ar' ? 'وصـف الحيـوان' : 'Animal Description'}</h5>
            <p className='text-black mb-5'>{fetchAdoptionDts.PetDescription}</p>
          </>
          :
          ''
        }

        {Object.keys(fetchGallery).length > 0 ? 
          <>
            <h5 className='mb-3'>{isLang === 'ar' ? 'معـرض الصـور' : 'Gallery'}</h5>
            <div className={`row ${Object.keys(fetchGallery).length == 1 ? '' : Object.keys(fetchGallery).length > 1 ? 'gx-sm-4' : ''} gx-0 gy-4 d-flex justify-content-sm-start justify-content-center align-items-center mb-5`}>
                {fetchGallery.map((el , i) => (
                    <div key={i} className={`${Object.keys(fetchGallery).length == 1 ? 'col' : Object.keys(fetchGallery).length == 2 ? 'col-sm-6' : Object.keys(fetchGallery).length == 3 ? 'col-md-4 col-sm-6' : Object.keys(fetchGallery).length > 3 ? 'col-lg-3 col-md-4 col-sm-6' : ''}`}>
                      <div className="rounded-3 shadow">
                        <img loading="lazy"src={el.AdoptionGalleryPath} className='w-100 rounded-3' style={{height: Object.keys(fetchGallery).length == 1 ? '350px' : Object.keys(fetchGallery).length == 2 ? '300px' : Object.keys(fetchGallery).length == 3 ? '250px' : Object.keys(fetchGallery).length > 3 ? '250px' : ''}} alt="item-gallery" />
                      </div>
                    </div>
                ))}
            </div>
          </>
          :
          ''
        }


        {Object.keys(fetchChats).length > 0 ? 
          <>
            <h5 className='mb-3'>{isLang === 'ar' ? 'المحادثــات' : 'Chats'}</h5>
            <div className={`mb-2 row ${Object.keys(fetchChats).length == 1 ? '' : Object.keys(fetchChats).length > 1 ? 'gx-sm-4' : ''} gx-0 gy-4 d-flex justify-content-sm-start justify-content-center align-items-center`}>
                {fetchChats.map((el , i) => (
                    <Link key={i} to={`../chat/${el.IDAdoptionChat}`} className="col-lg-3 col-md-4 col-sm-6 text-black">
                        <div className="rounded-3 shadow bg-black color-red position-relative adDetails">
                          <div className="d-flex justify-content-center align-items-center flex-column py-5 px-3">
                            <h5 className='mb-2'>{el.ClientName}</h5>
                            <h6 className='mb-3'>{el.ClientPhone}</h6>
                            <h6 className='mb-0'>{`" ${el.AdoptionChatStatus} "`}</h6>
                          </div>
                          <div className="layer-adDetails position-absolute rounded-3 top-0 bottom-0 d-flex justify-content-center align-items-center" style={{backgroundColor: '#aaa'}}>
                            <BsEyeFill style={{fontSize: '30px'}} />
                          </div>
                          {/* <img loading="lazy" src={el.ClientPicture} className='w-100 rounded-3' style={{height: '200px'}} alt="item-chat" /> */}
                        </div>
                        {/* <h5 className='mb-0 text-center'>{el.ClientName}</h5> */}
                    </Link>
                ))}
            </div>
          </>
          :
          ''
        }



      </div >
    </Container >
  )
}
