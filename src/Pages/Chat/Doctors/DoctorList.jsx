import React from 'react'
import { Form,    Col } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'; 
const DoctorList = ({ clientChatSupport }) => {
    const colors = [
        { color: '#ffc700', rgba: '255, 199, 0' },
        { color: '#f1416c', rgba: '241, 65, 108' },
        { color: '#009ef7', rgba: '0, 158, 247' },
        { color: '#50cd89', rgba: '80, 205, 137' },
    ];
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
                                </React.Fragment>
                            ))
                        }
 

                    </div>
                </div>

            </Col>
        </>
    )
}

export default DoctorList


