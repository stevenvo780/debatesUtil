import React from "react"
import { Card, Form, Row, Col, InputGroup, Button } from "react-bootstrap"

export default function GlobalSessionCard({
  globalSessionTitle,
  getGlobalSessionClock,
  toggleGlobalSession,
  onTitleChange,
  activeTimer,
  globalTimeInput,
  setGlobalTimeInput,
  changeAllTime,
  activeParticipant,
  activeTimeLeft
}) {
  return (
    <div className="section-box mb-3">
      <Card>
        <Card.Body>
          <Form.Control
            placeholder="Título de la charla"
            style={{ background: "transparent", border: "none", fontSize: "2.2rem" }}
            value={globalSessionTitle}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <Row className="g-3 align-items-center mb-3">
            <Col sm={6} md={3} className="d-flex">
              <p
                style={{ cursor: "pointer", fontSize: "1.5rem", marginTop: "1rem" }}
                onClick={toggleGlobalSession}
              >
                <strong>Tiempo General:</strong> <span>{getGlobalSessionClock()}</span>
              </p>
            </Col>
            <Col sm={6} md={3} className="d-flex">
              <h5 className="mb-0 me-2">Active Timer:</h5>
              <div>{activeTimer}</div>
            </Col>
            <Col sm={6} md={3}>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="Set new time (minutes)"
                  min="1"
                  value={globalTimeInput}
                  onChange={(e) => setGlobalTimeInput(e.target.value)}
                />
                <Button variant="warning" onClick={changeAllTime}>
                  Change All
                </Button>
              </InputGroup>
            </Col>
            <Col sm={6} md={3}>
              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <div style={{ fontSize: "1.5rem" }}>
                  {activeParticipant ? activeParticipant.name : "No Active Participant"}
                </div>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                  {activeTimeLeft}
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}
