import React from "react"
import { Row, Col, Button, Form } from "react-bootstrap"

export default function ControlPanel({
  round,
  updateRoundValue,
  newRound,
  resetStorage,
  showStats
}) {
  return (
    <div className="section-box">
      <Row className="g-3">
        <Col sm={6} md={2} className="d-flex align-items-center">
          <Form.Label className="me-2 mb-0">Round</Form.Label>
          <Form.Control
            type="number"
            style={{ width: "80px" }}
            min="1"
            value={round}
            onChange={(e) => updateRoundValue(e.target.value)}
          />
        </Col>
        <Col sm={6} md={2}>
          <Button variant="secondary" className="w-100" onClick={newRound}>
            New Round
          </Button>
        </Col>
        <Col sm={6} md={2}>
          <Button variant="danger" className="w-100" onClick={resetStorage}>
            Reset All
          </Button>
        </Col>
        <Col sm={6} md={2}>
          <Button variant="info" className="w-100" onClick={showStats}>
            Show Stats
          </Button>
        </Col>
      </Row>
    </div>
  )
}
