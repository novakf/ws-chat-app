import { WebSocketServer } from 'ws'

const wsServer = new WebSocketServer({ port: 9000 })

const clients = new Set()

const onConnect = (wsClient) => {
  clients.add(wsClient)
  console.log('Новый пользователь. Онлайн:', clients.size)

  wsClient.on('message', (message) => {
    try {
      clients.forEach((client) => client.send(message))
    } catch (error) {
      console.log('Ошибка при получении сообщения', error)
    }
  })

  wsClient.on('close', () => {
    clients.delete(wsClient)
    console.log('Пользователь вышел из чата. Онлайн:', clients.size)
  })
}

wsServer.on('connection', onConnect)

console.log('Сервер запущен на 9000 порту')
