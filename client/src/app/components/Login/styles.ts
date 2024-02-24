import { styled } from 'styled-components'

export default {
  Input: styled.input<{ $error?: boolean }>`
    border: none;
    padding: 0px;
    outline: none;
    border-bottom: 2px solid #dddddd;
    padding: 6px 10px;
    font-size: 20px;
    transition: all 0.2s;

    height: 30px;

    &:focus {
      border-bottom: 2px solid #8700db;
    }

    ${(p) => p.$error && `border-bottom: 2px solid #ff000082;`}
  `,

  Title: styled.div`
    text-align: center;
    font-size: 28px;
    background: linear-gradient(135deg, #1f6ed1 20%, #fa0ee6 70%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    padding: 0.3em 0.6em;
    border: 3px solid transparent;
    border-image: linear-gradient(135deg, #1f6ed1 20%, #bd72c5 70%);
    border-image-slice: 1;
  `,

  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  `,
}
