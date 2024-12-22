import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import GlobalSessionCard from "./components/GlobalSessionCard"
import ControlPanel from "./components/ControlPanel"
import ParticipantsSection from "./components/ParticipantsSection"
import ParticipantForm, { generateShortId } from "./components/ParticipantForm"
import StatsModal from "./components/StatsModal"
import EditModal from "./components/EditModal"
import {
  addParticipant,
  removeParticipant,
  updateRound,
  setGlobalTimeInput,
  setInitialTime,
  toggleTimer,
  updateParticipant,
  setGlobalSession,
  setGlobalTitle,
  resetStore
} from "./store/debateSlice"
import "./App.css"

export default function App() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [participantName, setParticipantName] = useState("")
  const [editParticipantId, setEditParticipantId] = useState(null)
  const [editParticipantName, setEditParticipantName] = useState("")
  const [editParticipantTime, setEditParticipantTime] = useState(1)
  const [statsContent, setStatsContent] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      if (!data.globalSessionPaused) {
        const now = Date.now()
        if (now !== data.globalSessionStart) {
          dispatch(setGlobalSession({
            paused: false,
            pausedAt: null,
            start: data.globalSessionStart
          }))
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [data.globalSessionPaused, data.globalSessionStart])

  useEffect(() => {
    const interval = setInterval(() => {
      const active = data.participants.find(p => p.id === data.activeParticipantId)
      if (active && active.timeLeft > 0) {
        dispatch(updateParticipant({
          ...active,
          timeLeft: active.timeLeft - 1,
          totalUsed: active.totalUsed + 1,
          roundTimes: {
            ...active.roundTimes,
            [data.round]: (active.roundTimes[data.round] || 0) + 1
          }
        }))
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [data.activeParticipantId, data.participants, data.round])

  function handleAddParticipant() {
    if (!participantName.trim() || data.initialTime < 1) return
    const shortId = generateShortId()
    dispatch(addParticipant({
      id: Date.now(),
      shortId: shortId,
      name: participantName.trim(),
      initialTime: parseFloat(data.initialTime),
      totalUsed: 0,
      roundTimes: {},
      timeLeft: parseFloat(data.initialTime) * 60,
      penalties: 0
    }))
    setParticipantName("")
  }

  function handleRemoveParticipant(id, e) {
    e.stopPropagation()
    dispatch(removeParticipant(id))
  }

  function handleUpdateRound(value) {
    dispatch(updateRound(parseInt(value)))
  }

  function handleNewRound() {
    const timeInSeconds = Math.floor(data.globalTimeInput * 60)
    dispatch(updateRound(data.round + 1))
    data.participants.forEach(p => {
      dispatch(updateParticipant({
        ...p,
        initialTime: data.globalTimeInput,
        timeLeft: timeInSeconds
      }))
    })
  }

  function handleToggleTimer(id) {
    dispatch(toggleTimer(id))
  }

  function handleResetTime(id, e) {
    e.stopPropagation()
    const p = data.participants.find(x => x.id === id)
    if (!p) return
    dispatch(updateParticipant({
      ...p,
      timeLeft: p.initialTime * 60
    }))
  }

  function handleAddPenalty(id, e) {
    e.stopPropagation()
    const p = data.participants.find(x => x.id === id)
    if (!p) return
    dispatch(updateParticipant({
      ...p,
      penalties: p.penalties + 1
    }))
  }

  function handleSaveParticipantChanges() {
    const p = data.participants.find(x => x.id === editParticipantId)
    if (!p || !editParticipantName.trim() || editParticipantTime < 1) return
    dispatch(updateParticipant({
      ...p,
      name: editParticipantName.trim(),
      initialTime: parseFloat(editParticipantTime),
      timeLeft: parseFloat(editParticipantTime) * 60
    }))
    setShowEditModal(false)
  }

  function handleToggleGlobalSession() {
    if (!data.globalSessionPaused) {
      dispatch(setGlobalSession({
        paused: true,
        pausedAt: Date.now(),
        start: data.globalSessionStart
      }))
    } else {
      const pausedDuration = Date.now() - data.globalSessionPausedAt
      dispatch(setGlobalSession({
        paused: false,
        pausedAt: null,
        start: data.globalSessionStart + pausedDuration
      }))
    }
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return m + ":" + (s < 10 ? "0" + s : s)
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

  function handleEditParticipant(id, e) {
    e.stopPropagation()
    const p = data.participants.find(x => x.id === id)
    if (!p) return
    setEditParticipantId(p.id)
    setEditParticipantName(p.name)
    setEditParticipantTime(p.initialTime)
    setShowEditModal(true)
  }

  function handleChangeAllTime() {
    if (data.globalTimeInput < 0) return
    const timeInSeconds = Math.floor(data.globalTimeInput * 60)
    data.participants.forEach(p => {
      dispatch(updateParticipant({
        ...p,
        initialTime: data.globalTimeInput,
        timeLeft: timeInSeconds
      }))
    })
  }

  function showStats() {
    let content = ""
    data.participants.forEach((p) => {
      content +=
        "<p><strong>" +
        p.name +
        "</strong> - Total Used: " +
        formatTime(p.totalUsed) +
        ", Penalties: " +
        p.penalties +
        "</p>"
    })
    setStatsContent(content)
    setShowStatsModal(true)
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
          toggleGlobalSession={handleToggleGlobalSession}
          onTitleChange={(val) => dispatch(setGlobalTitle(val))}
          activeTimer={activeTimer}
          activeParticipant={activeParticipant}
          activeTimeLeft={activeTimeLeft}
        />
        <ControlPanel
          round={data.round}
          updateRoundValue={handleUpdateRound}
          newRound={handleNewRound}
          resetStorage={() => dispatch(resetStore())}
          showStats={showStats}
          globalTimeInput={data.globalTimeInput}
          setGlobalTimeInput={(val) => dispatch(setGlobalTimeInput(val))}
          changeAllTime={handleChangeAllTime}
        />
        <ParticipantsSection
          participants={data.participants}
          round={data.round}
          activeParticipantId={data.activeParticipantId}
          toggleTimer={handleToggleTimer}
          editParticipant={handleEditParticipant}
          addPenalty={handleAddPenalty}
          resetTime={handleResetTime}
          removeParticipant={handleRemoveParticipant}
          formatTime={formatTime}
        />
        <ParticipantForm
          participantName={participantName}
          setParticipantName={setParticipantName}
          initialTime={data.initialTime}
          setInitialTime={(val) => dispatch(setInitialTime(val))}
          addParticipant={handleAddParticipant}
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
        saveParticipantChanges={handleSaveParticipantChanges}
      />
    </>
  )
}
