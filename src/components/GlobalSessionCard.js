import React from "react"
import { Card, Form } from "react-bootstrap"

export default function GlobalSessionCard({ globalSessionTitle, getGlobalSessionClock, toggleGlobalSession, onTitleChange }) {
  return (
    <div className="section-box mb-3">
      <Card>
        <Card.Body>
          <Form.Control
            placeholder="Título de la charla"
            style={{ background: "transparent", border: "none", fontSize: "1.2rem" }}
            value={globalSessionTitle}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <p
            style={{ cursor: "pointer", fontSize: "1.5rem", marginTop: "1rem" }}
            onClick={toggleGlobalSession}
          >
            <strong>Tiempo General:</strong> <span>{getGlobalSessionClock()}</span>
          </p>
        </Card.Body>
      </Card>
    </div>
  )
}
