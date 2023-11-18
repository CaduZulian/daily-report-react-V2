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
