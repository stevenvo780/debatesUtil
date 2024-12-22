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
  language: 'es', // default language
  speakOrder: [], // Array para guardar orden de intervenciones
  lastInteractionTime: Date.now(), // Para validación de tiempos
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
        state.speakOrder.push({
          participantId: action.payload,
          timestamp: Date.now(),
          round: state.round
        })
      }
      state.lastInteractionTime = Date.now()
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
    },
    resetGame: (state) => {
      const savedTimeInput = state.globalTimeInput;
      const savedInitialTime = state.initialTime;
      const savedParticipants = state.participants.map(p => ({
        ...p,
        timeLeft: p.initialTime * 60,
        totalUsed: 0,
        roundTimes: {},
        penalties: 0
      }));
      const savedTitle = state.globalSessionTitle;
      
      return {
        ...initialState,
        globalTimeInput: savedTimeInput,
        initialTime: savedInitialTime,
        globalSessionStart: Date.now(),
        globalSessionTitle: savedTitle,
        participants: savedParticipants
      };
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
  resetStore,
  resetGame
} = debateSlice.actions

export default debateSlice.reducer