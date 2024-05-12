import { styled } from 'styled-components'
import PaperPlaneIcon from '../../icons/PaperPlaneIcon'

export default {
  PaperPlaneIcon: styled(PaperPlaneIcon)<{ $disable?: boolean }>`
    margin-left: auto;
    height: 40px;
    width: 40px;
    transition: all 0.3s;
    fill: #0764b3;

    ${(props) =>
      props.$disable
        ? `
      fill: #a3a3a3 !important;
    `
        : `
      &:hover {
        fill: #0d0c77;
      }
      cursor: pointer;
  `}
  `,

  Input: styled.input`
    border: none;
    padding: 0px;
    outline: none;
    padding: 6px 10px;
    font-size: 22px;
    transition: all 0.2s;
    width: 100%;

    height: 30px;
  `,

  Container: styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    padding: 10px 30px;
    border-top: 1px solid #cdcdcd;
    border-left: 1px solid #cdcdcd;
  `,
}
