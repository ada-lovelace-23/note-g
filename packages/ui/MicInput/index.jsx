import React from 'react';
import { Mic, MicOff, MicNone } from '@material-ui/icons';

const constraints = { audio: true, video: false };

const micButtonStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '16px',
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
    // const { stream } = useUserMedia(constraints);
    // const { isRecording, startRecording, stopRecording, blobUrl, channelData } = useRecordMp3(
    //     stream,
    //     { bitrate: 128 }
    // );

    return (
        <div style={microphoneStyle}>
            <button
                onClick={micClickhandler}
                // disabled={!stream}
                style={micButtonStyle}>
                {/* {!stream ? <MicDisabled /> : isRecording ? <MicStop /> : <MicRecord />} */}
                <MicRecord />
            </button>
            {/* {blobUrl && <audio controls src={blobUrl}></audio>} */}
        </div>
    );
};

export default Microphone;
