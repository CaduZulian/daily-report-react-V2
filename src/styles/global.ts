import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    :root {
        --main-primary: #2b879e;
        --main-secondary: #061013;

        --action-primary: #19515E; 

        --background-white: #FFFFFF; 
        --background-light: #F3F5F7; 
        --background-light-gray: #E9E9E9; 
        --background-light-blue: #E9EFFC; 
        --background-dark-blue: #19515E; 

        --text-light: #FFFFFF;
        --text-light-gray: #DFDFDF;
        --text-gray: #9E9E9E;
        --text-dark-gray: #5A5A5A;
        --text-dark: #111111;

        --border-light: #DDE3E9;

        --status-blue:  #2D61E1;
        --status-light-blue: #F1F5FD;
        --status-green: #066F53;
        --status-light-green: #CCF3E9;
        --status-red: #FC3629;
        --status-light-red: #FFF0EF;
        --status-orange: #AD6500;
        --status-light-orange: #FCF7E9;

        --toastify-color-light: #fff;
        --toastify-color-dark: #121212;
        --toastify-color-info: #2D61E1;
        --toastify-color-success: #066F53;
        --toastify-color-warning: #AD6500;
        --toastify-color-error: #FC3629;
        --toastify-color-transparent: rgba(255, 255, 255, 0.7);
    }
    
    *  {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        
        font-family: 'Roboto', sans-serif;
    }

    span, strong, p, h1, h2, h3, h4, h5, h6, button, input, textarea, label {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }

    input:focus, textarea:focus {
        outline: 0;
    }

    body { 
        background: var(--background-light);
        -webkit-font-smoothing: antialiased;

        /* ToolTip */
    [data-tooltip] {
      position: relative;
      cursor: pointer;
    }
    [data-tooltip]:before,
    [data-tooltip]:after {
      line-height: 1;
      font-size: 0.9em;
      pointer-events: none;
      position: absolute;
      box-sizing: border-box;
      display: none;
      opacity: 0;
    }
    [data-tooltip]:before {
      content: '';
      border: 5px solid transparent;
      z-index: 100;
    }
    [data-tooltip]:after {
      content: attr(data-tooltip);
      text-align: center;
      min-width: 3em;
      max-width: 21em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 2px 8px;
      border-radius: 4px;
      background: #111111;
      color: #ffffff;
      z-index: 99;
    }
    [data-tooltip]:hover:before,
    [data-tooltip]:hover:after {
      display: block;
      opacity: 1;
    }
    [data-tooltip]:not([data-flow])::before,
    [data-tooltip][data-flow='top']::before {
      bottom: 100%;
      border-bottom-width: 0;
      border-top-color: #111111;
    }
    [data-tooltip]:not([data-flow])::after,
    [data-tooltip][data-flow='top']::after {
      bottom: calc(100% + 5px);
    }
    [data-tooltip]:not([data-flow])::before,
    [tooltip]:not([data-flow])::after,
    [data-tooltip][data-flow='top']::before,
    [data-tooltip][data-flow='top']::after {
      left: 50%;
      -webkit-transform: translate(-50%, -4px);
      transform: translate(-50%, -4px);
    }
    [data-tooltip][data-flow='bottom']::before {
      top: 100%;
      border-top-width: 0;
      border-bottom-color: #111111;
    }
    [data-tooltip][data-flow='bottom']::after {
      top: calc(100% + 5px);
    }
    [data-tooltip][data-flow='bottom']::before,
    [data-tooltip][data-flow='bottom']::after {
      left: 50%;
      -webkit-transform: translate(-50%, 8px);
      transform: translate(-50%, 8px);
    }
    [data-tooltip][data-flow='left']::before {
      top: 50%;
      border-right-width: 0;
      border-left-color: #111111;
      left: calc(0em - 5px);
      -webkit-transform: translate(-8px, -50%);
      transform: translate(-8px, -50%);
    }
    [data-tooltip][data-flow='left']::after {
      top: 50%;
      right: calc(100% + 5px);
      -webkit-transform: translate(-8px, -50%);
      transform: translate(-8px, -50%);
    }
    [data-tooltip][data-flow='right']::before {
      top: 50%;
      border-left-width: 0;
      border-right-color: #111111;
      right: calc(0em - 5px);
      -webkit-transform: translate(8px, -50%);
      transform: translate(8px, -50%);
    }
    [data-tooltip][data-flow='right']::after {
      top: 50%;
      left: calc(100% + 5px);
      -webkit-transform: translate(8px, -50%);
      transform: translate(8px, -50%);
    }
    [data-tooltip='']::after,
    [data-tooltip='']::before {
      display: none !important;
    }
    }

    button  {
        border: 0;
        background: transparent;
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    a   {
        text-decoration: none;
    }

    ul  {
        list-style: none;
    }
`;
