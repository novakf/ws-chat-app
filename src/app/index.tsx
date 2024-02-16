import React from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Chat from './components/Chat'
import MessageInput from './components/MessageInput'
import { useDispatch } from 'react-redux'
import { setUserDataAction } from './store/slices/userSlice'

const App: React.FC = () => {
  const dispatch = useDispatch()

  dispatch(setUserDataAction({ name: 'Бэтмен' }))

  return (
    <div>
      <Container>
        <Header />
        <Chat />
        <MessageInput />
      </Container>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  height: 800px;
  margin: 50px auto 0 auto;
  border: 1px solid #cdcdcd;
  border-radius: 15px;
`

export default App
