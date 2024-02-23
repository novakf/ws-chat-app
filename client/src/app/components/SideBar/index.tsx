import React, { useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import SearchBar from '../SearchBar'

const SideBar: React.FC = () => {
  const barRef = useRef(null)
  const resizerRef = useRef(null)

  let startX: number, startY: number, startWidth: number, startHeight: number

  useEffect(() => {
    if (!barRef.current || !resizerRef.current) return

    const el = barRef.current as HTMLDivElement
    const resizer = resizerRef.current as HTMLDivElement

    const init = () => {
      resizer.addEventListener('mousedown', initDrag)
    }

    const initDrag = (e: MouseEvent) => {
      startX = e.clientX
      startY = e.clientY
      startWidth = parseInt(document.defaultView!.getComputedStyle(el).width, 10)
      startHeight = parseInt(document.defaultView!.getComputedStyle(el).height, 10)
      document.documentElement.addEventListener('mousemove', doDrag, false)
      document.documentElement.addEventListener('mouseup', stopDrag, false)
    }

    const doDrag = (e: MouseEvent) => {
      el.style.width = startWidth + e.clientX - startX + 'px'
      el.style.height = startHeight + e.clientY - startY + 'px'
    }

    const stopDrag = (e: MouseEvent) => {
      document.documentElement.removeEventListener('mousemove', doDrag, false)
      document.documentElement.removeEventListener('mouseup', stopDrag, false)
      resizer.removeEventListener('mousedown', initDrag)
    }

    el.addEventListener('mouseover', init)

    return () => el.removeEventListener('mouseover', init)
  }, [barRef, resizerRef])

  return (
    <Container ref={barRef}>
      <Items>
        <SearchBar />
        <Item></Item>
        <Item></Item>
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

const Item = styled.div`
  height: 74px;
`

const Container = styled.div`
  display: flex;
  max-width: 350px;
  min-width: 100px;
`

export default SideBar
