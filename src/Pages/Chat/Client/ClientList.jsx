import React from 'react'
import { Form, Col } from 'react-bootstrap';
import Img from '../../../assets/Img';
import { Link } from 'react-router-dom';

const ClientList = ({ clientChatSupport }) => {
 
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
                                            <div  className="circle symbol-label" >
                                                {chat?.ClientName.split(" ").map(word => word.charAt(0).toUpperCase()).join("")}
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

                                        <span   className={`
                                          ${chat?.ChatSupportStatus == 'PENDING' && 'txt_pending'} 
                                          ${chat?.ChatSupportStatus == 'Shipped' && 'txt_shipped'}
                                          ${chat?.ChatSupportStatus == 'Out For Delivery' && 'txt_delivery'}
                                          ${chat?.ChatSupportStatus == 'ONGOING' && 'txt_delivered'}
                                          ${chat?.ChatSupportStatus == 'ENDED' && 'txt_rejected'} `} style={{backgroundColor:'transparent !important', height: 'fit-content !important'}} >
                                            {chat?.ChatSupportStatus.toLowerCase()}
                                        </span> 

                                        {/* <span className='chatSupportStatus'> {chat?.ChatSupportStatus.toLowerCase()}</span> */}
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