import { WebSocketServer } from 'ws'

const wsServer = new WebSocketServer({ port: 9000 })

const onConnect = (wsClient) => {
  console.log('Новый пользователь')

  wsClient.send('Привет')

  wsClient.on('message', (message) => {
    try {
      const jsonMessage = JSON.parse(message)

      console.log(jsonMessage)
    } catch (error) {
      console.log('Ошибка', error)
    }
  })

  wsClient.on('close', () => {
    console.log('Пользователь отключился')
  })
}

wsServer.on('connection', onConnect)

console.log('Сервер запущен на 9000 порту')
