import React, { useState } from 'react'
import { styled } from 'styled-components'
import PaperPlaneIcon from '../../icons/PaperPlaneIcon'
import { userData } from '../../store/slices/userSlice'

type Props = {
  socket?: WebSocket
}

const MessageInput: React.FC<Props> = ({ socket }) => {
  const [value, setValue] = useState('')
  const userName = userData().name

  const submit = () => {
    value && socket?.send(JSON.stringify({ sender: userName, content: value, date: new Date() }))
    setValue('')
  }

  const handleEnter = (event: React.KeyboardEvent) => {
    let value = (event.target as HTMLInputElement).value
    if (event.key === 'Enter' && value) {
      socket?.send(JSON.stringify({ sender: userName, content: value, date: new Date() }))
      setValue('')
    }
  }

  return (
    <Container>
      <StyledInput
        value={value}
        onKeyDown={handleEnter}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Напишите сообщение..."
        autoFocus
      />
      <SPaperPlaneIcon onClick={submit} $disable={!value} />
    </Container>
  )
}

const SPaperPlaneIcon = styled(PaperPlaneIcon)<{ $disable?: boolean }>`
  margin-left: auto;
  height: 40px;
  width: 40px;
  transition: all 0.3s;
  fill: #0764b3;

  ${(props) =>
    props.$disable
      ? `
      fill: #a3a3a3 !important;
    `
      : `
      &:hover {
        fill: #0d0c77;
      }
      cursor: pointer;
  `}
`

const StyledInput = styled.input`
  border: none;
  padding: 0px;
  outline: none;
  padding: 6px 10px;
  font-size: 22px;
  transition: all 0.2s;
  width: 100%;

  height: 30px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 10px 30px;
  border-top: 1px solid #cdcdcd;
  border-left: 1px solid #cdcdcd;
`

export default MessageInput
