import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import SearchBar from '../SearchBar'
import { barCloseOptions, barOpenOptions } from './styles'

const SideBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement | null>(null)
  const resizerRef = useRef<HTMLDivElement | null>(null)

  const [show, setShow] = useState(false)

  let startX: number, startWidth: number

  useEffect(() => {
    if (!barRef.current || !resizerRef.current) return

    const el = barRef.current as HTMLDivElement
    const resizer = resizerRef.current as HTMLDivElement

    const init = () => {
      resizer.addEventListener('mousedown', initDrag)
    }

    const initDrag = (e: MouseEvent) => {
      startX = e.clientX
      startWidth = Number(el.style.width ? el.style.width.replace('px', '') : 100)
      window.addEventListener('mousemove', doDrag)
      window.addEventListener('mouseup', stopDrag)
    }

    const doDrag = (e: MouseEvent) => {
      e.preventDefault()
      let width = startWidth + 1.7 * (e.clientX - startX)
      if (width < 80) width = 80
      if (width > 400) width = 400
      el.style.width = width + 'px'

      if (width > 120 && !show) {
        setShow(true)
        return
      }
      if (width < 120 && !show) setShow(false)
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
      barRef.current!.style.width = val ? '400px' : '80px'
      barAnim.cancel()
    })
  }

  return (
    <Container ref={barRef}>
      <Items>
        <SearchBar showSidebar={show} setBarWidth={setBarWidth} />
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
  min-width: 80px;
  max-width: 400px;
  width: 80px;
`

export default SideBar
