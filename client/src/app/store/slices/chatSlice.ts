import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { ChatType } from '../../types'
import messagesMock from '../../mocks/messagesMock'

const initialState: ChatType = {
  history: messagesMock,
}

const dataSlice = createSlice({
  name: 'chat',
  initialState: { Data: initialState },
  reducers: {
    setNewMessage(state, { payload }) {
      state.Data.history?.push(payload)
    },
  },
})

export const historyData = () => useSelector((state: RootState) => state.chatInfo.Data.history)

export const { setNewMessage: setChatDataAction } = dataSlice.actions

export default dataSlice.reducer
