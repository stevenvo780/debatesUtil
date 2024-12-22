import React from "react"
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap"

export default function ControlPanel({
  t,
  round,
  updateRoundValue,
  newRound,
  resetStorage,
  showStats,
  globalTimeInput,
  setGlobalTimeInput,
  changeAllTime
}) {
  return (
    <div className="section-box">
      <Row className="g-3">
        <Col sm={6} md={2} className="d-flex align-items-center">
          <Form.Label className="me-2 mb-0">{t('round')}</Form.Label>
          <Form.Control
            type="number"
            style={{ width: "80px" }}
            min="1"
            value={round}
            onChange={(e) => updateRoundValue(e.target.value)}
          />
        </Col>
        <Col sm={6} md={4}>
          <InputGroup>
            <Form.Control
              type="number"
              placeholder={t('minutes')}
              min="0"
              value={Math.floor(globalTimeInput)}
              onChange={(e) => setGlobalTimeInput(Number(e.target.value) + (globalTimeInput % 1))}
              style={{textAlign: 'center'}}
            />
            <Form.Control
              type="number"
              placeholder={t('seconds')}
              min="0"
              max="59"
              value={Math.round((globalTimeInput % 1) * 60)}
              onChange={(e) => {
                const secs = Number(e.target.value)
                if (secs >= 0 && secs <= 59) {
                  setGlobalTimeInput(Math.floor(globalTimeInput) + (secs / 60))
                }
              }}
              style={{textAlign: 'center'}}
            />
            <Button variant="warning" onClick={changeAllTime}>
              {t('changeTime')}
            </Button>
          </InputGroup>
        </Col>
        <Col sm={6} md={2}>
          <Button variant="secondary" className="w-100" onClick={newRound}>
            {t('newRound')}
          </Button>
        </Col>
        <Col sm={6} md={2}>
          <Button variant="danger" className="w-100" onClick={resetStorage}>
            {t('resetAll')}
          </Button>
        </Col>
        <Col sm={6} md={2}>
          <Button variant="info" className="w-100" onClick={showStats}>
            {t('showStats')}
          </Button>
        </Col>
      </Row>
    </div>
  )
}
