import React from 'react';
// import './micStyles.jsx';
// import { BsFillRecordCircleFill } from "react-icons/bs";
// import { IconContext } from "react-icons";

import Button from './ButtonStyled';
import MicIcon from '@mui/icons-material/Mic';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MicOffIcon from '@mui/icons-material/MicOff';

const micInputStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

function showRightMic(isRecording) {
    return isRecording ? (
        <>
            <MicIcon size="large" />
            <span className="sr-only">Stop recording</span>
        </>
    ) : (
        <>
            <MicNoneIcon size="large" />
            <span className="sr-only">Start recording</span>
        </>
    );
}

const Microphone = ({ micClickhandler, isRecording }) => {
    return (
        <div style={micInputStyle}>
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
