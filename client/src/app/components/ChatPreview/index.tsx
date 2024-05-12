import React from 'react'
import { useDispatch } from 'react-redux'
import { setSideBarOpenAction } from '../../store/slices/sidebarSlice'
import Styled from './styles'

type Props = {
  id: number
  active?: boolean
  setActive: (val: number) => void
}

const ChatPreview: React.FC<Props> = (props) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    if (window.innerWidth < 400) {
      dispatch(setSideBarOpenAction(false))
    }

    props.setActive(props.id)
  }

  return (
    <Styled.Container $active={props.active} onClick={handleClick}>
      <div>
        <Styled.ImageContainer>
          <Styled.Image>О</Styled.Image>
        </Styled.ImageContainer>
      </div>
      <Styled.ChatInfo>
        <Styled.ChatName>Общий чат</Styled.ChatName>
        <Styled.LastMessage>
          <span>Batman:</span> Привет, как дела
        </Styled.LastMessage>
      </Styled.ChatInfo>
    </Styled.Container>
  )
}

export default ChatPreview
