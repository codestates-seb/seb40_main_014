import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: var(--background-color);
    font-family: 'Noto Sans KR', sans-serif;
    color: var(--gray-900);
  }

  button {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: inherit; 
    border: none; 
    box-shadow: none; 
    border-radius: 0; 
    padding: 0;
    overflow: visible; 
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
  }

  input {
    background-color: inherit;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }
`;

export default GlobalStyle;
