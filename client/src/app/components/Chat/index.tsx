import React, { useEffect, useRef } from 'react'
import Message from '../Message'
import { historyData } from '../../store/slices/chatSlice'
import ErrorIcon from '../../icons/ErrorIcon'
import { userData } from '../../store/slices/userSlice'
import Tooltip from '../Tooltip'
import Loader from '../Loader'
import { sideBarOpen } from '../../store/slices/sidebarSlice'
import Styled from './styles'

const Chat: React.FC = () => {
  const history = historyData()
  const userName = userData().name
  const chatRef = useRef<HTMLDivElement>(null)
  const sidebar = sideBarOpen()

  useEffect(() => {
    if (chatRef?.current && history?.length) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, left: 0, behavior: 'smooth' })
    }
  }, [chatRef, history])

  return (
    <Styled.Container $empty={history?.length === 0} ref={chatRef}>
      <div>
        {history && history.length > 0 ? (
          history
            .slice()
            ?.sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((message, i) => {
              return (
                <Styled.ErrorContainer key={message.date.getTime()} $owner={message.sender === userName}>
                  {message.error && (
                    <Tooltip title={<div>Ошибка</div>}>
                      <ErrorIcon />
                    </Tooltip>
                  )}
                  <Message message={message} next={history[i + 1]} prev={history[i - 1]} />
                  {message.loading && <Loader />}
                </Styled.ErrorContainer>
              )
            })
        ) : (
          <Styled.Empty $hide={sidebar}>Сообщений нет</Styled.Empty>
        )}
      </div>
    </Styled.Container>
  )
}

export default Chat
