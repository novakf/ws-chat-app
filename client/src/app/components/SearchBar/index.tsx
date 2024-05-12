import React, { useState } from 'react'
import SearchIcon from '../../icons/SearchIcon'
import ArrowLeft from '../../icons/ArrowLeft'
import { setSideBarOpenAction, sideBarOpen } from '../../store/slices/sidebarSlice'
import { useDispatch } from 'react-redux'
import Styled from './styles'

const SearchBar: React.FC = () => {
  const [value, setValue] = useState('')

  const dispatch = useDispatch()
  const showSidebar = sideBarOpen()

  const handleEnter = (event: React.KeyboardEvent) => {
    let value = (event.target as HTMLInputElement).value
    if (event.key === 'Enter' && value) {
    }
  }

  return (
    <Styled.Container>
      <Styled.Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Поиск чата"
        onKeyDown={handleEnter}
        $hide={!showSidebar}
      />
      {window.innerWidth > 400 && (
        <Styled.Icons $showSide={showSidebar}>
          <SearchIcon onClick={() => dispatch(setSideBarOpenAction(true))} />
          <ArrowLeft onClick={() => dispatch(setSideBarOpenAction(false))} />
        </Styled.Icons>
      )}
    </Styled.Container>
  )
}

export default SearchBar
