export const WSconnect = (setMessage: any) => {
  let socket = new WebSocket('ws://localhost:9000')

  socket.onopen = () => {
    console.log('[open] Соединение установлено')
    socket.send(JSON.stringify({ message: 'Привет' }))
  }

  socket.onmessage = (event) => {
    setMessage(event.data)
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
