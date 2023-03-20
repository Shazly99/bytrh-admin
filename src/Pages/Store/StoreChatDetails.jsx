import { Player } from '@lottiefiles/react-lottie-player';
import { Skeleton } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import { useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import Img from '../../assets/Img';
import Component from '../../constants/Component';
import { GetData, apiheader } from '../../utils/fetchData';

const StoreChatDetails = () => {
    let { id } = useParams()
    const [animal, setAnimal] = useState([]);
    const [isLoader, setIsloader] = useState(false);
    const audioRef = useRef(null);



    // get store
    const store = async () => {
        await GetData(`${process.env.REACT_APP_API_URL}/admin/animalproducts/chat/details/${id}`, apiheader).then((res) => {
            setAnimal(res.Response);
            const timeoutId = setTimeout(() => {
                setIsloader(true)
            }, 200);
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
        return () => {
            store();
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
    const SkeletonImage = () => {
        return (
            <Skeleton variant="rounded" width={'100%'} height={170} />
        )
    }
    return (
        <div className='app__blog'>
            <Container fluid>
                <div className="app__addprodects">
                    <Component.SubNav sub__nav={[{ name: "   Product Details  ", path: `/store/details/${animal.IDAnimalProduct}` }, { name: "Chat Details ", path: `/store/details/${animal.IDAnimalProduct}/chat/${id}` }]} />
                </div>
                <Row>
                    <Col xl={6} lg={6} md={6} sm={12} className='store_info'>
                        <div className="store_header">
                            Buyer Info
                        </div>
                        <div className="store_info_body">
                            <Row >
                                <Col xl={5} lg={5} md={5} sm={5}  >
                                    {isLoader ? <> {animal.BuyerPicture ?
                                        <img src={animal.BuyerPicture} alt={animal.BuyerPicture} loading='lazy' height={170} width='100%' className='w-100 rounded' /> :
                                        <img src={Img.defaultImg} alt={animal.defaultImg} loading='lazy' height={170} width='100%' className='w-100 rounded' />}
                                    </> : SkeletonImage()}
                                </Col>
                                <Col xl={7} lg={7} md={7} sm={7} className="store_info_animal">
                                    {isLoader ? <div className="summary_blog">
                                        <span className='title'>Name :</span>
                                        <span className='body'>{animal?.BuyerName}</span>
                                    </div> : SkeletonCard()}

                                    {isLoader ? <div className="summary_blog">
                                        <span className='title'> Phone :</span>
                                        <span className='body'>{animal?.BuyerPhone}</span>
                                    </div> : SkeletonCard()}

                                    {isLoader ? <div className="summary_blog">
                                        <span className='title'> Chat Status :</span>
                                        <span className='body'>{animal?.ChatStatus?.charAt(0).toUpperCase() + animal?.ChatStatus?.slice(1).toLowerCase()}</span>
                                    </div> : SkeletonCard()}
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} className='store_info'>
                        <div className="store_header">
                            Client Info
                        </div>
                        <div className="store_info_body">
                            <Row>
                                <Col xl={5} lg={5} md={5} sm={5}  >
                                    {
                                        isLoader ? <>
                                            {animal.ClientPicture ?
                                                <img src={animal.ClientPicture} alt={'Client Picture'} width='100%' loading='lazy' height={170} className='w-100 rounded' /> :
                                                <img src={Img.defaultImg} alt={'Client tPicture'} loading='lazy' height={170} width='100%' className='w-100 rounded' />}
                                        </> : SkeletonImage()}
                                </Col>
                                <Col xl={7} lg={7} md={7} sm={7} className="store_info_animal">
                                    {
                                        isLoader ? <div className="summary_blog">
                                            <span className='title'>Name :</span>
                                            <span className='body'>{animal?.ClientName}</span>
                                        </div> : SkeletonCard()
                                    }
                                    {
                                        isLoader ? <div className="summary_blog">
                                            <span className='title'>Phone :</span>
                                            <span className='body'>{animal?.ClientPhone}</span>
                                        </div> : SkeletonCard()
                                    }
                                    {
                                        isLoader ? <div className="summary_blog">
                                            <span className='title'> City :</span>
                                            <span className='body'>{animal?.CityName}</span>
                                        </div> : SkeletonCard()
                                    }
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <div className="app__chat__Consult  mt-3  ">
                    <div className='app__chat'>
                        <Component.BaseHeader h2={'Chat Details :'} />
                        <Row className="app__chat__container " style={{ marginTop: '0' }}>
                            <Col xl={12} lg={12} md={12} sm={12} className='app__chat_messages '>
                                <div className='shadow app__chat_list-card'>
                                    <div className={`app__Live_chat chat-body   ${animal?.ChatDetails?.length === 0 ? 'bg-dark' : ''} `} style={{ background: 'rgb(217 217 217 / 28%)' }}>
                                        <ScrollToBottom className="message-container">
                                            {
                                                animal?.ChatDetails?.length === 0 ?
                                                    <div className="empty_chat   w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                                                        <div className="expired-container">
                                                            <Player
                                                                className="expired-image w-75"
                                                                // src="https://assets4.lottiefiles.com/packages/lf20_3vbOcw.json"
                                                                src="https://assets7.lottiefiles.com/packages/lf20_qwl4gi2d.json"

                                                                autoplay
                                                                loop
                                                            />
                                                        </div>                                                        <h2 className={` ${animal?.ChatDetails?.length === 0 ? 'text-light' : ''}`}>
                                                            Welcome, <span style={{ color: '#FAAA40' }}>admin!</span>
                                                        </h2>
                                                        <h4 className={` ${animal?.ChatDetails?.length === 0 ? 'text-light text-center' : ' text-center'}`}>This Chat Is Empty.</h4>
                                                    </div>
                                                    :
                                                    <>
                                                        {animal?.ChatDetails?.map((messageContent, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="message"
                                                                    id={messageContent.ChatSender === "CLIENT" ? "other" : "you"}
                                                                >
                                                                    <div>
                                                                        <div className="message-content"  >
                                                                            {
                                                                                messageContent.ChatType === "TEXT" &&
                                                                                <p>{messageContent.ChatMessage}</p>
                                                                            }
                                                                            {
                                                                                messageContent.ChatType === "IMAGE" &&
                                                                                <img loading="lazy" src={messageContent.ChatMessage} width="100%" className='rounded-3 w-50' />
                                                                            }
                                                                            {
                                                                                messageContent.ChatType === "AUDIO" &&
                                                                                <audio ref={audioRef} controls>
                                                                                    <source src={messageContent.ChatMessage} type="audio/ogg" />
                                                                                    <source src={messageContent.ChatMessage} type="audio/mpeg" />
                                                                                    Your browser does not support the audio element.
                                                                                </audio>
                                                                            }
                                                                        </div>
                                                                        <div className="message-meta">
                                                                            <p id="time">{messageContent.Date.split(" ")[0]} {' , '} {messageContent.ChatSender.charAt(0).toUpperCase() + messageContent?.ChatSender?.slice(1).toLowerCase()}</p>
                                                                            {/* ConsultChatSender */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </>
                                            }

                                        </ScrollToBottom>
                                    </div>
                                </div>

                            </Col >

                        </Row >
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default StoreChatDetails