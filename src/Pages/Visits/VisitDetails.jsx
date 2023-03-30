import Skeleton from '@mui/material/Skeleton';
import React, { useEffect, useState, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Img from '../../assets/Img';
import Component from '../../constants/Component';
import Icons from '../../constants/Icons';
import { VendersContext } from '../../context/Store';
import { GetData } from '../../utils/fetchData';
import { apiheader } from './../../utils/fetchData';
import Map from './Map';
import initialTranslation from './Translation';
import './visit.scss'
const VisitDetails = () => {

    let { isLang } = useContext(VendersContext);
    const [translate, setTranslate] = useState(initialTranslation)
    const handelTranslate = () => {
        setTranslate(initialTranslation)
    }
    let { id } = useParams()
    const [visit, setvisit] = useState([]);
    const [isLoader, setIsloader] = useState(false);

    const [latStart, setLatStart] = useState(null);
    const [longStart, setlongStart] = useState(null);

    // get visitDetails
    const visitDetails = async () => {
        await GetData(`${process.env.REACT_APP_API_URL}/admin/visits/details/${id}`, apiheader).then((res) => {
            setvisit(res.Response);

            const timeoutId = setTimeout(() => {
                setIsloader(true)
            }, 0);
            return () => clearTimeout(timeoutId);
        }).catch((error) => {
            if (error.response && error.response.status === 429) {
                const retryAfter = error.response.headers["retry-after"];
                setTimeout(() => {
                    visitDetails();
                }, (retryAfter || 60) * 1000);
            }
        });
    };

    useEffect(() => {
        visitDetails();
        window.scrollTo(0, 0);
        return () => {
            visitDetails();
        }
    }, [id]);

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
                        <Component.SubNav sub__nav={[{ name: translate[isLang]?.VisitDetails?.nav1, path: '/visits' }, { name: translate[isLang]?.VisitDetails?.nav2, path: `/visits/details/${id}` }]} />
                    </div>
                    <Row>
                        <Col xl={6} lg={6} md={6} sm={12} className='store_info'>
                            <div className="store_header">
                                {translate[isLang]?.VisitDetails?.clientInfo}
                            </div>
                            <div className="store_info_body">
                                <Row >
                                    <Col xl={5} lg={5} md={5} sm={5}  >
                                        {isLoader ? <> {visit?.ClientPicture ?
                                            <img src={Img.defaultImg} alt={visit.ClientPicture} loading='lazy' height={170} width='100%' className='w-100 rounded' /> :
                                            <img src={Img.defaultImg} alt={visit.defaultImg} width='100%' loading='lazy' height={170} className='w-100 rounded' />}
                                        </> : SkeletonImage()}
                                    </Col>
                                    <Col xl={7} lg={7} md={7} sm={7} className="store_info_animal">
                                        {isLoader ? <div className="summary_blog">
                                            <span className='title'> {translate[isLang]?.VisitDetails?.ClientName}</span>
                                            <span className='body'>{visit?.ClientName}</span>
                                        </div> : SkeletonCard()}

                                        {isLoader ? <div className="summary_blog">
                                            <span className='title'> {translate[isLang]?.VisitDetails?.ClientPhone}</span>
                                            <span className={`${isLang === 'ar' ? 'text-end' : 'text-start'} body ClientPhone`}  >{visit?.ClientPhone}</span>
                                        </div> : SkeletonCard()}


                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={12} className='store_info'>
                            <div className="store_header">
                                {translate[isLang]?.VisitDetails?.doctorInfo}
                            </div>
                            <div className="store_info_body">
                                <Row>
                                    <Col xl={5} lg={5} md={5} sm={5}  >
                                        {
                                            isLoader ? <>
                                                {visit?.ClientPicture ?
                                                    <img src={Img.defaultImg} alt={'Client Picture'} loading='lazy' height={170} width='100%' className='w-100 rounded' /> :
                                                    <img src={Img.defaultImg} alt={'Client tPicture'} loading='lazy' height={170} width='100%' className='w-100 rounded' />}
                                            </> : SkeletonImage()}
                                    </Col>
                                    <Col xl={7} lg={7} md={7} sm={7} className="store_info_animal">
                                        {
                                            isLoader ? <div className="summary_blog">
                                                <span className='title'>{translate[isLang]?.VisitDetails?.DoctorName}</span>
                                                <span className={`${isLang === 'ar' ? 'text-end' : 'text-start'} body ClientPhone`}>{visit?.DoctorName}</span>
                                            </div> : SkeletonCard()
                                        }
                                        {
                                            isLoader ? <div className="summary_blog">
                                                <span className='title'>{translate[isLang]?.VisitDetails?.DoctorPhone}</span>
                                                <span className={`${isLang === 'ar' ? 'text-end' : 'text-start'} body ClientPhone`}>{visit?.DoctorPhone}</span>
                                            </div> : SkeletonCard()
                                        }
                                        {
                                            isLoader ? <div className="summary_blog">
                                                <span className='title'>{translate[isLang]?.VisitDetails?.MedicalCenterName}</span>
                                                <span className={`${isLang === 'ar' ? 'text-end' : 'text-start'} body ClientPhone`}>{visit?.MedicalCenterName} ({visit?.MedicalCenterPhone} ) </span>
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
                                        <span className='title'>{visit?.VisitPrice}</span>
                                        <span className='body'>{translate[isLang]?.VisitDetails?.VisitPrice}</span>
                                    </> : SkeletonSummary()}
                                </Col>
                                <Col className="summary_blog">
                                    {isLoader ? <>
                                        <span className='title'>{visit?.PaymentMethod.charAt(0)?.toUpperCase() + visit?.PaymentMethod.slice(1).toLowerCase()}</span>
                                        <span className='body'>{translate[isLang]?.VisitDetails?.PaymentMethod}</span>
                                    </> : SkeletonSummary()}
                                </Col>
                                <Col className="summary_blog">
                                    {isLoader ? <>
                                        <span className='title'>{visit?.VisitType?.charAt(0)?.toUpperCase() + visit?.VisitType?.slice(1).toLowerCase()}</span>
                                        <span className='body'>{translate[isLang]?.VisitDetails?.VisitType}</span>
                                    </> : SkeletonSummary()}
                                </Col>
                                <Col className="summary_blog">
                                    {isLoader ? <>
                                        <span className='title'>{visit?.VisitDistance}</span>
                                        <span className='body'>{translate[isLang]?.VisitDetails?.VisitDistance}</span>
                                    </> : SkeletonSummary()}
                                </Col>
                                <Col className="summary_blog">
                                    {isLoader ? <>
                                        <span className={`  
                                            ${visit.VisitStatus === 'PENDING' && 'txt_pending'} 
                                            ${visit.VisitStatus === 'ONGOING' && 'txt_delivered'} 
                                            ${visit.VisitStatus === 'ENDED' && 'txt_rejected'} 
                                            ${visit.VisitStatus === 'CANCELLED' && 'txt_cancel'} 
                                            ${visit.VisitStatus === 'REJECTED' && 'txt_rejected'}
                                            ${visit.VisitStatus === 'ACCEPTED' && 'txt_delivery'}`}>
                                            {visit?.VisitStatus?.charAt(0)?.toUpperCase() + visit?.VisitStatus?.slice(1).toLowerCase()}</span>
                                        <span className='body'  >{translate[isLang]?.VisitDetails?.VisitStatus}</span>
                                    </> : SkeletonSummary()}
                                </Col>
                            </Row>


                            <Row className='mt-3'>


                                <Col className="summary_blog">

                                    {isLoader ? <>
                                        <span className='title'>{visit?.VisitServicePrice} SAR</span>
                                        <span className='body'>{translate[isLang]?.VisitDetails?.VisitServicePrice}</span>
                                    </> : SkeletonSummary()}
                                </Col>
                                <Col className="summary_blog">

                                    {isLoader ? <>
                                        <span className='title'>{visit?.VisitTrafficPrice} </span>
                                        <span className='body'>{translate[isLang]?.VisitDetails?.VisitTrafficPrice}</span>
                                    </> : SkeletonSummary()}
                                </Col>

                                <Col className="summary_blog">

                                    {isLoader ? <>
                                        <span className='title'>{visit?.VisitTotalPrice}</span>
                                        <span className='body'>{translate[isLang]?.VisitDetails?.VisitTotalPrice}</span>
                                    </> : SkeletonSummary()}
                                </Col>
                                <Col className="summary_blog">

                                    {isLoader ? <>
                                        <span className='title'>{visit?.VisitNote}</span>
                                        <span className='body'>{translate[isLang]?.VisitDetails?.VisitNote}</span>
                                    </> : SkeletonSummary()}
                                </Col>
                                <Col className="summary_blog">
                                    {isLoader ? <>
                                        <span className='title text-center'>{visit?.VisitStartTime.split(" ")[0]}{' '},{visit?.VisitStartTime.split(" ")[1]}</span>
                                        <span className='body'>{translate[isLang]?.VisitDetails?.VisitStartTime}</span>
                                    </> : SkeletonSummary()}
                                </Col>


                            </Row>
                        </div>

                    </Row> 
                    <div className="map">
                        
                    </div>
                        <Map
                            VisitLat={visit?.VisitLatitude}
                            VisitLong={visit?.VisitLongitude}
                            DoctorLat={visit?.DoctorLatitude}
                            DoctorLong={visit?.DoctorLongitude}
                        />

                </Container>
            </div>
        </>
    )
}

export default VisitDetails