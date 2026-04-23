import React from "react"
import { Row, Col, Card, Button } from "react-bootstrap"
import {
  BsFillTrashFill, BsFillPencilFill, BsArrowCounterclockwise,
  BsDashLg, BsPlusLg,
  BsClockFill, BsHourglassSplit,
  BsPlayFill, BsPauseFill,
  BsTrophyFill
} from "react-icons/bs"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import "../styles/ParticipantsSection.css"
import { getParticipantVisual } from "../participantVisuals"

function getParticipantColProps(count) {
  if (count <= 1) {
    return { xs: 12 }
  }

  if (count === 2) {
    return { xs: 12, md: 6 }
  }

  if (count === 3) {
    return { xs: 12, md: 6, xl: 4 }
  }

  return { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }
}

function getParticipantsShellClass(count) {
  if (count <= 1) {
    return "participants-shell participants-shell-single"
  }

  if (count === 2) {
    return "participants-shell participants-shell-pair"
  }

  return "participants-shell"
}

function SortableItem({ id, onClick, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition, width: "100%" }
  const handleClick = (e) => {
    if (e.target.closest("button, a, .drag-handle")) return
    if (!isDragging) onClick && onClick(e)
  }

  const dragHandleProps = {
    ...attributes,
    ...listeners,
  }

  return (
    <div ref={setNodeRef} style={style} onClick={handleClick}>
      {children({ dragHandleProps })}
    </div>
  )
}

export default function ParticipantsSection({
  t,
  participants,
  round,
  activeParticipantId,
  toggleTimer,
  adjustScore,
  editParticipant,
  resetTime,
  removeParticipant,
  formatTime,
  onReorder,
}) {
  const participantColProps = getParticipantColProps(participants.length)
  const participantsShellClass = getParticipantsShellClass(participants.length)

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return
    if (active.id === over.id) return
    const oldIndex = participants.findIndex(p => p.id === active.id)
    const newIndex = participants.findIndex(p => p.id === over.id)
    const newItems = arrayMove(participants, oldIndex, newIndex)
    onReorder && onReorder(newItems)
  }
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={participants.map(p => p.id)} strategy={rectSortingStrategy}>
        <div className={`section-box ${participantsShellClass}`}>
          <Row className="g-2 justify-content-center participants-grid">
            {participants.map(p => {
              const participantVisual = getParticipantVisual(p)
              const ParticipantIcon = participantVisual.Icon
              const roundTime = p.roundTimes[round] ? p.roundTimes[round] : 0
              const isActive = activeParticipantId === p.id
              const inDanger = p.timeLeft <= 0
              const dangerClass = inDanger ? "bg-danger" : ""
              const textColorClass = p.timeLeft <= 15 ? "text-white" : ""
              let animationStyle = {}
              if (!inDanger && p.timeLeft <= 30) {
                const offset = 30 - p.timeLeft
                animationStyle = { animation: `dyingGradient 30s linear -${offset}s forwards` }
              }
              return (
                <Col key={p.id} {...participantColProps}>
                  <SortableItem id={p.id} onClick={() => toggleTimer(p.id)}>
                    {({ dragHandleProps }) => (
                      <Card
                        className={`h-100 participant-card${isActive ? " card-active" : ""}`}
                        style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.15)", transition: "all 0.2s ease-in-out" }}
                        role="button"
                        tabIndex={0}>
                        <Card.Body style={animationStyle} className={`${dangerClass} ${textColorClass} participant-body`}>

                          <div className="participant-header">
                            <div className="participant-headline drag-handle" {...dragHandleProps} title={p.name} aria-label={p.name}>
                              <span
                                className="participant-crest"
                                style={{
                                  background: participantVisual.background,
                                  boxShadow: `inset 0 0 0 1px ${participantVisual.border}`,
                                }}
                              >
                                <ParticipantIcon className="participant-head-icon" style={{ color: participantVisual.color }} />
                              </span>
                              <span className="participant-name">{p.name}</span>
                            </div>

                            <div className="participant-header-actions">
                              <Button variant="link" className="icon-button p-1" onClick={(e) => editParticipant(p.id, e)} title={t("editParticipant")} aria-label={t("editParticipant")}>
                                <BsFillPencilFill style={{ color: "#6c757d", width: "0.95rem", height: "0.95rem" }} />
                              </Button>
                              <Button variant="link" className="icon-button p-1" onClick={(e) => resetTime(p.id, e)} title={t("reset")} aria-label={t("reset")}>
                                <BsArrowCounterclockwise style={{ color: "#0dcaf0", width: "1rem", height: "1rem" }} />
                              </Button>
                              <Button variant="link" className="icon-button p-1" onClick={(e) => removeParticipant(p.id, e)} title={t("remove")} aria-label={t("remove")}>
                                <BsFillTrashFill style={{ color: "#dc3545", width: "1rem", height: "1rem" }} />
                              </Button>
                            </div>
                          </div>

                          <div className="timer-block">
                            <span className={`time-left ${textColorClass}`}>{formatTime(p.timeLeft)}</span>
                            <span className={`status-pill ${isActive ? "pill-active" : "pill-paused"}`}>
                              {isActive ? <BsPlayFill /> : <BsPauseFill />}
                            </span>
                          </div>

                          <div className="participant-score-row">
                            <Button
                              variant={inDanger ? "outline-light" : "outline-danger"}
                              style={{ flex: 1, minWidth: 0, height: "48px", borderRadius: "12px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                              onClick={(e) => { e.stopPropagation(); adjustScore && adjustScore(p.id, -1) }}
                              aria-label={`${t("decreasePoints")}: ${p.name}`}>
                              <BsDashLg style={{ width: "1.1rem", height: "1.1rem" }} />
                            </Button>
                            <div className="participant-score-middle">
                              <BsTrophyFill style={{ width: "0.6rem", height: "0.6rem", opacity: 0.45, color: "#DAA520" }} />
                              <span className={`points-display ${inDanger ? "on-danger" : p.penalties > 0 ? "positive" : p.penalties < 0 ? "negative" : ""}`}>
                                {p.penalties >= 0 ? "+" : ""}{p.penalties}
                              </span>
                            </div>
                            <Button
                              variant={inDanger ? "outline-light" : "outline-success"}
                              style={{ flex: 1, minWidth: 0, height: "48px", borderRadius: "12px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                              onClick={(e) => { e.stopPropagation(); adjustScore && adjustScore(p.id, 1) }}
                              aria-label={`${t("increasePoints")}: ${p.name}`}>
                              <BsPlusLg style={{ width: "1.1rem", height: "1.1rem" }} />
                            </Button>
                          </div>

                          <div className="stats-row">
                            <span className={`stat-item ${textColorClass}`}>
                              <BsClockFill className="stat-icon" />
                              <span className="stat-value">{formatTime(roundTime)}</span>
                            </span>
                            <span className={`stat-item ${textColorClass}`}>
                              <BsHourglassSplit className="stat-icon" />
                              <span className="stat-value">{formatTime(p.totalUsed)}</span>
                            </span>
                          </div>

                        </Card.Body>
                      </Card>
                    )}
                  </SortableItem>
                </Col>
              )
            })}
          </Row>
        </div>
      </SortableContext>
    </DndContext>
  )
}
