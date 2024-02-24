import React from 'react'
import { MessageType } from '../../types'
import { userData } from '../../store/slices/userSlice'
import Styled from './styles'

type Props = {
  message: MessageType
  next?: MessageType
  prev?: MessageType
}

const Message: React.FC<Props> = ({ message, next, prev }) => {
  const userName = userData().name

  let timeArr = message.date.toLocaleTimeString('ru-RU').split(':')
  timeArr.pop()
  let time = timeArr.join(':')

  return (
    <Styled.Container
      $owner={message.sender === userName}
      $repeatNext={message.sender === next?.sender}
      $repeatPrev={message.sender === prev?.sender}
      $error={message.error}
    >
      {message.sender !== userName && message.sender !== prev?.sender && <Styled.Name>{message.sender}</Styled.Name>}
      <Styled.Content>{message.content}</Styled.Content>
      <Styled.SendDate>{time}</Styled.SendDate>
      {message.sender !== next?.sender && <Styled.CornerIcon $owner={message.sender === userName} />}
    </Styled.Container>
  )
}

export default Message
