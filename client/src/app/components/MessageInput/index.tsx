import React, { useState } from 'react'
import { userData } from '../../store/slices/userSlice'
import Styled from './styles'

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
    <Styled.Container>
      <Styled.Input
        value={value}
        onKeyDown={handleEnter}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Напишите сообщение..."
        autoFocus
      />
      <Styled.PaperPlaneIcon onClick={submit} $disable={!value} />
    </Styled.Container>
  )
}

export default MessageInput
