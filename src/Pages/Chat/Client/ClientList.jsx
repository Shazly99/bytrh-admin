import React from 'react'
import { Form, Nav, NavDropdown, Col } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import Img from '../../../assets/Img';
import { Link } from 'react-router-dom';
import Icons from '../../../constants/Icons';

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
                                    <Link to={`/chat/clients/${chat?.IDClientChatSupport}`} className="user text-dark">
                                        <div className="img">
                                            {chat?.IDClientChatSupport === 1 ?
                                                <img src={Img.avatar1} width="50" height="50" style={{ borderRadius: '50% ' }} /> :
                                                <img src={Img.avatar3} width="50" height="50" style={{ borderRadius: '50% ' }} />
                                            }
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
                                </React.Fragment>
                            ))
                        }

                        <div className="user">
                            <div className="img">
                                <img src={Img.avatar2} width="50" height="50" style={{ borderRadius: '50% ' }} />
                            </div>
                            <div className="content">
                                <div className="name">
                                    Ahmed Elshazly
                                </div>
                                <div className="email">
                                    ahmed@gmail.com
                                </div>
                            </div>

                        </div>


                    </div>
                </div>

            </Col>
        </>
    )
}

export default ClientList