import { styled } from 'styled-components'
import CornerIcon from '../../icons/CornerIcon'

export default {
  CornerIcon: styled(CornerIcon)<{ $owner?: boolean }>`
    position: absolute;
    top: calc(100% - 1.03rem);
    left: -9px;
    width: 10px;
    height: 20px;
    font-size: 14px;

    ${(props) =>
      props.$owner &&
      `
    transform: scale(-1, 1);
    left: auto;
    right: -10px;
  `}
  `,

  SendDate: styled.div`
    font-size: 12px;
    margin-left: auto;
    color: #9f9f9f;
  `,

  Content: styled.div`
    font-size: 14px;
  `,

  Name: styled.div`
    font-size: 12px;
    color: #4b4b4b;
  `,

  Container: styled.div<{ $owner?: boolean; $repeatNext?: boolean; $repeatPrev?: boolean; $error?: boolean }>`
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px solid #fff;
    border-radius: 17px;
    border-bottom-left-radius: 0;
    width: fit-content;
    padding: 5px 10px;
    background: #fff;

    ${(props) =>
      props.$owner &&
      `
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 17px;
  `}

    ${(props) =>
      props.$repeatNext && props.$owner
        ? `
    border-bottom-right-radius: 7px;
    margin-bottom: -7px;
  `
        : props.$repeatNext &&
          `
    border-bottom-left-radius: 7px;
    margin-bottom: -7px;
  `}

  ${(props) =>
      props.$repeatPrev && props.$owner
        ? `
    border-top-right-radius: 7px;
  `
        : props.$repeatPrev &&
          `
    border-top-left-radius: 7px;
  `}

  ${(props) =>
      props.$error &&
      `
    filter: opacity(0.5);
  `}
  `,
}
