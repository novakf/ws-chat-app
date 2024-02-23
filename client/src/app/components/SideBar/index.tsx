import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../SearchBar'
import { barCloseOptions, barOpenOptions } from './styles'
import ChatPreview from '../ChatPreview'
import { useDispatch } from 'react-redux'
import { setSideBarOpenAction, sideBarOpen } from '../../store/slices/sidebarSlice'
import Styled from './styles'

const SideBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement | null>(null)
  const resizerRef = useRef<HTMLDivElement | null>(null)

  const sideBarShow = sideBarOpen()
  const dispatch = useDispatch()

  const [activeChat, setActiveChat] = useState(1)

  let startX: number, startWidth: number

  useEffect(() => {
    if (!barRef.current || !resizerRef.current || window.innerWidth < 400) return

    const el = barRef.current as HTMLDivElement
    const resizer = resizerRef.current as HTMLDivElement

    const init = () => {
      resizer.addEventListener('mousedown', initDrag)
    }

    const initDrag = (e: MouseEvent) => {
      startX = e.clientX
      if (window.innerWidth > 400)
        startWidth = Number(el.style.width ? el.style.width.replace('px', '') : sideBarShow ? 400 : 100)
      else startWidth = Number(el.style.width ? el.style.width.replace('px', '') : sideBarShow ? window.innerWidth : 0)
      window.addEventListener('mousemove', doDrag)
      window.addEventListener('mouseup', stopDrag)
    }

    const doDrag = (e: MouseEvent) => {
      e.preventDefault()
      let width = startWidth + 1.7 * (e.clientX - startX)
      if (width < 80) width = 80
      if (width > 400) width = 400
      el.style.width = width + 'px'

      if (width > 120) {
        dispatch(setSideBarOpenAction(true))
        return
      }
      if (width < 120) dispatch(setSideBarOpenAction(false))
    }

    const stopDrag = () => {
      window.removeEventListener('mousemove', doDrag)
      window.removeEventListener('mouseup', stopDrag)
      resizer.removeEventListener('mousedown', initDrag)
    }

    el.addEventListener('mouseover', init)

    return () => el.removeEventListener('mouseover', init)
  }, [barRef, resizerRef])

  const setBarWidth = () => {
    if (!barRef.current) return

    const barAnim = barRef.current.animate(...(sideBarShow ? barOpenOptions : barCloseOptions))

    if (sideBarShow) dispatch(setSideBarOpenAction(true))
    else dispatch(setSideBarOpenAction(false))

    barAnim.addEventListener('finish', () => {
      if (window.innerWidth > 400) barRef.current!.style.width = sideBarShow ? '400px' : '80px'
      else barRef.current!.style.width = sideBarShow ? '100vw' : '0px'

      barAnim.cancel()
    })
  }

  useEffect(() => {
    setBarWidth()
  }, [sideBarShow])

  return (
    <Styled.Container ref={barRef} $mobile={window.innerWidth < 400} $show={sideBarShow}>
      <Styled.Items>
        {window.innerWidth < 400 && <Styled.Title $hide={!sideBarShow}>Чаты</Styled.Title>}
        <SearchBar />
        <ChatPreview active={activeChat === 1} setActive={setActiveChat} id={1} />
        <ChatPreview active={activeChat === 2} setActive={setActiveChat} id={2} />
        <ChatPreview active={activeChat === 3} setActive={setActiveChat} id={3} />
      </Styled.Items>
      <Styled.ResizeLine ref={resizerRef} />
    </Styled.Container>
  )
}

export default SideBar
