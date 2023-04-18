import Skeleton from '@mui/material/Skeleton';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion'

import { VendersContext } from '../../../context/Store';
import initialTranslation from './Translation';
import { apiheader, GetData } from '../../../utils/fetchData';
import Component from '../../../constants/Component';
import Map from '../../../GoogleMap/Map';
import img from './../../../assets/Img';
import { AiFillEye } from 'react-icons/ai';
import './center.scss'
import LogoSvg from '../../../assets/svg/LogoSvg';
const ProfileCenter = () => {
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

    let { isLang } = useContext(VendersContext);
    const [translate, setTranslate] = useState(initialTranslation)
    const handelTranslate = () => {
        setTranslate(initialTranslation)
    }
    let { id } = useParams()
    const [centerProfile, setcenterProfile] = useState([]);
    const [isLoader, setIsloader] = useState(false);

    // const [latStart, setLatStart] = useState(null);
    // const [longStart, setlongStart] = useState(null);

    const centerProfileDetails = async () => {
        await GetData(`${process.env.REACT_APP_API_URL}/admin/medicalcenter/profile/${id}`, apiheader).then((res) => {
             setcenterProfile(res.Response);

            const timeoutId = setTimeout(() => {
                setIsloader(true)
            }, 0);
            return () => clearTimeout(timeoutId);
        }).catch((error) => {
            if (error.response && error.response.status === 429) {
                const retryAfter = error.response.headers["retry-after"];
                setTimeout(() => {
                    centerProfileDetails();
                }, (retryAfter || 60) * 1000);
            }
        });

    };


    useEffect(() => {
        let timeOut = setTimeout(() => {
            centerProfileDetails();
            window.scrollTo(0, 0);
        }, 100);
    
        return () => {
            clearTimeout(timeOut)
        }
    }, [id])
    

    const SkeletonCard = () => {
        return (
            <div className="summary_blog gap-1">
                <Skeleton variant='rounded' height={12} width="70%" />
                <Skeleton variant='rounded' height={10} width="40%" />
            </div>
        )
    }
    // const SkeletonSummary = () => {
    //     return (
    //         <>
    //             <Skeleton variant='rounded' height={9} width="40%" />
    //             <Skeleton variant='rounded' height={10} width="70%" />
    //         </>
    //     )
    // }
    // const SkeletonDesc = () => {
    //     return (
    //         <div className="summary_blog d-flex flex-column gap-1 mt-3">
    //             <Skeleton variant='rounded' height={30} width="40%" className='mb-2' />
    //             <Skeleton variant='rounded' animation='wave' height={10} width="70%" />
    //             <Skeleton variant='rounded' animation='wave' height={10} width="70%" />
    //             <Skeleton variant='rounded' animation='wave' height={10} width="70%" />
    //         </div>
    //     )
    // }
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
                        <Component.SubNav sub__nav={[{ name: translate[isLang]?.centerProfileDetails?.nav1, path: '/medicalcenter' }, { name: translate[isLang]?.centerProfileDetails?.nav2, path: `/medicalcenter/profile/${id}` }]} />
                    </div>
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} className='store_info'>
                            <div className="store_header">
                                {translate[isLang]?.centerProfileDetails?.header1}
                            </div>
                            <div className="store_info_body">
                                <Row >
                                    <Col xl={3} lg={3} md={3} sm={3}  >
                                        {isLoader ? <> {centerProfile?.MedicalCenterPicture ?
                                            <img src={centerProfile?.MedicalCenterPicture} alt={centerProfile.MedicalCenterPicture} loading='lazy' height={170} width='100%' className='w-100 rounded' /> :
                                            <img src={img.defaultImg} alt={centerProfile.defaultImg} width='100%' loading='lazy' height={170} className='w-100 rounded' />}
                                        </> : SkeletonImage()}
                                    </Col>
                                    <Col xl={3} lg={3} md={3} sm={3} className="store_info_animal">
                                        {isLoader ? <div className="summary_blog">
                                            {centerProfile?.MedicalCenterName &&
                                                <>
                                                    <span className='title'> {translate[isLang]?.centerProfileDetails?.MCName}</span>
                                                    <span className='body'>{centerProfile?.MedicalCenterName}</span>
                                                </>
                                            }
                                        </div> : SkeletonCard()}

                                        {isLoader ? <div className="summary_blog">
                                            {centerProfile?.MedicalCenterEmail &&
                                                <>
                                                    <span className='title'> {translate[isLang]?.centerProfileDetails?.MCEmail}</span>
                                                    <span className='body'>{centerProfile?.MedicalCenterEmail}</span>
                                                </>
                                            }

                                        </div> : SkeletonCard()}

                                        {isLoader ? <div className="summary_blog">
                                            {centerProfile?.MedicalCenterPhone &&
                                                <>
                                                    <span className='title'> {translate[isLang]?.centerProfileDetails?.MCPhone}</span>
                                                    <span className={`${isLang === 'ar' ? 'text-end' : 'text-start'} body ClientPhone`}  >{centerProfile?.MedicalCenterPhone}</span>

                                                </>
                                            }
                                        </div> : SkeletonCard()}


                                    </Col>
                                    <Col xl={4} lg={4} md={4} sm={4} className="store_info_animal">
                                        {isLoader ? <div className="summary_blog">
                                            {centerProfile?.MedicalCenterAddress &&
                                                <>
                                                    <span className='title'> {translate[isLang]?.centerProfileDetails?.MCAddress}</span>
                                                    <span className='body'>{centerProfile?.MedicalCenterAddress}</span>
                                                </>
                                            }
                                        </div> : SkeletonCard()}

                                        {isLoader ? <div className="summary_blog">
                                            {centerProfile?.MedicalCenterType &&
                                                <>
                                                    <span className='title'> {translate[isLang]?.centerProfileDetails?.MCType}</span>
                                                    <span className='body'>{centerProfile?.MedicalCenterType.charAt(0)?.toUpperCase() + centerProfile?.MedicalCenterType.slice(1).toLowerCase()}</span>
                                                </>
                                            }

                                        </div> : SkeletonCard()}

                                        {isLoader ? <div className="summary_blog">
                                            {centerProfile?.MedicalCenterStatus &&
                                                <>
                                                    <span className='title'> {translate[isLang]?.centerProfileDetails?.MCStatus}</span>

                                                    <span className={`  
                                                        ${centerProfile.MedicalCenterStatus === 'PENDING' && 'txt_pending'} 
                                                        ${centerProfile.MedicalCenterStatus === 'ONGOING' && 'txt_delivered'} 
                                                        ${centerProfile.MedicalCenterStatus === 'ENDED' && 'txt_rejected'} 
                                                        ${centerProfile.MedicalCenterStatus === 'CANCELLED' && 'txt_cancel'} 
                                                        ${centerProfile.MedicalCenterStatus === 'REJECTED' && 'txt_rejected'}
                                                        ${centerProfile.MedicalCenterStatus === 'ACCEPTED' && 'txt_delivery'} mt-2`}>
                                                        {centerProfile?.MedicalCenterStatus?.charAt(0)?.toUpperCase() + centerProfile?.MedicalCenterStatus?.slice(1).toLowerCase()}</span>
                                                </>
                                            }

                                        </div> : SkeletonCard()}




                                    </Col>

                                    <Col xl={2} lg={2} md={2} sm={2} className="store_info_animal">
                                        {isLoader ? <div className="summary_blog">
                                            {centerProfile?.MedicalCenterAddress &&
                                                <>
                                                    <span className='title'> {translate[isLang]?.centerProfileDetails?.CityName}</span>
                                                    <span className='body'>{centerProfile?.CityName}</span>
                                                </>
                                            }
                                        </div> : SkeletonCard()}
                                        {isLoader ? <div className="summary_blog">
                                            {centerProfile?.MedicalCenterAddress &&
                                                <>
                                                    <span className='title'> {translate[isLang]?.centerProfileDetails?.AreaName}</span>
                                                    <span className='body'>{centerProfile?.AreaName}</span>
                                                </>
                                            }
                                        </div> : SkeletonCard()}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    {
                        centerProfile?.MedicalCenterDocuments?.length > 0 &&
                        <div className="  p-3 mt-4  border-2" style={{ borderRadius: '5px', background: '#F9F9F9' }}>
                            <div className="d-flex " style={{ justifyContent: 'space-between'}}>

                                <label className='Sign__Up-header text-dark'>{translate[isLang]?.centerProfileDetails?.RoutecenterDoc}</label>
                                <Link to={`/medicalcenter/add/${centerProfile?.IDMedicalCenter}`} >
                                    <span   className='upload__doc'>
                                       <LogoSvg.DocumentUpload  />
                                       {translate[isLang]?.centerProfileDetails?.uploadDoc}
                                    </span>
                                </Link>
                            </div>
                            <motion.div className="app__work-portfolio " animate={animateCard} transition={{ duration: 0.5, delayChildren: 0.5 }}>
                                {
                                    centerProfile?.MedicalCenterDocuments?.map((work, index) => (
                                        <div className="app__work-item app__flex shadow-sm" key={index}>
                                            <div className="app__work-img app__flex"  >
                                                <img src={work?.CenterDocumentPath} alt={work.name} className='w-100' />
                                                <motion.div className="app__work-hover app__flex" whileHover={{ opacity: [0, 1] }} transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}>
                                                    {/*          <Link to={'/medicalcenter/docs'} rel="noreferrer">
                                                        <motion.div className="app__flex" whileInView={{ scale: [0, 1] }} whileHover={{ scale: [1, 0.90] }} transition={{ duration: 0.25 }}  >
                                                            <AiFillEye />
                                                        </motion.div>
                                                    </Link> */}
                                                </motion.div>
                                            </div>

                                            <div className="app__work-content app__flex">
                                                <h4 className="bold-text"> Expire Date </h4>
                                                <p className="p-text text-center d-flex justify-content-center align-item-center m-0 p-0 flex-column gap-0" style={{ marginTop: 10 }}>
                                                    <span   > {work.CenterDocumentExpireDate.split(' ')[0]}  </span>
                                                    <span className='ClientPhone'> {work.CenterDocumentExpireDate.split(' ')[1]}
                                                    </span>
                                                    { }</p>

                                                <div className="app__work-tag app__flex">
                                                    <p className="p-text">{work.CenterDocumentType?.charAt(0).toUpperCase() + work.CenterDocumentType?.slice(1).toLowerCase()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                            </motion.div>
                        </div>
                    }
                    <div className="  p-3 mt-4 mb-5 mt-0  border-2" style={{ borderRadius: '5px', background: '#F9F9F9' }}>
                        <label className='Sign__Up-header text-dark'>{translate[isLang]?.centerProfileDetails?.RoutecenterProfile}</label>
                        <Map
                            centerProfileLat={centerProfile?.MedicalCenterLat}
                            centerProfileLong={centerProfile?.MedicalCenterLong}
                            DoctorLat={centerProfile?.MedicalCenterLat}
                            DoctorLong={centerProfile?.MedicalCenterLong}
                            pinMarkF={translate[isLang]?.centerProfileDetails?.pinMarkF}
                        />
                    </div>

                </Container>
            </div>
        </>
    )
}

export default ProfileCenter
