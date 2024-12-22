import React from "react"
import { Card, Form, Row, Col } from "react-bootstrap"

export default function GlobalSessionCard({
  globalSessionTitle,
  getGlobalSessionClock,
  toggleGlobalSession,
  onTitleChange,
  activeTimer,
  activeParticipant,
  activeTimeLeft
}) {
  return (
    <div className="section-box">
      <Form.Control
        placeholder="Título de la charla"
        style={{ background: "transparent", border: "none", fontSize: "2.2rem" }}
        value={globalSessionTitle}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <Row className="g-3 align-items-center mb-3">
        <Col sm={6} md={4} className="d-flex">
          <p
            style={{ cursor: "pointer", fontSize: "1.5rem", marginTop: "1rem" }}
            onClick={toggleGlobalSession}
          >
            <strong>Tiempo General:</strong> <span>{getGlobalSessionClock()}</span>
          </p>
        </Col>
        <Col sm={6} md={4} className="d-flex">
          <h5 className="mb-0 me-2">Active Timer:</h5>
          <div>{activeTimer}</div>
        </Col>
        <Col sm={6} md={4}>
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
    </div>
  )
}
