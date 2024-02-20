import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { ChatType } from '../../types'

const initialState: ChatType = {
  history: [],
  online: 0,
}

const dataSlice = createSlice({
  name: 'chat',
  initialState: { Data: initialState },
  reducers: {
    setNewMessage(state, { payload }) {
      state.Data.history?.push(payload)
    },
    setOnlineCount(state, { payload }) {
      state.Data.online = payload
    },
    clearChatHistory(state) {
      state.Data.history = []
    },
  },
})

export const historyData = () => useSelector((state: RootState) => state.chatInfo.Data.history)
export const onlineCount = () => useSelector((state: RootState) => state.chatInfo.Data.online)

export const {
  setNewMessage: setChatDataAction,
  setOnlineCount: setOnlineCountAction,
  clearChatHistory: clearChatHistoryAction,
} = dataSlice.actions

export default dataSlice.reducer
