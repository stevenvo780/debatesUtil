import React from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { BsPersonPlusFill, BsClockFill } from "react-icons/bs"

export const generateShortId = () => {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

export default function ParticipantForm({
  t,
  participantName,
  setParticipantName,
  initialTime,
  setInitialTime,
  addParticipant
}) {
  const handleKey = (e) => { if (e.key === 'Enter') addParticipant() }
  return (
    <div className="section-box">
      <div className="add-participant-row">
        <InputGroup>
          <InputGroup.Text><BsPersonPlusFill style={{ opacity: 0.7 }} /></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder={t('participantName')}
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            onKeyDown={handleKey}
          />
        </InputGroup>
        <InputGroup style={{ maxWidth: "160px" }}>
          <InputGroup.Text><BsClockFill style={{ opacity: 0.7 }} /></InputGroup.Text>
          <Form.Control
            type="number"
            min="1"
            value={initialTime}
            onChange={(e) => setInitialTime(e.target.value)}
            onKeyDown={handleKey}
          />
        </InputGroup>
        <Button variant="primary" onClick={addParticipant}>
          <BsPersonPlusFill style={{ marginRight: "0.4rem" }} />{t('addParticipant')}
        </Button>
      </div>
    </div>
  )
}
