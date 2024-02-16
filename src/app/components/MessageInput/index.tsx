import React, { useState } from 'react'
import { styled } from 'styled-components'
import PaperPlaneIcon from '../../icons/PaperPlaneIcon'

const MessageInput: React.FC = () => {
  const [value, setValue] = useState('')

  return (
    <Container>
      <StyledInput value={value} onChange={(e) => setValue(e.target.value)} placeholder="Напишите сообщение..." />
      <SPaperPlaneIcon />
    </Container>
  )
}

const SPaperPlaneIcon = styled(PaperPlaneIcon)`
  margin-left: auto;
  fill: #a3a3a3;
  height: 40px;
  width: 40px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    fill: #0d0c77;
  }
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
`

export default MessageInput
