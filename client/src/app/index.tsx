import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Chat from './components/Chat'
import MessageInput from './components/MessageInput'
import { userData } from './store/slices/userSlice'
import LoginForm from './components/Login'
import { WSConnect, WS_HOST } from './websocket'
import { useDispatch } from 'react-redux'
import { historyData } from './store/slices/chatSlice'
import SideBar from './components/SideBar'

const App: React.FC = () => {
  const user = userData().name
  const history = historyData()
  const dispatch = useDispatch()

  const [socket, setSocket] = useState<WebSocket | undefined>()

  useEffect(() => {
    user && setSocket(new WebSocket(WS_HOST))
  }, [user])

  WSConnect(dispatch, history, socket)

  return (
    <Wrapper>
      <SideBar />
      <ChatContainer>
        <Header socket={socket} />
        <Chat />
        <MessageInput socket={socket} />
        <LoginForm open={user === ''} />
      </ChatContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  max-width: 1100px;
  height: 800px;
  margin: 50px auto 0 auto;
  border: 1px solid #cdcdcd;
  border-radius: 15px;
  overflow: hidden;

  @media (max-width: 1100px) {
    height: 100vh;
    margin: 0;
    border: none;
  }
`

const ChatContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`

export default App
