import React from 'react'
import { styled } from 'styled-components'
import Message from '../Message'
import { historyData } from '../../store/slices/chatSlice'

const Chat: React.FC = () => {
  const history = historyData()

  return (
    <Container $empty={history?.length === 0}>
      {history && history.length > 0 ? (
        history
          .slice()
          ?.sort((a, b) => a.date.getTime() - b.date.getTime())
          .map((message) => {
            console.log(message.date.getTime())
            return <Message key={message.date.getTime()} message={message} />
          })
      ) : (
        <Empty>Сообщений нет</Empty>
      )}
    </Container>
  )
}

const Empty = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  color: #797979;
  padding: 2px 10px;
`

const Container = styled.div<{ $empty?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding: 10px 15px;
  gap: 7px;

  ${(props) =>
    props.$empty &&
    `
    margin: auto;
  `}
`

export default Chat
