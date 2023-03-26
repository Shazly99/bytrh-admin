import React from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap';

const Complain = ({ isLang, translate, handleModalClose, modalShow, modalIndex, index, Name, user, Complain }) => {
    return (
        <>
            <Modal
                dir={isLang === "ar" ? "rtl" : "ltr"}
                show={modalShow && modalIndex === index}
                onHide={handleModalClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className='  w-100 text-center'>  {translate.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="name" style={{ marginBottom: "18px" }}>
                        <span className='ClientName bold ' style={{ fontSize: '20px', fontFamily: 'Tajawal' }}> {user}  </span>
                        <span >{Name}</span>
                    </div>
                    <textarea className="form-control" defaultValue={Complain} disabled />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleModalClose}>
                    {translate.btn}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Complain
