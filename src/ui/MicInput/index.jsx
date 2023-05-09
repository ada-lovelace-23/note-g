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

function showRightMic({ isRecording, hasMicAccess }) {
    if (!hasMicAccess) {
        return (
            <>
                <MicOffIcon size="large" />
            </>
        );
    }
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

const Microphone = ({ micClickhandler, isRecording, hasMicAccess }) => {
    return (
        <div style={micInputStyle}>
            <Button
                variant="contained"
                onClick={() => {
                    hasMicAccess && micClickhandler();
                }}
                size="large"
                disabled={!hasMicAccess}
                isRecording={hasMicAccess && isRecording}>
                {showRightMic({ isRecording, hasMicAccess })}
            </Button>
        </div>
    );
};

export default Microphone;
