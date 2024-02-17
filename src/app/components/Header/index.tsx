import React from 'react'
import { styled } from 'styled-components'
import MoaiIcon from '../../icons/MoaiIcon'

const Header: React.FC = () => {
  return (
    <Container>
      <div>
        <ChatInfo>
          <Title>
            Chad
            <MoaiIcon />
          </Title>
          <Text>3 участника</Text>
        </ChatInfo>
        <UserInfo>
          <div>
            <Name>Бэтмен</Name>
          </div>
        </UserInfo>
      </div>
    </Container>
  )
}

const ChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
`

const Name = styled.div`
  font-size: 20px;
  color: #7d7d7d;
`

const UserInfo = styled.div`
  position: absolute;
  pointer-events: auto;
  width: 100%;
  height: 74px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  top: 0;
  text-align: right;
  box-shadow: 0px 15px 20px -5px rgb(0 0 0 / 33%);
  z-index: 100;

  & > div {
    padding: 0 20px;
  }
`

const Text = styled.div`
  font-size: 14px;
  color: #818181;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 22px;
`

const Container = styled.div`
  height: 70px;
  margin-bottom: 4px;

  & > div {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    padding: 10px 15px;
  }
`

export default Header
