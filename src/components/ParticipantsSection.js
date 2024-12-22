import React from "react"
import { Row, Col, Card, Button } from "react-bootstrap"

export default function ParticipantsSection({
  t,
  participants,
  round,
  activeParticipantId,
  toggleTimer,
  editParticipant,
  addPenalty,
  resetTime,
  removeParticipant,
  formatTime
}) {
  return (
    <div className="section-box">
      <Row className="g-3">
        {participants.map((p) => {
          const roundTime = p.roundTimes[round] ? p.roundTimes[round] : 0
          const isActive = activeParticipantId === p.id
          const statusClass = isActive ? "bg-success" : "bg-secondary"
          const inDanger = p.timeLeft <= 0
          const dangerClass = inDanger ? "bg-danger" : ""
          const textColorClass = p.timeLeft <= 15 ? "text-white" : ""
          let animationStyle = {}
          if (!inDanger && p.timeLeft <= 30) {
            const offset = 30 - p.timeLeft
            animationStyle = { animation: `dyingGradient 30s linear -${offset}s forwards` }
          }
          return (
            <Col key={p.id} xs={12} sm={6} md={3} lg={3}>
              <Card className="mb-3 h-100" onClick={() => toggleTimer(p.id)}>
                <Card.Body style={animationStyle} className={`${dangerClass} ${textColorClass}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Card.Title>
                      {p.name}
                    </Card.Title>
                    <div style={{ cursor: "pointer" }} onClick={(e) => editParticipant(p.id, e)}>
                      ✏️
                    </div>
                  </div>
                  <p className={textColorClass}>
                    <strong>{t('roundTime')}:</strong> {formatTime(roundTime)}
                  </p>
                  <p className={textColorClass}>
                    <strong>{t('totalUsed')}:</strong> {formatTime(p.totalUsed)}
                  </p>
                  <p className={textColorClass}>
                    <strong>{t('timeLeft')}:</strong> {formatTime(p.timeLeft)}
                  </p>
                  <p>
                    <span className={"badge " + statusClass}>{isActive ? t('active') : t('paused')}</span>
                  </p>
                  <p>
                    <strong>{t('penalties')}:</strong>{" "}
                    <span className={dangerClass ? "text-white" : "text-danger"}>{p.penalties}</span>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      style={{ marginLeft: "0.5rem" }}
                      onClick={(e) => addPenalty(p.id, e)}
                    >
                      +
                    </Button>
                  </p>
                  <Button variant="info" size="sm" onClick={(e) => resetTime(p.id, e)}>
                    {t('reset')}
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={(e) => removeParticipant(p.id, e)}>
                    {t('remove')}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
