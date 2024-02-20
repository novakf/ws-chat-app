import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Chat from './components/Chat'
import MessageInput from './components/MessageInput'
import { userData } from './store/slices/userSlice'
import LoginForm from './components/Login'
import { WSConnect } from './websocket'
import { useDispatch } from 'react-redux'

const App: React.FC = () => {
  const user = userData().name
  const dispatch = useDispatch()

  const [socket, setSocket] = useState<WebSocket | undefined>()

  useEffect(() => {
    user && setSocket(new WebSocket('ws://localhost:9000'))
  }, [user])

  WSConnect(dispatch, socket)

  return (
    <div>
      <Container>
        <Header socket={socket} />
        <Chat />
        <MessageInput socket={socket} />
        <LoginForm open={user === ''} />
      </Container>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: 1100px;
  height: 800px;
  margin: 50px auto 0 auto;
  border: 1px solid #cdcdcd;
  border-radius: 15px;
  overflow: hidden;
`

export default App
