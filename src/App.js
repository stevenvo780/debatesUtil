import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import GlobalSessionCard from "./components/GlobalSessionCard"
import ControlPanel from "./components/ControlPanel"
import ParticipantsSection from "./components/ParticipantsSection"
import ParticipantForm from "./components/ParticipantForm"
import StatsModal from "./components/StatsModal"
import EditModal from "./components/EditModal"
import "./App.css"

export default function App() {
  const [data, setData] = useState({
    round: 1,
    participants: [],
    activeParticipantId: null,
    sessionStart: null,
    globalSessionTitle: "",
    globalSessionStart: Date.now(),
    globalSessionPaused: false,
    globalSessionPausedAt: null
  })

  const [globalTimeInput, setGlobalTimeInput] = useState(5)
  const [participantName, setParticipantName] = useState("")
  const [initialTime, setInitialTime] = useState(5)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [statsContent, setStatsContent] = useState("")
  const [showEditModal, setShowEditModal] = useState(false)
  const [editParticipantId, setEditParticipantId] = useState(null)
  const [editParticipantName, setEditParticipantName] = useState("")
  const [editParticipantTime, setEditParticipantTime] = useState(1)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => tick(), 1000)
    return () => clearInterval(interval)
  })

  function canUseLocalStorage() {
    try {
      localStorage.setItem("test", "test")
      localStorage.removeItem("test")
      return true
    } catch {
      return false
    }
  }

  function loadData() {
    if (!canUseLocalStorage()) return
    const stored = localStorage.getItem("debateData")
    if (stored) {
      const parsed = JSON.parse(stored)
      setData(parsed)
    }
  }

  function saveData(updatedData) {
    if (!canUseLocalStorage()) return
    localStorage.setItem("debateData", JSON.stringify(updatedData))
  }

  function handleDataChange(newData) {
    setData(newData)
    saveData(newData)
  }

  function resetStorage() {
    if (!window.confirm("Reset all data?")) return
    const newData = {
      round: 1,
      participants: [],
      activeParticipantId: null,
      sessionStart: null,
      globalSessionTitle: "",
      globalSessionStart: Date.now(),
      globalSessionPaused: false,
      globalSessionPausedAt: null
    }
    handleDataChange(newData)
    window.location.reload()
  }

  function addParticipant() {
    if (!participantName.trim() || initialTime < 1) return
    const newParticipant = {
      id: Date.now(),
      name: participantName.trim(),
      initialTime: parseInt(initialTime),
      totalUsed: 0,
      roundTimes: {},
      timeLeft: parseInt(initialTime) * 60,
      penalties: 0
    }
    const newData = {
      ...data,
      participants: [...data.participants, newParticipant]
    }
    handleDataChange(newData)
    setParticipantName("")
  }

  function removeParticipant(id, e) {
    e.stopPropagation()
    const filtered = data.participants.filter((p) => p.id !== id)
    let newActive = data.activeParticipantId
    let newSession = data.sessionStart
    if (data.activeParticipantId === id) {
      newActive = null
      newSession = null
    }
    const newData = {
      ...data,
      participants: filtered,
      activeParticipantId: newActive,
      sessionStart: newSession
    }
    handleDataChange(newData)
  }

  function updateRoundValue(value) {
    const newData = { ...data, round: parseInt(value) }
    handleDataChange(newData)
  }

  function newRound() {
    const newRoundValue = data.round + 1
    const timeInSeconds = Math.floor(globalTimeInput * 60)
    const updatedParticipants = data.participants.map((p) => ({
      ...p,
      initialTime: globalTimeInput,
      timeLeft: timeInSeconds
    }))
    const newData = {
      ...data,
      round: newRoundValue,
      participants: updatedParticipants
    }
    handleDataChange(newData)
  }

  function toggleTimer(id) {
    if (data.activeParticipantId === id) {
      const newData = { ...data, activeParticipantId: null, sessionStart: null }
      handleDataChange(newData)
    } else {
      const newData = { ...data, activeParticipantId: id, sessionStart: Date.now() }
      handleDataChange(newData)
    }
  }

  function resetTime(id, e) {
    e.stopPropagation()
    const newData = { ...data }
    const p = newData.participants.find((x) => x.id === id)
    if (!p) return
    p.timeLeft = p.initialTime * 60
    handleDataChange(newData)
  }

  function addPenalty(id, e) {
    e.stopPropagation()
    const newData = { ...data }
    const p = newData.participants.find((x) => x.id === id)
    if (!p) return
    p.penalties++
    handleDataChange(newData)
  }

  function editParticipant(id, e) {
    e.stopPropagation()
    const p = data.participants.find((x) => x.id === id)
    if (!p) return
    setEditParticipantId(p.id)
    setEditParticipantName(p.name)
    setEditParticipantTime(p.initialTime)
    setShowEditModal(true)
  }

  function saveParticipantChanges() {
    const newData = { ...data }
    const p = newData.participants.find((x) => x.id === editParticipantId)
    if (!p || !editParticipantName.trim() || editParticipantTime < 1) return
    p.name = editParticipantName.trim()
    p.initialTime = parseInt(editParticipantTime)
    p.timeLeft = parseInt(editParticipantTime) * 60
    handleDataChange(newData)
    setShowEditModal(false)
  }

  function tick() {
    const newData = { ...data }
    const active = newData.participants.find((p) => p.id === newData.activeParticipantId)
    if (active) {
      if (active.timeLeft > 0) {
        active.timeLeft--
        active.totalUsed++
        if (!active.roundTimes[newData.round]) {
          active.roundTimes[newData.round] = 0
        }
        active.roundTimes[newData.round]++
      }
    }
    handleDataChange(newData)
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return m + ":" + (s < 10 ? "0" + s : s)
  }

  function changeAllTime() {
    if (globalTimeInput < 0) return
    const newData = { ...data }
    const timeInSeconds = Math.floor(globalTimeInput * 60)
    newData.participants.forEach((p) => {
      p.initialTime = globalTimeInput
      p.timeLeft = timeInSeconds
    })
    handleDataChange(newData)
  }

  function showStats() {
    let stats = ""
    data.participants.forEach((p) => {
      stats +=
        "<p><strong>" +
        p.name +
        "</strong> - Total Used: " +
        formatTime(p.totalUsed) +
        ", Penalties: " +
        p.penalties +
        "</p>"
    })
    setStatsContent(stats)
    setShowStatsModal(true)
  }

  function toggleGlobalSession() {
    if (!data.globalSessionPaused) {
      const newData = {
        ...data,
        globalSessionPaused: true,
        globalSessionPausedAt: Date.now()
      }
      handleDataChange(newData)
    } else {
      const pausedDuration = Date.now() - data.globalSessionPausedAt
      const newData = {
        ...data,
        globalSessionPaused: false,
        globalSessionStart: data.globalSessionStart + pausedDuration
      }
      handleDataChange(newData)
    }
  }

  function getGlobalSessionClock() {
    if (data.globalSessionPaused) {
      const elapsed = Math.floor((data.globalSessionPausedAt - data.globalSessionStart) / 1000)
      return formatTime(elapsed < 0 ? 0 : elapsed)
    } else {
      const elapsed = Math.floor((Date.now() - data.globalSessionStart) / 1000)
      return formatTime(elapsed < 0 ? 0 : elapsed)
    }
  }

  const activeParticipant = data.participants.find((p) => p.id === data.activeParticipantId)
  const activeTimeLeft = activeParticipant ? formatTime(activeParticipant.timeLeft) : "00:00"
  const activeTimer = data.activeParticipantId && data.sessionStart
    ? formatTime(Math.floor((Date.now() - data.sessionStart) / 1000))
    : "00:00"

  return (
    <>
      <Container className="py-4">
        <GlobalSessionCard
          globalSessionTitle={data.globalSessionTitle}
          getGlobalSessionClock={getGlobalSessionClock}
          toggleGlobalSession={toggleGlobalSession}
          onTitleChange={(val) => handleDataChange({ ...data, globalSessionTitle: val })}
          activeTimer={activeTimer}
          activeParticipant={activeParticipant}
          activeTimeLeft={activeTimeLeft}
        />
        <ControlPanel
          round={data.round}
          updateRoundValue={updateRoundValue}
          newRound={newRound}
          resetStorage={resetStorage}
          showStats={showStats}
          globalTimeInput={globalTimeInput}
          setGlobalTimeInput={setGlobalTimeInput}
          changeAllTime={changeAllTime}
        />
        <ParticipantsSection
          participants={data.participants}
          round={data.round}
          activeParticipantId={data.activeParticipantId}
          toggleTimer={toggleTimer}
          editParticipant={editParticipant}
          addPenalty={addPenalty}
          resetTime={resetTime}
          removeParticipant={removeParticipant}
          formatTime={formatTime}
        />
        <ParticipantForm
          participantName={participantName}
          setParticipantName={setParticipantName}
          initialTime={initialTime}
          setInitialTime={setInitialTime}
          addParticipant={addParticipant}
        />
      </Container>
      <StatsModal
        show={showStatsModal}
        onHide={() => setShowStatsModal(false)}
        statsContent={statsContent}
      />
      <EditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        editParticipantId={editParticipantId}
        editParticipantName={editParticipantName}
        editParticipantTime={editParticipantTime}
        setEditParticipantName={setEditParticipantName}
        setEditParticipantTime={setEditParticipantTime}
        saveParticipantChanges={saveParticipantChanges}
      />
    </>
  )
}
