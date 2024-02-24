import { styled } from 'styled-components'

export default {
  Title: styled.div<{ $hide: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    height: 74px;
    border-bottom: 1px solid #bdbdbd;
    width: calc(100% + 10px);
    font-size: 28px;
    background: linear-gradient(135deg, #1f6ed1 20%, #fa0ee6 70%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: 400px) {
      ${(p) =>
        p.$hide &&
        `
      opacity: 0;
    `}
    }
  `,

  ResizeLine: styled.div`
    height: 100%;
    width: 20px;
    margin-right: -10px;
    background: transparent;
    cursor: col-resize;
    z-index: 100;
  `,

  Items: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,

  Container: styled.div<{ $mobile: boolean; $show: boolean }>`
    display: flex;
    min-width: 80px;
    max-width: 400px;
    width: 400px;

    @media (max-width: 400px) {
      min-width: 0px;
      max-width: 100vw;
      width: 0px;
    }
  `,
}

export const barOpenOptions: [Keyframe[], KeyframeAnimationOptions] = [
  [{ width: window.innerWidth > 400 ? '400px' : '100vw' }],
  {
    duration: 300,
    fill: 'forwards',
  },
]

export const barCloseOptions: [Keyframe[], KeyframeAnimationOptions] = [
  [{ width: window.innerWidth > 400 ? '80px' : '0px' }],
  {
    duration: 200,
    fill: 'forwards',
  },
]
