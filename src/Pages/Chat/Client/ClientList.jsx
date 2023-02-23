import React from 'react'
import { Form, Col } from 'react-bootstrap';
import Img from '../../../assets/Img';
import { Link } from 'react-router-dom';

const ClientList = ({ clientChatSupport }) => {
    const colors = ['#40AB45', '#006300', '#E20000', '#9804F0'];

    return (
        <>
            <Col xl={4} lg={4} md={6} sm={12} className='app__chat_list-Users '>
                <div className='shadow app__chat_list-card '>
                    <span className="app__chat_list-search">
                        <Form.Control
                            placeholder=" Search By Name or Email or Phone"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            className='input__search'
                        />
                    </span>
                    <div className='d-flex flex-column gap-3 app__chat_list'>
                        {
                            clientChatSupport?.map((chat, index) => (
                                <React.Fragment key={index} >

                                    <div className='app__chat_list-grid'>

                                        <Link to={`/chat/clients/${chat?.IDClientChatSupport}`} className="user text-dark">
                                            <div className="img">
                                                {/*             {chat?.IDClientChatSupport === 1 ?
                                                    <img src={Img.avatar4} width="50" height="50" style={{ borderRadius: '50% ' }} /> :
                                                    <img src={Img.avatar2} width="50" height="50" style={{ borderRadius: '50% ' }} />
                                                } */}

                                                <div
                                                    className="circle"
                                                    style={{
                                                        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                                                        // color: colors[Math.floor(Math.random() * colors.length)],
                                                    }}
                                                >
                                                    {chat?.ClientName.split(" ").map(word => word.charAt(0).toUpperCase()).join("")}
                                                </div>
                                            </div>
                                            <div className="content">
                                                <div className="name">
                                                    {chat?.ClientName}

                                                </div>
                                                <div className="email">
                                                    {chat?.ClientPhone}
                                                </div>
                                            </div>

                                        </Link>

                                        <span style={{ height: 'fit-content !important' }} className={`
                                          ${chat?.ChatSupportStatus == 'PENDING' && 'txt_pending'} 
                                          ${chat?.ChatSupportStatus == 'Shipped' && 'txt_shipped'}
                                          ${chat?.ChatSupportStatus == 'Out For Delivery' && 'txt_delivery'}
                                          ${chat?.ChatSupportStatus == 'ONGOING' && 'txt_delivered'}
                                          ${chat?.ChatSupportStatus == 'ENDED' && 'txt_rejected'}`} >
                                            {chat?.ChatSupportStatus.toLowerCase()}
                                        </span>

                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>

            </Col>
        </>
    )
}

export default ClientList