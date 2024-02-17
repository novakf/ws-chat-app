import React from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Chat from './components/Chat'
import MessageInput from './components/MessageInput'
import { userData } from './store/slices/userSlice'
import LoginForm from './components/Login'

const App: React.FC = () => {
  const user = userData().name

  return (
    <div>
      <Container>
        <Header />
        <Chat />
        <MessageInput />
        <LoginForm open={user === ''} onClose={() => {}} />
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
