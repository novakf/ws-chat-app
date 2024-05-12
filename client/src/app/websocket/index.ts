import { loadMessageAction, setChatDataAction, setOnlineCountAction } from '../store/slices/chatSlice'
import { Dispatch } from '@reduxjs/toolkit'
import { MessageType } from '../types'

export const WS_HOST = 'ws://localhost:3001'

export const WSConnect = (dispatch: Dispatch, history: MessageType[], socket?: WebSocket) => {
  if (!socket) return

  socket.onopen = () => {
    console.log('[open] Соединение установлено')
  }

  socket.onmessage = (event) => {
    if (Number(event.data)) {
      dispatch(setOnlineCountAction(event.data))
      return
    }

    const { message, sendError, receiveError, loading } = JSON.parse(
      event.data instanceof Blob ? event.data.text() : event.data
    )

    message.date = new Date(message.date)

    const index = history.findIndex(
      (el) => el.sender === message.sender && el.date.toString() === message.date.toString() && el.loading
    )

    if (index > -1) {
      dispatch(loadMessageAction({ index, receiveError, sendError }))
      return
    }

    if (sendError) {
      message && dispatch(setChatDataAction({ ...message, error: true }))
      return
    }

    if (receiveError) {
      message && dispatch(setChatDataAction({ ...message, content: '', error: true }))
      return
    }

    message && dispatch(setChatDataAction({ ...message, loading }))
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
