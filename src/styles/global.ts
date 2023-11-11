import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    :root {
        --main-green: #34D0A8;
        --main-blue: #070B15;
        
        --action-green: #44AE93;

        --text-light: #FFFFFF;
        --text-light-gray: #9E9E9E;
        --text-dark-gray: #5A5A5A;
        --text-dark: #111111;

        --status-blue:  #2D61E1;
        --status-light-blue: #F1F5FD;
        --status-green: #066F53;
        --status-light-green: #CCF3E9;
        --status-red: #FC3629;
        --status-light-red: #FFF0EF;
        --status-orange: #AD6500;
        --status-light-orange: #FCF7E9;

        --border-light: #DDE3E9;

        --background-light: #F3F5F7;
        --background-radial: radial-gradient(80.22% 129.52% at 49.85% 152.29%, #223667 0%, #090E1B 100%);
        --background-white: #FFFFFF;

        --opacity-green: rgba(52, 208, 168, 0.25);
        --opacity-yellow: rgba(208, 164, 52, 0.25);
        
        --blue-100: #DDE3E9;
        --blue-200: #818798;
        --blue-400: #222939;
        --blue-500: #142348;
        --blue-800: #0D1426;

        --notification-red: #D52115;

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
        
        font-family: sans-serif;
    }

    input:focus, textarea:focus {
        outline: 0;
    }

    body, input, textarea, button {
        font-family: sans-serif;
        font-weight: 400;
    }

    body { 
        background: var(--background-light);
        -webkit-font-smoothing: antialiased;
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
