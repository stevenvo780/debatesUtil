import React from "react"
import { Modal, Button, Form } from "react-bootstrap"

export default function EditModal({
  show,
  onHide,
  editParticipantId,
  editParticipantName,
  editParticipantTime,
  setEditParticipantName,
  setEditParticipantTime,
  saveParticipantChanges
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Participant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control type="hidden" value={editParticipantId || ""} readOnly />
        <div className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={editParticipantName}
            onChange={(e) => setEditParticipantName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Form.Label>Time (minutes)</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={editParticipantTime}
            onChange={(e) => setEditParticipantTime(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={saveParticipantChanges}>
          Save
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
