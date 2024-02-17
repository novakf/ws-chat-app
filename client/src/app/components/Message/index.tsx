import React from 'react'
import { MessageType } from '../../types'
import { styled } from 'styled-components'
import { userData } from '../../store/slices/userSlice'
import CornerIcon from '../../icons/CornerIcon'

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
    <Container
      $owner={message.sender === userName}
      $repeatNext={message.sender === next?.sender}
      $repeatPrev={message.sender === prev?.sender}
    >
      {message.sender !== userName && message.sender !== prev?.sender && <Name>{message.sender}</Name>}
      <Content>{message.content}</Content>
      <SendDate>{time}</SendDate>
      {message.sender !== next?.sender && <StyledCornerIcon $owner={message.sender === userName} />}
    </Container>
  )
}

const StyledCornerIcon = styled(CornerIcon)<{ $owner?: boolean }>`
  position: absolute;
  top: calc(100% - 1.03rem);
  left: -9px;
  width: 10px;
  height: 20px;
  font-size: 14px;

  ${(props) =>
    props.$owner &&
    `
    transform: scale(-1, 1);
    left: auto;
    right: -10px;
  `}
`

const SendDate = styled.div`
  font-size: 12px;
  margin-left: auto;
  color: #9f9f9f;
`

const Content = styled.div`
  font-size: 14px;
`

const Name = styled.div`
  font-size: 12px;
  color: #4b4b4b;
`

const Container = styled.div<{ $owner?: boolean; $repeatNext?: boolean; $repeatPrev?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #fff;
  border-radius: 17px;
  border-bottom-left-radius: 0;
  width: fit-content;
  padding: 5px 10px;
  background: #fff;

  ${(props) =>
    props.$owner &&
    `
    margin-left: auto;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 17px;
  `}

  ${(props) =>
    props.$repeatNext && props.$owner
      ? `
    border-bottom-right-radius: 7px;
    margin-bottom: -7px;
  `
      : props.$repeatNext &&
        `
    border-bottom-left-radius: 7px;
    margin-bottom: -7px;
  `}

  ${(props) =>
    props.$repeatPrev && props.$owner
      ? `
    border-top-right-radius: 7px;
  `
      : props.$repeatPrev &&
        `
    border-top-left-radius: 7px;
  `}
`

export default Message
