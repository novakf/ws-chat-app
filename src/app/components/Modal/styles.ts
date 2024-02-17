import { styled } from 'styled-components'

export default {
  ModalWrapper: styled.div<{ $open: boolean }>`
    z-index: 1000000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;
    height: 802px;
    width: 1100px;
    border-radius: 15px;

    ${(props) =>
      props.$open &&
      `
      opacity: 1;
      backdrop-filter: blur(20px) opacity(1);
      pointer-events: all;
  `}
  `,

  ModalContent: styled.div<{ $open: boolean }>`
    width: fit-content;
    margin: 0 40px;
    border-radius: 10px;
    background-color: white;
    transform: scale(0.2);
    transition: transform 0.2s;
    padding: 35px;

    ${(props) => props.$open && 'transform: scale(1);'}
  `,
}
