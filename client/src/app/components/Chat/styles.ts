import { styled } from 'styled-components'
import bg from '../../assets/sky.webp'

export default {
  ErrorContainer: styled.div<{ $owner: boolean }>`
    display: flex;
    gap: 10px;
    align-items: center;

    ${(props) =>
      props.$owner &&
      `
    margin-left: auto;
    flex-direction: row-reverse;
  `}
  `,

  Empty: styled.div<{ $hide?: boolean }>`
    display: flex;
    color: #414141;
    padding: 2px 10px;
    background: #fff;
    width: fit-content;
    margin: 25px auto;
    border-radius: 15px;
    font-size: 14px;
    transition: all 0.1s;

    @media (max-width: 400px) {
      ${(p) =>
        p.$hide &&
        `
      opacity: 0;
    `}
    }
  `,

  Container: styled.div<{ $empty?: boolean }>`
    display: flex;
    height: 100%;
    background: url('${bg}');
    background-repeat: round;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    & > div {
      display: flex;
      flex-direction: column;
      padding: 10px 15px;
      gap: 10px;
      margin-top: auto;
      width: 100%;
      min-height: 667px;
      justify-content: flex-end;

      @media (max-width: 1100px) {
        min-height: calc(100vh - 130px);
      }
    }
  `,
}
