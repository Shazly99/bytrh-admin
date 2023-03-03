import React, { useContext, useState } from 'react'
import { Form, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Img from '../../../assets/Img';
import { ChatContext } from './../../../context/ChatStore';
import _ from 'lodash';
import { LinkContainer } from 'react-router-bootstrap';
import { apiheader, PostData } from '../../../utils/fetchData';

const DoctorList = () => {
    const colors = [
        { color: '#ffc700', rgba: '255, 199, 0' },
        { color: '#f1416c', rgba: '241, 65, 108' },
        { color: '#009ef7', rgba: '0, 158, 247' },
        { color: '#50cd89', rgba: '80, 205, 137' },
    ];
    const [active, setActive] = useState(false);
    const [loadSearch, setloadSearch] = useState(true);
    let { setDocChatSupport, docChatSupport } = useContext(ChatContext);

    const handelActive = () => {
        console.log('hmud');
        setActive(!active)
    }

    const handelSearchClientList = (event) => {
        setloadSearch(false)
        console.log(event.target.value);
        clientlist(event.target.value)

    };

    const clientlist =  _.debounce(async (doctorNAme) => {
        let { data } = await PostData(`https://bytrh.com/api/admin/chat/doctor/list`, { DoctorSearchKey: doctorNAme }, apiheader)
        setDocChatSupport(data.Response.DoctorChatSupport)
        setloadSearch(true)
    } ,1000)

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
                                        docChatSupport?.length <= 0 ?
                                            <>
                                                <div className="d-flex justify-content-center">
                                                    <img src={Img.searchNotFound} className="w-75" alt="" />
                                                </div>
                                            </> :
                                            <>

                                                {
                                                    docChatSupport?.map((chat, index) => (
                                                        <React.Fragment key={index} >
                                                            <div className='app__chat_list-grid'>
                                                                <LinkContainer to={`/chat/doctors/${chat?.IDDoctorChatSupport}`}  >
                                                                    <Nav.Link
                                                                        eventKey={index}
                                                                        className={`nav-link ${active ? "active user text-dark" : " user text-dark"}`}
                                                                        onClick={() => handelActive}
                                                                    >
                                                                        <div className='d-flex gap-2'>
                                                                            <div className="circle symbol-label">
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
                                                                        </div>

                                                                        <span className={`  ${chat?.ChatSupportStatus == 'PENDING' && 'txt_pending'}  
                                                                                            ${chat?.ChatSupportStatus == 'ONGOING' && 'txt_delivered'}
                                                                                            ${chat?.ChatSupportStatus == 'ENDED' && 'txt_rejected'}
                                                                                            `} style={{ backgroundColor: 'transparent !important', height: 'fit-content !important', marginRight: '10px' }}>
                                                                                            {chat?.ChatSupportStatus.toLowerCase()}
                                                                        </span>
                                                                    </Nav.Link>
                                                                </LinkContainer>



                                                             </div>
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </>
                                    }
                                </> :
                                <div className="d-flex justify-content-center">
                                    <img src={Img.search} className="w-75" alt="" />
                                </div>
                        }
                    </div>
                </div>

            </Col>
        </>
    )
}

export default DoctorList


