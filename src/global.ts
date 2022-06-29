import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    touch-action: none;
  }
  *, *::after, *::before {
    box-sizing: border-box;

  }
  body {
    display: flex;
    align-items: start;
    justify-content: center;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  `