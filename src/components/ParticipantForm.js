import React from "react"
import { Row, Col, Button, Form } from "react-bootstrap"

export default function ParticipantForm({
  participantName,
  setParticipantName,
  initialTime,
  setInitialTime,
  addParticipant
}) {
  return (
    <div className="section-box">
      <h2 className="mb-3">Debate Moderator</h2>
      <Row className="g-3">
        <Col sm={6} md={4}>
          <Form.Label>Participant Name</Form.Label>
          <Form.Control
            type="text"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
          />
        </Col>
        <Col sm={6} md={4}>
          <Form.Label>Initial Time (minutes)</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={initialTime}
            onChange={(e) => setInitialTime(e.target.value)}
          />
        </Col>
        <Col sm={6} md={4} className="d-flex align-items-end">
          <Button variant="primary" className="w-100" onClick={addParticipant}>
            Add Participant
          </Button>
        </Col>
      </Row>
    </div>
  )
}