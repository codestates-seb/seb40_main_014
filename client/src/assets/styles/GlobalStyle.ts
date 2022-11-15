import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => props.theme.colors.background};
    font-family: 'Noto Sans KR', sans-serif;
    color: ${(props) => props.theme.colors.gray900};
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
    border: none;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }
`;

export default GlobalStyle;
