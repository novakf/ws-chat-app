import React, { useState } from 'react'
import GenericModal from '../Modal'
import { styled } from 'styled-components'
import { setUserDataAction } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'

type Props = {
  open: boolean
  onClose: () => void
}

const LoginForm: React.FC<Props> = ({ open, onClose }) => {
  const handleClose = () => {
    onClose?.()
  }

  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const handleEnter = (event: React.KeyboardEvent) => {
    let value = (event.target as HTMLInputElement).value
    if (event.key === 'Enter' && value) {
      dispatch(setUserDataAction({ name: value }))
      setValue('')
    }
  }

  return (
    <GenericModal open={open} onClose={handleClose}>
      <Content>
        <Title>WS Мессенджер</Title>

        <StyledInput
          placeholder="Введите имя"
          value={value}
          onKeyDown={handleEnter}
          onChange={(e) => setValue(e.target.value)}
          $error={false}
        />
      </Content>
    </GenericModal>
  )
}

const StyledInput = styled.input<{ $error?: boolean }>`
  border: none;
  padding: 0px;
  outline: none;
  border-bottom: 2px solid #dddddd;
  padding: 6px 10px;
  font-size: 20px;
  transition: all 0.2s;

  height: 30px;

  &:focus {
    border-bottom: 2px solid #8700db;
  }

  ${(p) => p.$error && `border-bottom: 2px solid #ff000082;`}
`

const Title = styled.div`
  font-size: 28px;
  background: linear-gradient(135deg, #1f6ed1 20%, #fa0ee6 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  padding: 0.3em 0.6em;
  border: 3px solid transparent;
  border-image: linear-gradient(135deg, #1f6ed1 20%, #bd72c5 70%);
  border-image-slice: 1;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

export default LoginForm
