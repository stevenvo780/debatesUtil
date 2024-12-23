import React from "react"
import { Form, Row, Col } from "react-bootstrap"

export default function GlobalSessionCard({
  t,
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
        placeholder={t('chatTitle')}
        style={{ 
          background: "transparent", 
          border: "none", 
          fontSize: "2.2rem",
          color: "var(--font-color)"
        }}
        className="global-session-title"
        value={globalSessionTitle}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <Row className="g-3 align-items-center mb-3">
        <Col sm={6} md={3} className="d-flex">
          <p
            style={{ cursor: "pointer", fontSize: "1.5rem", marginTop: "1rem" }}
            onClick={toggleGlobalSession}
          >
            <strong>{t('globalTime')}:</strong> <span>{getGlobalSessionClock()}</span>
          </p>
        </Col>
        <Col sm={6} md={3} className="d-flex">
          <h5 className="mb-0 me-2">{t('activeTimer')}:</h5>
          <div>{activeTimer}</div>
        </Col>
        <Col sm={6} md={3}>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <div style={{ fontSize: "3.5rem" }}>
              {activeParticipant ? activeParticipant.name : t('noActiveParticipant')}
            </div>
          </div>
        </Col>
        <Col sm={6} md={3}>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>

            <div style={{ fontSize: "3.5rem", fontWeight: "bold" }}>
              {activeTimeLeft}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
