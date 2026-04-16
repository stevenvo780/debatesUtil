import React, { useState, useCallback } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { BsFillTrashFill, BsPlusCircleFill, BsPencilFill, BsCheckLg, BsXLg, BsSearch, BsShieldFill, BsLightningFill, BsJournalText } from "react-icons/bs"
import "../styles/CriteriaSidebar.css"

const FALLACY_DEFS = {
  'Ad Hominem': 'Atacar a la persona en lugar de su argumento.',
  'Hombre de paja': 'Distorsionar el argumento ajeno para atacar una versión más débil.',
  'Falsa dicotomía': 'Presentar solo dos opciones cuando existen más alternativas.',
  'Pendiente resbaladiza': 'Afirmar que una acción llevará inevitablemente a consecuencias extremas.',
  'Apelación a la autoridad': 'Usar una autoridad no relevante como prueba de un argumento.',
  'Apelación a la emoción': 'Manipular emociones en vez de usar razonamiento lógico.',
  'Apelación a la ignorancia': 'Asumir que algo es cierto porque no se ha demostrado falso, o viceversa.',
  'Apelación a la tradición': 'Justificar algo solo porque siempre se ha hecho así.',
  'Apelación a la naturaleza': 'Argumentar que lo natural es inherentemente bueno o correcto.',
  'Ad Populum': 'Afirmar que algo es verdad porque la mayoría lo cree.',
  'Tu Quoque': 'Desviar la crítica señalando que el otro hace lo mismo.',
  'Petición de principio': 'Usar la conclusión como premisa del propio argumento.',
  'Post Hoc': 'Asumir que si B ocurrió después de A, entonces A causó B.',
  'Generalización apresurada': 'Sacar una conclusión general a partir de pocos casos.',
  'Falsa equivalencia': 'Tratar dos cosas como iguales cuando tienen diferencias relevantes.',
  'Red Herring': 'Introducir un tema irrelevante para desviar la atención.',
  'Envenenamiento del pozo': 'Desacreditar al oponente antes de que presente su argumento.',
  'No verdadero escocés': 'Redefinir un grupo para excluir contraejemplos incómodos.',
  'Carga de la prueba': 'Exigir que el otro demuestre la negativa en vez de probar la afirmación.',
  'Equívoco': 'Usar una palabra con doble sentido para confundir el argumento.',
  'Ad Baculum': 'Recurrir a amenazas o al miedo para imponer una posición.',
  'Ad Misericordiam': 'Apelar a la lástima para ganar el argumento.',
  'Francotirador de Texas': 'Seleccionar datos favorables ignorando los que contradicen la tesis.',
  'Falacia genética': 'Juzgar algo como bueno o malo solo por su origen.',
  'Falacia naturalista': 'Derivar lo que debe ser a partir de lo que es.',
}

const FALLACY_SCORES = {
  landed: 2,
  detected: -1,
}

export default function CriteriaSidebar({
  t,
  criteria,
  fallacies,
  onAddCriterion,
  onUpdateCriterion,
  onRemoveCriterion,
  onApplyCriterion,
  onAddFallacy,
  onUpdateFallacy,
  onRemoveFallacy,
  activeParticipant,
}) {
  const [newName, setNewName] = useState("")
  const [newPoints, setNewPoints] = useState(1)
  const [isPenalty, setIsPenalty] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState("")
  const [editPoints, setEditPoints] = useState(1)
  const [fallacySearch, setFallacySearch] = useState("")
  const [newFallacyName, setNewFallacyName] = useState("")
  const [editingFallacyId, setEditingFallacyId] = useState(null)
  const [editFallacyName, setEditFallacyName] = useState("")
  const [activeTab, setActiveTab] = useState("fallacies")
  const [selectedFallacy, setSelectedFallacy] = useState(null)
  const [flashAction, setFlashAction] = useState(null) // "landed" | "detected"
  const [defPopoverId, setDefPopoverId] = useState(null)

  const handleAdd = () => {
    if (!newName.trim()) return
    const pts = parseInt(newPoints) || 1
    onAddCriterion({
      name: newName.trim(),
      points: isPenalty ? -Math.abs(pts) : Math.abs(pts)
    })
    setNewName("")
    setNewPoints(1)
    setIsPenalty(false)
  }

  const startEdit = (c) => {
    setEditingId(c.id)
    setEditName(c.name)
    setEditPoints(Math.abs(c.points))
  }

  const saveEdit = (c) => {
    if (!editName.trim()) return
    const pts = parseInt(editPoints) || 1
    onUpdateCriterion({
      ...c,
      name: editName.trim(),
      points: c.points < 0 ? -Math.abs(pts) : Math.abs(pts)
    })
    setEditingId(null)
  }

  const handleSelectFallacy = useCallback((f) => {
    setSelectedFallacy(prev => prev?.id === f.id ? null : f)
  }, [])

  const handleApplyFallacy = useCallback((type) => {
    if (!selectedFallacy || !activeParticipant) return
    const points = FALLACY_SCORES[type]
    onApplyCriterion({ name: selectedFallacy.name, points })
    setFlashAction(type)
    setTimeout(() => {
      setFlashAction(null)
      setSelectedFallacy(null)
    }, 600)
  }, [selectedFallacy, activeParticipant, onApplyCriterion])

  const filteredFallacies = (fallacies || []).filter(f =>
    f.name.toLowerCase().includes(fallacySearch.toLowerCase())
  )

  const bonuses = (criteria || []).filter(c => c.points > 0)
  const penalties = (criteria || []).filter(c => c.points < 0)

  return (
    <div className="criteria-sidebar">
      <div className="sidebar-content">
        <h6 className="sidebar-title">{t("manageCriteria")}</h6>

          {activeParticipant ? (
            <div className="active-target">
              <small>{t("applyingTo")}:</small>
              <strong>{activeParticipant.name}</strong>
              <span className="target-score">{activeParticipant.penalties} pts</span>
            </div>
          ) : (
            <div className="no-target">
              <small>{t("noActiveTarget")}</small>
            </div>
          )}

          {/* Tabs */}
          <div className="sidebar-tabs">
            <button
              className={`stab ${activeTab === "fallacies" ? "active" : ""}`}
              onClick={() => setActiveTab("fallacies")}
            >
              {t("fallacies")}
            </button>
            <button
              className={`stab ${activeTab === "criteria" ? "active" : ""}`}
              onClick={() => setActiveTab("criteria")}
            >
              {t("otherCriteria")}
            </button>
          </div>

          {/* ── FALLACIES TAB ── */}
          {activeTab === "fallacies" && (
            <div className="tab-content-area">
              {/* Search */}
              <InputGroup size="sm" className="fallacy-search">
                <InputGroup.Text><BsSearch /></InputGroup.Text>
                <Form.Control
                  placeholder={t("searchFallacy")}
                  value={fallacySearch}
                  onChange={(e) => setFallacySearch(e.target.value)}
                />
              </InputGroup>

              {/* Action panel — appears when a fallacy is selected */}
              {selectedFallacy && (
                <div className={`fallacy-action-panel ${flashAction ? `flash-${flashAction}` : ""}`}>
                  <div className="action-panel-header">
                    <span className="action-panel-name">{selectedFallacy.name}</span>
                    <button className="action-panel-close" onClick={() => setSelectedFallacy(null)}>
                      <BsXLg />
                    </button>
                  </div>
                  <div className="action-panel-buttons">
                    <button
                      className="action-big-btn landed"
                      onClick={() => handleApplyFallacy("landed")}
                      disabled={!activeParticipant}
                    >
                      <BsLightningFill />
                      <span>{t("landed")}</span>
                      <strong>+{FALLACY_SCORES.landed}</strong>
                    </button>
                    <button
                      className="action-big-btn detected"
                      onClick={() => handleApplyFallacy("detected")}
                      disabled={!activeParticipant}
                    >
                      <BsShieldFill />
                      <span>{t("detected")}</span>
                      <strong>{FALLACY_SCORES.detected}</strong>
                    </button>
                  </div>
                  {!activeParticipant && (
                    <div className="action-panel-warn">{t("noActiveTarget")}</div>
                  )}
                </div>
              )}

              {/* Fallacy list */}
              <div className="fallacy-list">
                {filteredFallacies.map(f => (
                  <div key={f.id} className={`fallacy-item ${selectedFallacy?.id === f.id ? "selected" : ""}`}>
                    {editingFallacyId === f.id ? (
                      <div className="criterion-edit">
                        <Form.Control
                          size="sm"
                          value={editFallacyName}
                          onChange={(e) => setEditFallacyName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && editFallacyName.trim()) {
                              onUpdateFallacy({ ...f, name: editFallacyName.trim() })
                              setEditingFallacyId(null)
                            }
                          }}
                        />
                        <Button size="sm" variant="link" className="edit-action" onClick={() => {
                          if (editFallacyName.trim()) {
                            onUpdateFallacy({ ...f, name: editFallacyName.trim() })
                            setEditingFallacyId(null)
                          }
                        }}><BsCheckLg /></Button>
                        <Button size="sm" variant="link" className="edit-action" onClick={() => setEditingFallacyId(null)}><BsXLg /></Button>
                      </div>
                    ) : (
                      <>
                        <button
                          className="fallacy-info-btn"
                          onClick={(e) => { e.stopPropagation(); setDefPopoverId(defPopoverId === f.id ? null : f.id) }}
                          title={f.def || ''}
                        >
                          <BsJournalText />
                        </button>
                        <button
                          className="fallacy-select-btn"
                          onClick={() => handleSelectFallacy(f)}
                        >
                          {f.name}
                        </button>
                        <div className="fallacy-meta-actions">
                          <button className="action-btn" onClick={() => {
                            setEditingFallacyId(f.id)
                            setEditFallacyName(f.name)
                          }}><BsPencilFill /></button>
                          <button className="action-btn danger" onClick={() => onRemoveFallacy(f.id)}><BsFillTrashFill /></button>
                        </div>
                        {defPopoverId === f.id && (f.def || FALLACY_DEFS[f.name]) && (
                          <div className="fallacy-def-popover">
                            <div className="def-popover-header">
                              <strong>{f.name}</strong>
                              <button onClick={(e) => { e.stopPropagation(); setDefPopoverId(null) }}><BsXLg /></button>
                            </div>
                            <p>{f.def || FALLACY_DEFS[f.name]}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Add fallacy */}
              <div className="add-fallacy-form">
                <InputGroup size="sm">
                  <Form.Control
                    placeholder={t("fallacyName")}
                    value={newFallacyName}
                    onChange={(e) => setNewFallacyName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newFallacyName.trim()) {
                        onAddFallacy({ name: newFallacyName.trim() })
                        setNewFallacyName("")
                      }
                    }}
                  />
                  <Button
                    variant="outline-warning"
                    onClick={() => {
                      if (newFallacyName.trim()) {
                        onAddFallacy({ name: newFallacyName.trim() })
                        setNewFallacyName("")
                      }
                    }}
                    disabled={!newFallacyName.trim()}
                  >
                    <BsPlusCircleFill />
                  </Button>
                </InputGroup>
              </div>
            </div>
          )}

          {/* ── CRITERIA TAB ── */}
          {activeTab === "criteria" && (
            <div className="tab-content-area">
              {bonuses.length > 0 && (
                <div className="criteria-group">
                  <div className="group-label bonus-label">+ {t("bonuses")}</div>
                  {bonuses.map(c => (
                    <div key={c.id} className="criterion-item">
                      {editingId === c.id ? (
                        <div className="criterion-edit">
                          <Form.Control size="sm" value={editName} onChange={(e) => setEditName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && saveEdit(c)} />
                          <Form.Control size="sm" type="number" min="1" value={editPoints} onChange={(e) => setEditPoints(e.target.value)} style={{ width: "60px" }} />
                          <Button size="sm" variant="link" className="edit-action" onClick={() => saveEdit(c)}><BsCheckLg /></Button>
                          <Button size="sm" variant="link" className="edit-action" onClick={() => setEditingId(null)}><BsXLg /></Button>
                        </div>
                      ) : (
                        <>
                          <button className="criterion-apply bonus" onClick={() => onApplyCriterion(c)} disabled={!activeParticipant}>
                            <span className="criterion-name">{c.name}</span>
                            <span className="criterion-points">+{c.points}</span>
                          </button>
                          <div className="criterion-actions">
                            <button className="action-btn" onClick={() => startEdit(c)}><BsPencilFill /></button>
                            <button className="action-btn danger" onClick={() => onRemoveCriterion(c.id)}><BsFillTrashFill /></button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {penalties.length > 0 && (
                <div className="criteria-group">
                  <div className="group-label penalty-label">− {t("penaltiesLabel")}</div>
                  {penalties.map(c => (
                    <div key={c.id} className="criterion-item">
                      {editingId === c.id ? (
                        <div className="criterion-edit">
                          <Form.Control size="sm" value={editName} onChange={(e) => setEditName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && saveEdit(c)} />
                          <Form.Control size="sm" type="number" min="1" value={editPoints} onChange={(e) => setEditPoints(e.target.value)} style={{ width: "60px" }} />
                          <Button size="sm" variant="link" className="edit-action" onClick={() => saveEdit(c)}><BsCheckLg /></Button>
                          <Button size="sm" variant="link" className="edit-action" onClick={() => setEditingId(null)}><BsXLg /></Button>
                        </div>
                      ) : (
                        <>
                          <button className="criterion-apply penalty" onClick={() => onApplyCriterion(c)} disabled={!activeParticipant}>
                            <span className="criterion-name">{c.name}</span>
                            <span className="criterion-points">{c.points}</span>
                          </button>
                          <div className="criterion-actions">
                            <button className="action-btn" onClick={() => startEdit(c)}><BsPencilFill /></button>
                            <button className="action-btn danger" onClick={() => onRemoveCriterion(c.id)}><BsFillTrashFill /></button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="add-criterion-form">
                <div className="form-header">{t("addNewCriterion")}</div>
                <InputGroup size="sm" className="mb-2">
                  <Form.Control
                    placeholder={t("criterionName")}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                  />
                </InputGroup>
                <div className="d-flex gap-2 align-items-center mb-2">
                  <Form.Control type="number" size="sm" min="1" value={newPoints} onChange={(e) => setNewPoints(e.target.value)} style={{ width: "70px" }} />
                  <Form.Check type="switch" id="penalty-switch" label={isPenalty ? t("penalty") : t("bonus")} checked={isPenalty} onChange={(e) => setIsPenalty(e.target.checked)} className="penalty-switch" />
                </div>
                <Button variant={isPenalty ? "outline-danger" : "outline-success"} size="sm" className="w-100" onClick={handleAdd} disabled={!newName.trim()}>
                  <BsPlusCircleFill className="me-1" /> {t("addCriterion")}
                </Button>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}
