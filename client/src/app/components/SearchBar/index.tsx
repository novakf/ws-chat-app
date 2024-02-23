import React, { useState } from 'react'
import { styled } from 'styled-components'
import SearchIcon from '../../icons/SearchIcon'
import ArrowLeft from '../../icons/ArrowLeft'
import { setSideBarOpenAction, sideBarOpen } from '../../store/slices/sidebarSlice'
import { useDispatch } from 'react-redux'

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
    <Container>
      <StyledInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Поиск чата"
        onKeyDown={handleEnter}
        $hide={!showSidebar}
      />
      {window.innerWidth > 400 && (
        <Icons $showSide={showSidebar}>
          <SearchIcon onClick={() => dispatch(setSideBarOpenAction(true))} />
          <ArrowLeft onClick={() => dispatch(setSideBarOpenAction(false))} />
        </Icons>
      )}
    </Container>
  )
}

const Icons = styled.div<{ $showSide: boolean }>`
  display: flex;
  position: relative;

  svg:nth-child(1) {
    cursor: pointer;
    opacity: 1;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.2);
    }
    ${(p) =>
      p.$showSide &&
      `
      opacity: 0;
    `}
  }

  svg:nth-child(2) {
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s;
    margin-right: 10px;
    &:hover {
      transform: scale(1.2);
    }
    ${(p) =>
      p.$showSide &&
      `
      opacity: 1;
    `}
  }
`

const StyledInput = styled.input<{ $error?: boolean; $hide?: boolean }>`
  border: 1px solid #dddddd;
  outline: none;
  border-radius: 15px;
  width: 100%;
  padding: 2px 10px;
  font-size: 16px;
  transition: all 0.3s;
  height: 30px;
  margin-left: 10px;
  opacity: 1;

  &:focus {
    border: 1px solid #3600b9 !important;
  }

  ${(p) =>
    p.$hide &&
    `
    width: 0;
    opacity: 0;
  `}

  @media(max-width: 400px) {
    ${(p) =>
      !p.$hide &&
      `
    margin-right: 10px;`}
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 74px;
  border-bottom: 1px solid #bdbdbd;
  width: calc(100% + 10px);

  @media (max-width: 400px) {
    height: 46px;
    border-bottom: none;
  }
`

export default SearchBar
