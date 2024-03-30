import { createGlobalStyle, css } from "styled-components";

const styles = css`
  @font-face {
    font-family: "Pretendard";
    src: url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css");
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Pretendard", sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul,
  li {
    list-style: none;
  }

  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }
`;

const GlobalStyles = createGlobalStyle`
    ${styles}
`;

export default GlobalStyles;
