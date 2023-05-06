import React from 'react';
import Microphone from 'ui/MicInput';

const pageStyle = {
    maxWidth: '768px',
    width: '100%',
    padding: '0 16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    margin: '0 auto',
};

const UploadAudioPage = ({ className }) => {
    return (
        <main className={className} style={pageStyle}>
            <Microphone />
        </main>
    );
};

export default UploadAudioPage;

export const Head = () => <title>Upload Interview</title>;
