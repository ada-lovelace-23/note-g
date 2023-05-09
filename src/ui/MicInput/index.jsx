import React from 'react';
import './micStyles.css'
import { BsFillRecordCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";

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



const Microphone = ({ micClickhandler, isRecording }) => {

    const iconValues = {
        className: isRecording ? "recordIcon recordIcon--disable" : "recordIcon"
    }
    return (
        <div style={microphoneStyle}>
            <button
                onClick={micClickhandler}
                styles={micButtonStyle}
                className="micInputButton">
                    <IconContext.Provider value={iconValues}>
                        <BsFillRecordCircleFill />
                    </IconContext.Provider>
            </button>
            {/* {blobUrl && <audio controls src={blobUrl}></audio>} */}
        </div>
    );
};

export default Microphone;
