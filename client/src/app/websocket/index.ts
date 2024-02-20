import { setChatDataAction, setOnlineCountAction } from '../store/slices/chatSlice'
import { Dispatch } from '@reduxjs/toolkit'

export const WSConnect = (dispatch: Dispatch, socket?: WebSocket) => {
  if (!socket) return

  socket.onopen = () => {
    console.log('[open] Соединение установлено')
  }

  socket.onmessage = async (event) => {
    if (Number(event.data)) {
      dispatch(setOnlineCountAction(event.data))
      return
    }
    let message = JSON.parse(await event.data.text())
    message.date = new Date(message.date)
    message && dispatch(setChatDataAction(message))
  }

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`)
    } else {
      console.log('[close] Соединение прервано')
    }
  }

  socket.onerror = (error) => {
    console.log(error)
  }
}
