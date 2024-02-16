import React from 'react'
import { MessageType } from '../../types'
import { styled } from 'styled-components'
import { userName } from '../Chat'

type Props = {
  message: MessageType
}

const Message: React.FC<Props> = ({ message }) => {
  let timeArr = message.date.toLocaleTimeString('ru-RU').split(':')
  timeArr.pop()
  let time = timeArr.join(':')

  return (
    <Container $owner={message.sender === userName}>
      {message.sender !== userName && <Name>{message.sender}</Name>}
      <Content>{message.content}</Content>
      <SendDate>{time}</SendDate>
    </Container>
  )
}

const SendDate = styled.div`
  font-size: 12px;
  margin-left: auto;
`

const Content = styled.div``

const Name = styled.div`
  font-size: 12px;
`

const Container = styled.div<{ $owner?: boolean }>`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-radius: 10px;
  width: fit-content;
  padding: 5px 10px;

  ${(props) =>
    props.$owner &&
    `
    margin-left: auto;
  `}
`

export default Message
