import React from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { BsArrowRepeat, BsClockHistory, BsBarChartFill, BsSkipForwardFill, BsTrash3Fill } from "react-icons/bs"

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
    <div className="section-box control-panel">
      <div className="control-row">
        {/* Ronda */}
        <div className="control-group">
          <BsArrowRepeat className="ctrl-icon" />
          <Form.Control
            type="number"
            className="ctrl-input"
            min="1"
            value={round}
            onChange={(e) => updateRoundValue(e.target.value)}
          />
        </div>

        {/* Tiempo */}
        <div className="control-group">
          <BsClockHistory className="ctrl-icon" />
          <InputGroup className="ctrl-time-group">
            <Form.Control
              type="number"
              placeholder={t('minutes')}
              min="0"
              value={Math.floor(globalTimeInput)}
              onChange={(e) => setGlobalTimeInput(Number(e.target.value) + (globalTimeInput % 1))}
              style={{ textAlign: 'center' }}
            />
            <InputGroup.Text style={{ padding: "0 0.35rem", fontWeight: 700, opacity: 0.7 }}>:</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder={t('seconds')}
              min="0"
              max="59"
              value={Math.round((globalTimeInput % 1) * 60)}
              onChange={(e) => {
                const secs = Number(e.target.value)
                if (secs >= 0 && secs <= 59) setGlobalTimeInput(Math.floor(globalTimeInput) + (secs / 60))
              }}
              style={{ textAlign: 'center' }}
            />
          </InputGroup>
          <Button variant="warning" className="ctrl-btn" onClick={changeAllTime} title={t('changeTime')}>
            <BsClockHistory style={{ width: "1rem", height: "1rem" }} />
          </Button>
        </div>

        {/* Acciones */}
        <div className="control-group control-actions">
          <Button variant="secondary" className="ctrl-action-btn" onClick={newRound} title={t('newRound')}>
            <BsSkipForwardFill style={{ width: "1rem", height: "1rem" }} />
            <span>{t('newRound')}</span>
          </Button>
          <Button variant="danger" className="ctrl-action-btn" onClick={resetStorage} title={t('resetAll')}>
            <BsTrash3Fill style={{ width: "1rem", height: "1rem" }} />
          </Button>
          <Button variant="info" className="ctrl-action-btn" onClick={showStats} title={t('showStats')}>
            <BsBarChartFill style={{ width: "1rem", height: "1rem" }} />
          </Button>
        </div>
      </div>
    </div>
  )
}
