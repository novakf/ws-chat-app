import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const initialState = {
  open: window.innerWidth > 400 ? true : false,
}

const dataSlice = createSlice({
  name: 'chat',
  initialState: { Data: initialState },
  reducers: {
    setOpen(state, { payload }) {
      state.Data.open = payload
    },
  },
})

export const sideBarOpen = () => useSelector((state: RootState) => state.sidebarInfo.Data.open)

export const { setOpen: setSideBarOpenAction } = dataSlice.actions

export default dataSlice.reducer
