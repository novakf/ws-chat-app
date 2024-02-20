import { WebSocketServer } from 'ws'
import http from 'http'
import express from 'express'
import axios from 'axios'

const WS_PORT = 9000
const TRANSPORT_LAYER = 'http://localhost:3001/sendMessage'

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

wsServer.on('connection', (wsClient) => {
  wsServer.clients.add(wsClient)
  //  console.log(`Новый пользователь. Онлайн: ${wsServer.clients.size}`)

  wsServer.clients.forEach((client) => client.send(wsServer.clients.size))

  wsClient.on('message', (message) => {
    //    wsServer.clients.forEach((client) =>
    //      client.send(JSON.stringify({ message: { ...JSON.parse(message) }, receiveError: false }))
    //    )

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
      senderClient.send(JSON.stringify({ message, loading: true }))
    })
    .catch(() => {
      senderClient.send(JSON.stringify({ message, sendError: true }))
    })
}

// получение с транспортного уровня
app.post('/app/receiveMessage', (req, res) => {
  wsServer.clients.forEach((client) => client.send(JSON.stringify(req.body))) // body {message: {}, receiveError: bool}
})

server.listen(WS_PORT, () => console.log('Server started'))
