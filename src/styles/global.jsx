import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        --primary: #004B79;
        --primary-100: #004680;
        --secondary: #ED1B2E;
        --secondary-100: #cb1827;
        --white: #fff;
    }
    html,
    body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
    }

    /* Hiding class, making content visible only to screen readers but not visually */
    /* "sr" meaning "screen-reader" */
    /* .sr-only:not(:focus):not(:active) { */
    .sr-only {
        clip: rect(0 0 0 0); 
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap; 
        width: 1px;
    }
`;

export default GlobalStyle;
