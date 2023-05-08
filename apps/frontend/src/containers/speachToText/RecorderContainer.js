import React, { useState } from 'react';
import Microphone from 'ui/MicInput';
import {
    TranscribeStreamingClient,
    StartStreamTranscriptionCommand,
} from '@aws-sdk/client-transcribe-streaming';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import MicrophoneStream from 'microphone-stream';
import { Buffer } from 'buffer';
import getUserMedia from 'get-user-media-promise';

const RecorderContainer = ({ textToTranslatehandler }) => {
    const [recording, setRecording] = useState(false);
    const SAMPLE_RATE = 44100;
    let microphoneStream = undefined;
    let transcribeClient = undefined;

    const startRecording = async (language, callback) => {
        if (!language) {
            return false;
        }
        if (microphoneStream || transcribeClient) {
            stopRecording();
        }
        createTranscribeClient();
        createMicrophoneStream();
        try {
            await startStreaming(language, callback);
        } catch (err) {
            console.error(err);
        }
    };

    const stopRecording = function () {
        if (microphoneStream) {
            microphoneStream.stop();
            microphoneStream.destroy();
            microphoneStream = undefined;
        }
        if (transcribeClient) {
            transcribeClient.destroy();
            transcribeClient = undefined;
        }
    };

    const createTranscribeClient = () => {
        transcribeClient = new TranscribeStreamingClient({
            region: 'eu-west-1',
            credentials: fromCognitoIdentityPool({
                client: new CognitoIdentityClient({ region: 'eu-west-1' }),
                identityPoolId: 'eu-west-1:3608148b-3dee-4d48-9b28-0bf1e6332bc8',
            }),
        });
    };

    const createMicrophoneStream = async () => {
        microphoneStream = new MicrophoneStream();
        getUserMedia({
            video: false,
            audio: true,
        })
            .then(function (stream) {
                microphoneStream.setStream(stream);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const startStreaming = async (language, callback) => {
        setRecording(true);
        const command = new StartStreamTranscriptionCommand({
            LanguageCode: language,
            MediaEncoding: 'pcm',
            MediaSampleRateHertz: SAMPLE_RATE,
            AudioStream: getAudioStream(),
        });
        try {
            const data = await transcribeClient.send(command);

            for await (const event of data.TranscriptResultStream) {
                for (const result of event.TranscriptEvent.Transcript.Results || []) {
                    if (result.IsPartial === false) {
                        const noOfResults = result.Alternatives[0].Items.length;
                        for (let i = 0; i < noOfResults; i++) {
                            callback(result.Alternatives[0].Items[i].Content + ' ');
                        }
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getAudioStream = async function* () {
        try {
            for await (const chunk of microphoneStream) {
                if (chunk.length <= SAMPLE_RATE) {
                    yield {
                        AudioEvent: {
                            AudioChunk: encodePCMChunk(chunk),
                        },
                    };
                }
            }
        } catch (err) {
            console.error(err);
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
            console.log('recording');
            stopRecording();
        } else {
            try {
                await startRecording('en-US', onTranscriptionDataReceived);
            } catch (error) {
                alert('An error occurred while recording: ' + error.message);
                stopRecording();
            }
        }
    };

    const onTranscriptionDataReceived = (data) => {
        textToTranslatehandler(data);
    };

    return (
        <>
            <Microphone micClickhandler={micClickhandler} />
        </>
    );
};

export default RecorderContainer;
