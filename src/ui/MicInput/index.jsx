import React from 'react';
// import './micStyles.jsx';
// import { BsFillRecordCircleFill } from "react-icons/bs";
// import { IconContext } from "react-icons";

import Button from './ButtonStyled';
import MicIcon from '@mui/icons-material/Mic';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MicOffIcon from '@mui/icons-material/MicOff';

const micButtonStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '16px',
    background: '#fff',
};

const microphoneStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

function showRightMic(isRecording) {
    return isRecording ? (
        <>
            <MicIcon size="large" />
            <span className="sr-only">Record</span>
        </>
    ) : (
        <>
            <MicNoneIcon size="large" />
            <span className="sr-only">Stop</span>
        </>
    );
}

const Microphone = ({ micClickhandler, isRecording }) => {
    return (
        <div style={microphoneStyle}>
            <Button
                variant="contained"
                onClick={micClickhandler}
                size="large"
                isRecording={isRecording}>
                {showRightMic(isRecording)}
            </Button>
        </div>
    );
};

export default Microphone;
