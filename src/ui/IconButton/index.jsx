import { styled } from '@mui/material/styles';
import { Button as ButtonOriginal } from '@mui/material';

const Button = styled(ButtonOriginal, {})`
    border-radius: 50%;
    box-sizing: border-box;
    padding: 1rem;
    color: var(--primary);
    background-color: var(--white);
    border-color: transparent;
    border-width: 2px;
    border-style: solid;

    &:hover {
        /* color: var(--white); */
        /* background-color: var(--primary-100); */
        border-color: var(--primary-100);
    }

    > svg {
        font-size: 2rem;
    }
`;

export default Button;
