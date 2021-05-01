/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Modal, Container, Row, Col,
} from 'react-bootstrap';

function ComparisonModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <h5>Current Product Name</h5>
            </Col>
            <Col xs={6} md={4} />
            <Col xs={6} md={4}>
              <h5>Compared Product Name</h5>
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>

            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ComparisonModal;
