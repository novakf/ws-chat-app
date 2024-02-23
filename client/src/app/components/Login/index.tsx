import React, { useState } from 'react'
import GenericModal from '../Modal'
import { setUserDataAction } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import Styled from './styles'

type Props = {
  open: boolean
}

const LoginForm: React.FC<Props> = ({ open }) => {
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
    <GenericModal open={open} onClose={() => {}}>
      <Styled.Content>
        <Styled.Title>WS Мессенджер</Styled.Title>

        <Styled.Input
          placeholder="Введите имя"
          value={value}
          onKeyDown={handleEnter}
          onChange={(e) => setValue(e.target.value)}
          $error={false}
          autoFocus
        />
      </Styled.Content>
    </GenericModal>
  )
}

export default LoginForm
