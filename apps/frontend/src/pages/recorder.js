import React, { useState, useRef } from "react";
import Microphone from 'ui/MicInput';
import {
  TranscribeStreamingClient,
  StartStreamTranscriptionCommand,
} from "@aws-sdk/client-transcribe-streaming";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import MicrophoneStream from "microphone-stream";
import { Buffer } from "buffer";
import getUserMedia from "get-user-media-promise";

//translate

import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate";
import { ComprehendClient, DetectDominantLanguageCommand } from "@aws-sdk/client-comprehend";

const UploadAudioPage = ({ className }) => {
  const textTranscribe = useRef("");
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");
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
      await startStreaming(language, callback);
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
      region: "eu-west-1",
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: "eu-west-1" }),
        identityPoolId: "eu-west-1:3608148b-3dee-4d48-9b28-0bf1e6332bc8",
      }),
    });
  }

  const createMicrophoneStream = async () => {
    microphoneStream = new MicrophoneStream();
    getUserMedia({
      video: false,
      audio: true,
    })
    .then(function(stream) {
      microphoneStream.setStream(stream);
    }).catch(function(error) {
      console.log(error);
    });
  }

  const startStreaming = async (language, callback) => {
    setRecording(true);
    const command = new StartStreamTranscriptionCommand({
      LanguageCode: language,
      MediaEncoding: "pcm",
      MediaSampleRateHertz: SAMPLE_RATE,
      AudioStream: getAudioStream(),
    });
    const data = await transcribeClient.send(command);
    for await (const event of data.TranscriptResultStream) {
      for (const result of event.TranscriptEvent.Transcript.Results || []) {
        if (result.IsPartial === false) {
          const noOfResults = result.Alternatives[0].Items.length;
          for (let i = 0; i < noOfResults; i++) {
            callback(result.Alternatives[0].Items[i].Content + " ");
          }
        }
      }
    }
  }

  const getAudioStream = async function* () {
    for await (const chunk of microphoneStream) {
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

  const handleMicClick = async () => {
    if(recording == true){
      console.log("recording")
      stopRecording();
    }else{
      try {
        await startRecording("en-US", onTranscriptionDataReceived);
      } catch(error) {
        alert("An error occurred while recording: " + error.message);
        stopRecording();
      }
    }
  };

  const onTranscriptionDataReceived = (data) => {
    textTranscribe.current = textTranscribe.current + " " + data
    setTextToTranslate(textTranscribe.current)
    console.log(textTranscribe.current, textToTranslate)
  }

  const updateTranscribeText = (e) =>{
    setTextToTranslate(e.target.value)
  }

  console.log(textToTranslate, "final")

  ////////////////////Translate

  const translateTextToLanguage = async (text, targetLanguage) => {
    const sourceLanguage = await detectLanguageOfText(text);
    return await translateTextFromLanguageToLanguage(text, sourceLanguage, targetLanguage);
  };
  
  const detectLanguageOfText = async(text) => {
    const comprehendClient = createComprehendClient();
    const data = await comprehendClient.send(
      new DetectDominantLanguageCommand({ Text: text })
    );
    return data.Languages[0].LanguageCode;
  }
  
  const createComprehendClient = () => {
    return new ComprehendClient({
      region: "eu-west-1",
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: "eu-west-1" }),
        identityPoolId: "eu-west-1:3608148b-3dee-4d48-9b28-0bf1e6332bc8",
      }),
    });
  }
  
  const translateTextFromLanguageToLanguage = async (text, sourceLanguage, targetLanguage) => {
    const translateClient = createTranslateClient();
    const translateParams = {
      Text: text,
      SourceLanguageCode: sourceLanguage,
      TargetLanguageCode: targetLanguage,
    };
    const data = await translateClient.send(
      new TranslateTextCommand(translateParams)
    );
    setTranslatedText(data.TranslatedText)
    return data.TranslatedText;
  
  }
  
  const createTranslateClient = () => {
    return new TranslateClient({
      region: "eu-west-1",
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: "eu-west-1" }),
        identityPoolId: "eu-west-1:3608148b-3dee-4d48-9b28-0bf1e6332bc8",
      }),
    });
  }

  const handleTranslate = () =>{
    translateTextToLanguage(textToTranslate, "es")
  }
  
  return (
      <main className={className}>
          <textarea value={textToTranslate} onChange={updateTranscribeText}/>
          <textarea  value={translatedText} readOnly/>
          <button onClick={handleTranslate}>translate</button>
          <Microphone handleMicClick={handleMicClick} />
      </main>
  );
};

export default UploadAudioPage;

export const Head = () => <title>Upload Interview</title>;
