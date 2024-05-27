import { WebSocketServer } from 'ws'
import http from 'http'
import express, { json } from 'express'
import axios from 'axios'

const WS_PORT = 9000
const TRANSPORT_LAYER = 'http://localhost:8083/send'

const app = express()
app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers')
  next()
})

const server = http.createServer(app)
const wsServer = new WebSocketServer({ server })

const clients = {}

wsServer.on('connection', (wsClient) => {
  wsServer.clients.add(wsClient)
  //  console.log(`Новый пользователь. Онлайн: ${wsServer.clients.size}`)

  wsServer.clients.forEach((client) => client.send(wsServer.clients.size))

  wsClient.on('message', (message) => {
    //    wsServer.clients.forEach((client) =>
    //      client.send(JSON.stringify({ message: { ...JSON.parse(message) }, receiveError: false }))
    //    )

    clients[JSON.parse(message).sender] = wsClient
    sendMessage(wsClient, JSON.parse(message))
  })

  wsClient.on('close', () => {
    wsServer.clients.delete(wsClient)
    wsServer.clients.forEach((client) => client.send(wsServer.clients.size))
    //  console.log(`Пользователь вышел из чата. Онлайн: ${wsServer.clients.size}`)
  })
})

// отправка на транспортный уровень
const sendMessage = (senderClient, message) => {
  axios
    .post(TRANSPORT_LAYER, message)
    .then(() => {
      console.log('Сообщение ушло на траспортный')
      // senderClient.send(JSON.stringify({ ...message, loading: true }))
    })
    .catch((err) => {
      console.log(err)
      senderClient.send(JSON.stringify({ message, sendError: true }))
      console.log('Транспортный уровень не найден')
    })
}

// получение с транспортного уровня
app.post('/receive', (req, res) => {
  const message = JSON.stringify(req.body)
  wsServer.clients.forEach((client) => clients[req.body.sender] !== client && client.send(message)) // body {message: {}, receiveError: bool}
})

server.listen(WS_PORT, () => console.log('Server started'))
