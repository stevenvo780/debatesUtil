import React from "react"
import { Row, Col, Card, Button } from "react-bootstrap"
import {
  BsFillTrashFill, BsFillPencilFill, BsArrowCounterclockwise,
  BsDashLg, BsPlusLg,
  BsClockFill, BsHourglassSplit,
  BsPlayFill, BsPauseFill,
  BsTrophyFill, BsPersonFill
} from "react-icons/bs"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import DragBar from "./DragBar"
import "../styles/ParticipantsSection.css"

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
    if (e.target.closest("button, a")) return
    if (!isDragging) onClick && onClick(e)
  }
  return (
    <div ref={setNodeRef} style={style} onClick={handleClick}>
      <div {...attributes} {...listeners}>
        <DragBar />
      </div>
      {children}
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
          <Row className="g-3 justify-content-center participants-grid">
            {participants.map(p => {
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
                    <Card
                      className={`mb-3 h-100 participant-card${isActive ? " card-active" : ""}`}
                      style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.15)", transition: "all 0.2s ease-in-out" }}
                      role="button"
                      tabIndex={0}>
                      <Card.Body style={animationStyle} className={`${dangerClass} ${textColorClass} participant-body`}>

                        {/* ── Cabecera: nombre + editar ── */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", minWidth: 0 }}>
                            <BsPersonFill style={{ opacity: 0.5, flexShrink: 0, width: "0.85rem", height: "0.85rem" }} />
                            <span className="participant-name">{p.name}</span>
                          </div>
                          <Button variant="link" className="icon-button p-1" onClick={(e) => editParticipant(p.id, e)} aria-label="Editar participante">
                            <BsFillPencilFill style={{ color: "#6c757d", width: "1rem", height: "1rem" }} />
                          </Button>
                        </div>

                        {/* ── Tiempo ── */}
                        <div className="timer-block">
                          <span className={`time-left ${textColorClass}`}>{formatTime(p.timeLeft)}</span>
                          <span className={`status-pill ${isActive ? "pill-active" : "pill-paused"}`}>
                            {isActive ? <BsPlayFill /> : <BsPauseFill />}
                          </span>
                        </div>

                        {/* ── Puntaje: [-] [🏆 score] [+] ── */}
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch", gap: "0.45rem", width: "100%", margin: "0.65rem 0" }}>
                          <Button
                            variant={inDanger ? "outline-light" : "outline-danger"}
                            style={{ flex: 1, minWidth: 0, height: "48px", borderRadius: "12px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                            onClick={(e) => { e.stopPropagation(); adjustScore && adjustScore(p.id, -1) }}
                            aria-label={`${t("decreasePoints")}: ${p.name}`}>
                            <BsDashLg style={{ width: "1.1rem", height: "1.1rem" }} />
                          </Button>
                          <div style={{ flex: "0 0 56px", minWidth: "56px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1px" }}>
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

                        {/* ── Stats ── */}
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

                        {/* ── Acciones ── */}
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.25rem", marginTop: "0.5rem" }}>
                          <Button variant="link" className="icon-button p-1" onClick={(e) => resetTime(p.id, e)} title={t("reset")}>
                            <BsArrowCounterclockwise style={{ color: "#0dcaf0", width: "1.25rem", height: "1.25rem" }} />
                          </Button>
                          <Button variant="link" className="icon-button p-1" onClick={(e) => removeParticipant(p.id, e)} title={t("remove")}>
                            <BsFillTrashFill style={{ color: "#dc3545", width: "1.25rem", height: "1.25rem" }} />
                          </Button>
                        </div>

                      </Card.Body>
                    </Card>
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
