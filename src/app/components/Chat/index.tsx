import React from 'react'
import { styled } from 'styled-components'
import messagesMock from '../../mocks/messagesMock'
import Message from '../Message'

export const userName = 'Бэтмен'

const Chat: React.FC = () => {
  return (
    <Container>
      {messagesMock
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map((message) => {
          return <Message key={message.date.toString()} message={message} />
        })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding: 10px 15px;
  gap: 7px;
`

export default Chat
