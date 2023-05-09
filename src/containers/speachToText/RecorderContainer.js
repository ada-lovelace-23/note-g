import React, { useState, useRef } from "react";
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

const RecorderContainer = ({ textToTranslatehandler, loadingHandler }) => {
  const [recording, setRecording] = useState(false);
  const SAMPLE_RATE = 44100;
  let microphoneStream = useRef(null);
  let transcribeClient = undefined;

  const startRecording = async (language, callback) => {
      if (!language) {
        return false;
      }
      if (microphoneStream.current || transcribeClient) {
        stopRecording();
      }
      createTranscribeClient();
      createMicrophoneStream();
      await startStreaming(language, callback);
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
            region: 'eu-west-1',
            credentials: fromCognitoIdentityPool({
                client: new CognitoIdentityClient({ region: 'eu-west-1' }),
                identityPoolId: 'eu-west-1:3608148b-3dee-4d48-9b28-0bf1e6332bc8',
            }),
        });
    };

  const createMicrophoneStream = async () => {
    microphoneStream.current = new MicrophoneStream();
    getUserMedia({
      video: false,
      audio: true,
    })
    .then(function(stream) {
      microphoneStream.current.setStream(stream);
    }).catch(function(error) {
    });
  }

    const startStreaming = async (language, callback) => {
        setRecording(true);
        const command = new StartStreamTranscriptionCommand({
            LanguageCode: language,
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
                        loadingHandler(false)
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
    if(recording === true){
      stopRecording();
    }else{
      try {
        loadingHandler(true)
        await startRecording("en-US", onTranscriptionDataReceived);
      } catch(error) {
        loadingHandler(false)
        alert("An error occurred while recording: " + error.message);
        stopRecording();
      }
    }
  };

    const onTranscriptionDataReceived = (data) => {
        textToTranslatehandler(data);
    };

    return (
        <>
            <Microphone micClickhandler={micClickhandler} isRecording={recording} />
        </>
    );
};

export default RecorderContainer;
