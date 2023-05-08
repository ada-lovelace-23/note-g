import React from 'react';
import './micStyles.css'

const constraints = { audio: true, video: false };

const micButtonStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '16px',
    background: '#fff'
};

const microphoneStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};


const MicDisabled = () => (
    <>
        <MicOff fontSize="large" />
        <span>Mic disabled</span>
    </>
);

const MicStop = () => (
    <>
        <Mic fontSize="large" /> <span>Stop</span>
    </>
);

const MicRecord = () => (
    <>
        <MicNone fontSize="large" /> <span>Record</span>
    </>
);

const Microphone = ({ micClickhandler }) => {

    return (
        <div style={microphoneStyle}>
            <button
                onClick={micClickhandler}
                styles={micButtonStyle}
                className="micInputButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="136" height="136" fill="red" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                </svg>
            </button>
            {/* {blobUrl && <audio controls src={blobUrl}></audio>} */}
        </div>
    );
};

export default Microphone;
