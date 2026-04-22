import React from "react"
import { Form } from "react-bootstrap"
import { BsGlobeCentralSouthAsia, BsPersonFill, BsStopwatchFill } from "react-icons/bs"

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
    <div className="section-box global-card">
      <Form.Control
        placeholder={t('chatTitle')}
        className="global-title-input"
        value={globalSessionTitle}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <div className="global-info-bar">
        <div className="global-stat" onClick={toggleGlobalSession} title={t('globalTime')} style={{ cursor: "pointer" }}>
          <BsGlobeCentralSouthAsia className="gstat-icon" />
          <span className="gstat-value">{getGlobalSessionClock()}</span>
        </div>
        <div className="global-stat" title={t('activeTimer')}>
          <BsStopwatchFill className="gstat-icon" />
          <span className="gstat-value">{activeTimer}</span>
        </div>
        <div className="global-active-participant">
          {activeParticipant
            ? <><BsPersonFill className="gstat-icon" /><span className="active-name">{activeParticipant.name}</span></>
            : <span className="active-name muted">{t('noActiveParticipant')}</span>
          }
        </div>
        <div className="global-timeleft">
          <span className="timeleft-value">{activeTimeLeft}</span>
        </div>
      </div>
    </div>
  )
}
