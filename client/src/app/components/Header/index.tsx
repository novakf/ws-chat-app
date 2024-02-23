import React from 'react'
import { useDispatch } from 'react-redux'
import { setUserDataAction, userData } from '../../store/slices/userSlice'
import ExitIcon from '../../icons/ExitIcon'
import { clearChatHistoryAction, onlineCount } from '../../store/slices/chatSlice'
import { setSideBarOpenAction, sideBarOpen } from '../../store/slices/sidebarSlice'
import Styled from './styles'

type Props = {
  socket?: WebSocket
}

const Header: React.FC<Props> = ({ socket }) => {
  const user = userData()
  const online = onlineCount()
  const dispatch = useDispatch()
  const sidebar = sideBarOpen()

  const exitHandle = () => {
    dispatch(setUserDataAction({ name: '' }))
    dispatch(clearChatHistoryAction())
    socket?.close()
  }

  return (
    <Styled.Container $showSidebar={sidebar}>
      <div>
        <Styled.ChatInfo>
          <Styled.Title>Чат</Styled.Title>
          <Styled.Text>{online} онлайн</Styled.Text>
        </Styled.ChatInfo>
        <Styled.UserInfo>
          {window.innerWidth < 400 && <Styled.ArrowRight onClick={() => dispatch(setSideBarOpenAction(true))} />}
          <div>
            <Styled.Name>{user.name}</Styled.Name>
            <Styled.Exit onClick={exitHandle}>
              <ExitIcon color="#898989" />
            </Styled.Exit>
          </div>
        </Styled.UserInfo>
      </div>
    </Styled.Container>
  )
}

export default Header
