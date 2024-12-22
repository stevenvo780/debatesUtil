import React from "react"
import { Row, Col, Card, Button } from "react-bootstrap"
import { 
  BsTrash, 
  BsPencil, 
  BsArrowCounterclockwise, 
  BsExclamationTriangle 
} from 'react-icons/bs'

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
              <Card 
                className="mb-3 h-100 participant-card" 
                style={{ 
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease-in-out'
                }}
                role="button"
                tabIndex={0}
                onClick={() => toggleTimer(p.id)}>
                <Card.Body style={animationStyle} className={`${dangerClass} ${textColorClass}`}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title style={{ fontSize: '1.2rem', margin: 0 }}>
                      {p.name}
                    </Card.Title>
                    <div className="d-flex gap-1">
                      <Button 
                        variant="link"
                        className="icon-button p-1"
                        onClick={(e) => editParticipant(p.id, e)}
                        aria-label="Editar participante">
                        <BsPencil />
                      </Button>
                    </div>
                  </div>

                  <div className="time-info mb-2">
                    <h3 className={`time-left ${textColorClass}`} style={{fontSize: '1.8rem', textAlign: 'center', marginBottom: '0.2rem'}}>
                      {formatTime(p.timeLeft)}
                    </h3>
                    <div className="d-flex justify-content-center">
                      <span className={"badge " + statusClass}>{isActive ? t('active') : t('paused')}</span>
                    </div>
                  </div>

                  <div className="stats-grid small mb-2">
                    <div className={textColorClass}>
                      <div>{t('roundTime')}: {formatTime(roundTime)}</div>
                      <div>{t('totalUsed')}: {formatTime(p.totalUsed)}</div>
                    </div>
                  </div>

                  <div className="actions d-flex justify-content-between align-items-center">
                    <div className="penalties-group d-flex align-items-center">
                      <span className={dangerClass ? "text-white" : "text-danger"}>
                        {p.penalties > 0 && (
                          <><BsExclamationTriangle /> {p.penalties}</>
                        )}
                      </span>
                      <Button
                        variant="link"
                        size="sm"
                        className="icon-button p-1"
                        onClick={(e) => addPenalty(p.id, e)}
                        title={t('penalties')}>
                        <BsExclamationTriangle className="text-danger" />
                      </Button>
                    </div>
                    
                    <div className="control-buttons d-flex gap-1">
                      <Button 
                        variant="link" 
                        size="sm"
                        className="icon-button p-1"
                        onClick={(e) => resetTime(p.id, e)}
                        title={t('reset')}>
                        <BsArrowCounterclockwise className="text-info" />
                      </Button>
                      <Button 
                        variant="link" 
                        size="sm"
                        className="icon-button p-1"
                        onClick={(e) => removeParticipant(p.id, e)}
                        title={t('remove')}>
                        <BsTrash className="text-danger" />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
