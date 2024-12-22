import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  round: 1,
  participants: [],
  activeParticipantId: null,
  sessionStart: null,
  globalSessionTitle: "",
  globalSessionStart: Date.now(),
  globalSessionPaused: false,
  globalSessionPausedAt: null,
  globalTimeInput: 5,
  initialTime: 5,
  language: 'es' // default language
}

export const debateSlice = createSlice({
  name: 'debate',
  initialState,
  reducers: {
    setParticipants: (state, action) => {
      state.participants = action.payload
    },
    addParticipant: (state, action) => {
      state.participants.push(action.payload)
    },
    removeParticipant: (state, action) => {
      state.participants = state.participants.filter(p => p.id !== action.payload)
      if (state.activeParticipantId === action.payload) {
        state.activeParticipantId = null
        state.sessionStart = null
      }
    },
    updateRound: (state, action) => {
      state.round = action.payload
    },
    setGlobalTimeInput: (state, action) => {
      state.globalTimeInput = action.payload
    },
    setInitialTime: (state, action) => {
      state.initialTime = action.payload
    },
    toggleTimer: (state, action) => {
      if (state.activeParticipantId === action.payload) {
        state.activeParticipantId = null
        state.sessionStart = null
      } else {
        state.activeParticipantId = action.payload
        state.sessionStart = Date.now()
      }
    },
    updateParticipant: (state, action) => {
      const index = state.participants.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.participants[index] = action.payload
      }
    },
    setGlobalSession: (state, action) => {
      state.globalSessionPaused = action.payload.paused
      state.globalSessionPausedAt = action.payload.pausedAt
      state.globalSessionStart = action.payload.start
    },
    setGlobalTitle: (state, action) => {
      state.globalSessionTitle = action.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    resetStore: (state) => {
      const savedTimeInput = state.globalTimeInput
      const savedInitialTime = state.initialTime
      return {
        ...initialState,
        globalTimeInput: savedTimeInput,
        initialTime: savedInitialTime,
        globalSessionStart: Date.now()
      }
    }
  }
})

export const {
  setParticipants,
  addParticipant,
  removeParticipant,
  updateRound,
  setGlobalTimeInput,
  setInitialTime,
  toggleTimer,
  updateParticipant,
  setGlobalSession,
  setGlobalTitle,
  setLanguage,
  resetStore
} = debateSlice.actions

export default debateSlice.reducer