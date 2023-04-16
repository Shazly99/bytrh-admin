import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { Col, Form, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ChatContext } from '../../../context/ChatStore';
import { PostData, apiheader } from '../../../utils/fetchData';
import Component from './../../../constants/Component';
const ClientList = () => {
    const [active, setActive] = useState(false);
    const [loadSearch, setloadSearch] = useState(true);
    let { setCChatSupport, cChatSupport } = useContext(ChatContext);

    const handelActive = () => {
         setActive(!active)
    }

    const handelSearchClientList = (event) => {
        setloadSearch(false) 
        clientlist(event.target.value)
    };

    const clientlist = _.debounce(async (clientNAme) => {
        let { data } = await PostData(`https://bytrh.com/api/admin/chat/client/list`, { ClientSearchKey: clientNAme }, apiheader)
        setCChatSupport(data.Response.ClientChatSupport)
        setloadSearch(true)

    }, 3000)
    return (
        <>
            <Col xl={4} lg={4} md={6} sm={12} className='app__chat_list-Users '>
                <div className='shadow app__chat_list-card '>
                    <span className="app__chat_list-search bg-info">
                        <Form.Control
                            placeholder=" Search By Name or Email or Phone"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            className='input__search'
                            onChange={handelSearchClientList}
                        />

                    </span>
                    <div className='d-flex flex-column gap-3 app__chat_list'>

                        {
                            loadSearch ?
                                <>
                                    {
                                        cChatSupport?.length <= 0 ?
                                            <>
                                                <div className="d-flex justify-content-center">
                                                <Component.Seach/>

                                                </div>
                                            </> :
                                            <>

                                                {
                                                    cChatSupport?.map((chat, index) => (
                                                        <React.Fragment key={index} >
                                                            <div className='app__chat_list-grid'>
                                                                <LinkContainer to={`/chat/clients/${chat?.IDClientChatSupport}`}  >
                                                                    <Nav.Link
                                                                        eventKey={index}
                                                                        className={`nav-link ${active ? "active user text-dark" : " user text-dark"}`}
                                                                        onClick={() => handelActive}
                                                                    >
                                                                        <div className='d-flex gap-2'>
                                                                            <div className="circle symbol-label">
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
                                                                        </div>

                                                                        <span className={`
                                                ${chat?.ChatSupportStatus == 'PENDING' && 'txt_pending'} 
                                                ${chat?.ChatSupportStatus == 'Shipped' && 'txt_shipped'}
                                                ${chat?.ChatSupportStatus == 'Out For Delivery' && 'txt_delivery'}
                                                ${chat?.ChatSupportStatus == 'ONGOING' && 'txt_delivered'}
                                                ${chat?.ChatSupportStatus == 'ENDED' && 'txt_rejected'}
                                                `} style={{ backgroundColor: 'transparent !important', height: 'fit-content !important', marginRight: '10px' }}>
                                                                            {chat?.ChatSupportStatus.toLowerCase()}
                                                                        </span>
                                                                    </Nav.Link>
                                                                </LinkContainer>



                                                                {/* <span className='chatSupportStatus'> {chat?.ChatSupportStatus.toLowerCase()}</span> */}
                                                            </div>
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </>
                                    }
                                </> :
                                <div className="d-flex justify-content-center">
                                    <Component.NotFound/>
                                </div>
                        }
                    </div>
                </div>

            </Col>
            {/* <React.Fragment key={index} >
                                    <Link to={`/chat/doctors/${chat?.IDDoctorChatSupport}`} className="user text-dark"> 
                                        <div
                                            style={{
                                                color: colors[index % colors.length].color,
                                                backgroundColor: `rgba(${colors[index % colors.length].rgba}, 0.1)`,
                                            }}
                                            className="circle symbol-label"
                                        >
                                            {chat?.DoctorName.split(" ").map(word => word.charAt(0).toUpperCase()).join("")}
                                        </div>
                                        <div className="content">
                                            <div className="name">
                                                {chat?.DoctorName}
                                            </div>
                                            <div className="email">
                                                {chat?.DoctorPhone}
                                            </div>
                                        </div>

                                    </Link>
                                </React.Fragment> */}
        </>
    )
}

export default ClientList