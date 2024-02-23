import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import SearchBar from '../SearchBar'
import { barCloseOptions, barOpenOptions } from './styles'
import ChatPreview from '../ChatPreview'

const SideBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement | null>(null)
  const resizerRef = useRef<HTMLDivElement | null>(null)

  const [show, setShow] = useState(window.innerWidth > 400 ? true : false)

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
      startWidth = Number(el.style.width ? el.style.width.replace('px', '') : 400)
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
        setShow(true)
        return
      }
      if (width < 120) setShow(false)
    }

    const stopDrag = () => {
      window.removeEventListener('mousemove', doDrag)
      window.removeEventListener('mouseup', stopDrag)
      resizer.removeEventListener('mousedown', initDrag)
    }

    el.addEventListener('mouseover', init)

    return () => el.removeEventListener('mouseover', init)
  }, [barRef, resizerRef])

  const setBarWidth = (val: boolean) => {
    if (!barRef.current) return

    const barAnim = barRef.current.animate(...(val ? barOpenOptions : barCloseOptions))
    if (val) setShow(true)
    else setShow(false)
    barAnim.addEventListener('finish', () => {
      if (window.innerWidth > 400) barRef.current!.style.width = val ? '400px' : '80px'
      else barRef.current!.style.width = val ? '100vw' : '0px'
      barAnim.cancel()
    })
  }

  console.log(show)

  return (
    <Container ref={barRef}>
      <Items>
        <SearchBar showSidebar={show} setBarWidth={setBarWidth} />
        <ChatPreview active={activeChat === 1} setActive={setActiveChat} id={1} />
        <ChatPreview active={activeChat === 2} setActive={setActiveChat} id={2} />
        <ChatPreview active={activeChat === 3} setActive={setActiveChat} id={3} />
      </Items>
      <ResizeLine ref={resizerRef} />
    </Container>
  )
}

const ResizeLine = styled.div`
  height: 100%;
  width: 20px;
  margin-right: -10px;
  background: transparent;
  cursor: col-resize;
  z-index: 100;
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Container = styled.div`
  display: flex;
  min-width: 80px;
  max-width: 400px;
  width: 400px;

  @media (max-width: 400px) {
    min-width: 0px;
    max-width: 100vwpx;
    width: 0px;
  }
`

export default SideBar
