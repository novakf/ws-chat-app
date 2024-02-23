import { styled } from 'styled-components'

export default {
  LastMessage: styled.div`
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: #838383;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;

    span {
      color: #6818ff;
    }
  `,

  Container: styled.div<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    transition: all 0.3s;
    height: 74px;
    width: 100%;
    padding: 10px;
    cursor: pointer;

    &:hover {
      ${(props) =>
        !props.$active &&
        `
    background: #f7f7f7;`}
    }

    ${(props) =>
      props.$active &&
      `
      background: #deebff;
    `}
  `,

  ChatName: styled.div`
    font-size: 18px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  ImageContainer: styled.div`
    display: flex;
    align-items: center;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    overflow: hidden;
    background: rgb(224, 224, 224);
  `,

  Image: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #b6d9ff;
    color: #3881f3;
    font-size: 32px;
  `,

  ChatInfo: styled.div`
    display: flex;
    margin-left: 10px;
    flex-direction: column;
    width: 100%;
    gap: 5px;
  `,
}
