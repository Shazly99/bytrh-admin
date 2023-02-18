import React from 'react'
import { Col, Row } from 'react-bootstrap'
import '../chat.scss'
import { Form, Nav, NavDropdown } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import Icons from '../../../constants/Icons';
import Img from '../../../assets/Img';
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatClient = () => {
  return (
    <div className='app__chat'>
      <Row className="app__chat__container ">
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

              <div className="user">
                <div className="img">
                  <img src={Img.avatar1} width="50" height="50" style={{ borderRadius: '50% ' }} />
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


              <div className="user">
                <div className="img">
                  <img src={Img.avatar3} width="50" height="50" style={{ borderRadius: '50% ' }} />
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
              <div className="user">
                <div className="img">
                  <img src={Img.avatar4} width="50" height="50" style={{ borderRadius: '50% ' }} />
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
              <div className="user">
                <div className="img">
                  <img src={Img.avatar5} width="50" height="50" style={{ borderRadius: '50% ' }} />
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
              <div className="user">
                <div className="img">
                  <img src={Img.avatar6} width="50" height="50" style={{ borderRadius: '50% ' }} />
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
              <div className="user">
                <div className="img">
                  <img src={Img.avatar7} width="50" height="50" style={{ borderRadius: '50% ' }} />
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
              <div className="user">
                <div className="img">
                  <img src={Img.avatar8} width="50" height="50" style={{ borderRadius: '50% ' }} />
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
              <div className="user">
                <div className="img">
                  <img src={Img.avatar6} width="50" height="50" style={{ borderRadius: '50% ' }} />
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
              <div className="user">
                <div className="img">
                  <img src={Img.avatar7} width="50" height="50" style={{ borderRadius: '50% ' }} />
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
              <div className="user">
                <div className="img">
                  <img src={Img.avatar8} width="50" height="50" style={{ borderRadius: '50% ' }} />
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
        <Col xl={8} lg={8} md={6} sm={12} className='app__chat_messages '>
          <div className='shadow app__chat_list-card'>
            <div className='app__Live_chat chat-body'>
              <ScrollToBottom className="message-container">

                <div
                  className="message"
                  id={"you"}
                >
                  <div>
                    <div className="message-content">
                      <p >Hi my name is shazly</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">2023-02-16</p>
                    </div>
                  </div> 
                </div>

                <div
                  className="message"
                  id={"other"}
                >
                  <div>
                    <div className="message-content">
                      <p >Hi my name is shazly</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">2023-02-16</p>
                    </div>
                  </div> 
                </div>
              </ScrollToBottom>
            </div>
            <div className="app__send">
              <input type="text" class="form-control" />
              <button className='btn btn-info'>
                <Icons.send color='#fff' size={20} />
              </button>
            </div>
          </div>
        </Col>

      </Row>
    </div>
  )
}

export default ChatClient