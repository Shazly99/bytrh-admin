import React from 'react'
import { Modal,Button } from 'react-bootstrap';

const ModalPrice = ({ handleModalClose, modalShow, modalIndex, index, Name, price }) => {

    return (
        <Modal
            show={modalShow  }
            onHide={handleModalClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className='  w-100 text-center'>  price Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
 
                <textarea className="form-control" defaultValue={price} disabled />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleModalClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalPrice