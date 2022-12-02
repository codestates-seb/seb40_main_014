import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    position: relative;
    width: 100vw;
    height: 100vh;
    margin: 0 !important;
    padding: 0 !important;
    background-color: ${(props) => props.theme.colors.background};
    font-family: 'Noto Sans KR', sans-serif;
    color: ${(props) => props.theme.colors.gray900};
    overflow-x: hidden;
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

  select {
    border: none;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  .swal2-container {
    z-index: 9999 !important;
    white-space: pre-line;
  }
`;

export default GlobalStyle;
