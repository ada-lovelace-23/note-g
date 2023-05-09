import React, { useState, useRef } from 'react';
import Microphone from '../../ui/MicInput';
import {
    TranscribeStreamingClient,
    StartStreamTranscriptionCommand,
} from '@aws-sdk/client-transcribe-streaming';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import MicrophoneStream from 'microphone-stream';
import { Buffer } from 'buffer';
import getUserMedia from 'get-user-media-promise';
import LanguageSelector from '../../ui/LanguageSelector';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const RecorderContainer = ({ volunteer, user, textToTranslatehandler }) => {
    const [hasMicAccess, setHasMicAccess] = useState(true);
    const [recording, setRecording] = useState(false);
    // const [userLanguage, setUserLanguageSource] = useState('en-US');
    const { language: userLanguage, languageHandler: userLanguageHandler } = user;
    const { languageHandler: volunteerLanguageHandler } = volunteer;
    const SAMPLE_RATE = 44100;
    let microphoneStream = useRef(null);
    let transcribeClient = undefined;

    const startRecording = async (userLanguage, callback) => {
        if (!userLanguage) {
            return false;
        }
        if (microphoneStream.current || transcribeClient) {
            stopRecording();
        }
        createTranscribeClient();
        createMicrophoneStream();
        try {
            await startStreaming(userLanguage, callback);
        } catch (err) {
            console.error(err);
        }
    };

    const stopRecording = function () {
        if (microphoneStream.current) {
            microphoneStream.current.stop();
            microphoneStream.current.destroy();
            microphoneStream.current = undefined;
            setRecording(false);
        }
        if (transcribeClient) {
            transcribeClient.destroy();
            transcribeClient = undefined;
        }
    };

    const createTranscribeClient = () => {
        transcribeClient = new TranscribeStreamingClient({
            region: process.env.GATSBY_REGION,
            credentials: fromCognitoIdentityPool({
                client: new CognitoIdentityClient({ region: process.env.GATSBY_REGION }),
                identityPoolId: process.env.GATSBY_IDENTITY_POOL_ID,
            }),
        });
    };

    const createMicrophoneStream = async () => {
        microphoneStream.current = new MicrophoneStream();
        try {
            const stream = await getUserMedia({
                video: false,
                audio: true,
            });
            setHasMicAccess(true);
            microphoneStream.current.setStream(stream);
        } catch (err) {
            console.error(err);
            setHasMicAccess(false);
        }
    };

    const startStreaming = async (userLanguage, callback) => {
        setRecording(true);
        const command = new StartStreamTranscriptionCommand({
            LanguageCode: userLanguage,
            MediaEncoding: 'pcm',
            MediaSampleRateHertz: SAMPLE_RATE,
            AudioStream: getAudioStream(),
        });
        const data = await transcribeClient.send(command);
        for await (const event of data.TranscriptResultStream) {
            for (const result of event.TranscriptEvent.Transcript.Results || []) {
                if (result.IsPartial === false) {
                    const noOfResults = result.Alternatives[0].Items.length;
                    for (let i = 0; i < noOfResults; i++) {
                        // loadingHandler(false);
                        callback(result.Alternatives[0].Items[i].Content + ' ');
                    }
                }
            }
        }
    };

    const getAudioStream = async function* () {
        for await (const chunk of microphoneStream.current) {
            if (chunk.length <= SAMPLE_RATE) {
                yield {
                    AudioEvent: {
                        AudioChunk: encodePCMChunk(chunk),
                    },
                };
            }
        }
    };

    const encodePCMChunk = (chunk) => {
        const input = MicrophoneStream.toRaw(chunk);
        let offset = 0;
        const buffer = new ArrayBuffer(input.length * 2);
        const view = new DataView(buffer);
        for (let i = 0; i < input.length; i++, offset += 2) {
            let s = Math.max(-1, Math.min(1, input[i]));
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
        }
        return Buffer.from(buffer);
    };

    const micClickhandler = async () => {
        if (recording === true) {
            stopRecording();
        } else {
            // loadingHandler(true);
            try {
                await startRecording(userLanguage, onTranscriptionDataReceived);
            } catch (error) {
                alert('An error occurred while recording: ' + error.message);
                stopRecording();
            }
            // loadingHandler(false);
        }
    };

    const onTranscriptionDataReceived = (data) => {
        textToTranslatehandler(data);
    };

    return (
        <Grid container spacing={1} columns={12}>
            <Grid xs={6}>
                <LanguageSelector
                    size="small"
                    label="User"
                    id="user-lang"
                    languageHandler={userLanguageHandler}
                />
            </Grid>
            <Grid xs={6}>
                <LanguageSelector
                    size="small"
                    label="Volunteer"
                    id="volunteer-lang"
                    languageHandler={volunteerLanguageHandler}
                />
            </Grid>
            <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* <Box sx={{ display: 'flex', alignItems: 'center' }}> */}
                <Box sx={{ m: 1, position: 'relative' }}>
                    {recording && (
                        <CircularProgress
                            size={80}
                            sx={{
                                color: 'var(--secondary-100)',
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 0,
                            }}
                        />
                    )}

                    <Microphone
                        micClickhandler={micClickhandler}
                        isRecording={recording}
                        hasMicAccess={hasMicAccess}
                    />
                </Box>
                {/* </Box> */}
            </Grid>
        </Grid>
    );
};

export default RecorderContainer;
