import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SwapiModal = ({ isVisible = false, show, title, content, handleClose }) => {
  return !isVisible ? null : (
    <>
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>{content}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        
      </Modal>
    </>
  )
}

export default SwapiModal;