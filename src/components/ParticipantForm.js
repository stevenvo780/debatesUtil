import React from "react"
import { Row, Col, Button, Form } from "react-bootstrap"

export const generateShortId = () => {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

export default function ParticipantForm({
  t,  // añadir t a los props
  participantName,
  setParticipantName,
  initialTime,
  setInitialTime,
  addParticipant
}) {
  return (
    <div className="section-box">
      <h2 className="mb-3">{t('title')}</h2>
      <Row className="g-3">
        <Col sm={6} md={4}>
          <Form.Label>{t('participantName')}</Form.Label>
          <Form.Control
            type="text"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
          />
        </Col>
        <Col sm={6} md={4}>
          <Form.Label>{t('initialTime')}</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={initialTime}
            onChange={(e) => setInitialTime(e.target.value)}
          />
        </Col>
        <Col sm={6} md={4} className="d-flex align-items-end">
          <Button variant="primary" className="w-100" onClick={addParticipant}>
            {t('addParticipant')}
          </Button>
        </Col>
      </Row>
    </div>
  )
}
