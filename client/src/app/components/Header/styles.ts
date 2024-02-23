import { styled } from 'styled-components'
import ArrowRight from '../../icons/ArrowRight'

export default {
  ArrowRight: styled(ArrowRight)`
    margin-right: auto;
    margin-left: 15px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.2);
    }
  `,

  Exit: styled.button`
    background: transparent;
    border: none;
    font-size: 14px;
    color: #df0000;
    cursor: pointer;

    &:hover {
      color: #9d0000;
    }
  `,

  ChatInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
  `,

  Name: styled.div`
    font-size: 20px;
    color: #454545;
  `,

  UserInfo: styled.div`
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
      display: flex;
      gap: 10px;

      svg {
        &:hover {
          path:nth-child(2) {
            fill: #df0000;
          }
        }
      }
    }
  `,

  Text: styled.div`
    font-size: 14px;
    color: green;
  `,

  Title: styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 22px;
  `,

  Container: styled.div<{ $showSidebar: boolean }>`
    height: 70px;
    margin-bottom: 4px;
    transition: all 0.3s;

    & > div {
      display: flex;
      justify-content: center;
      margin: 0 auto;
      position: relative;
      padding: 10px 15px;
      align-items: center;
    }

    @media (max-width: 400px) {
      ${(p) =>
        p.$showSidebar &&
        `
      opacity: 0;
    `}
    }
  `,
}
