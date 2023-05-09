import { styled } from '@mui/material/styles';
import { Button as ButtonOriginal } from '@mui/material';

const Button = styled(ButtonOriginal, {
    shouldForwardProp: (prop) => prop !== 'isRecording',
})`
    border-radius: 50%;
    box-sizing: border-box;
    padding: 2rem;
    width: 4rem;
    height: 4rem;
    color: ${({ isRecording }) => (isRecording ? 'var(--white)' : 'var(--primary)')};
    background-color: ${({ isRecording }) => (isRecording ? 'var(--secondary)' : 'var(--white)')};
    border-color: ${({ isRecording }) => (isRecording ? 'var(--secondary)' : 'var(--primary)')};
    border-width: 2px;
    border-style: solid;

    &:hover {
        color: ${({ isRecording }) => (isRecording ? 'var(--secondary-100)' : 'var(--white)')};
        background-color: ${({ isRecording }) =>
            isRecording ? 'var(--white)' : 'var(--primary-100)'};
        border-color: ${({ isRecording }) =>
            isRecording ? 'var(--secondary-100)' : 'var(--primary-100)'};
    }

    > svg {
        font-size: 2rem;
    }
`;

export default Button;
