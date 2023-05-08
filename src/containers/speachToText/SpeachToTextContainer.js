import React, { useState, useRef } from "react";
import RecorderContainer from "./RecorderContainer";
import TranslationContainer from './TranslationContainer'

const SpeachToTextContainer = () => {

  const [textToTranslate, setTextToTranslate] = useState("");
  const [textTranslated, setTextTranslated] = useState("");
  const textTranscribe = useRef("");
  
  const textToTranslatehandler = (data) =>{
    textTranscribe.current = textTranscribe.current + " " + data
    updateTranscribeText(textTranscribe.current)
    console.log(textTranscribe.current, textToTranslate)
  }

  const updateTranscribeText = (text) =>{
    setTextToTranslate(text)
  }

  const textTranslatedHandler = (data) => {
    setTextTranslated(data)
  }


  return (
      <div>
          {/* <textarea 
            value={textToTranslate} 
            onChange={(e) => updateTranscribeText(e.target.value)}
            /> */}
          <RecorderContainer 
            textToTranslatehandler={textToTranslatehandler} 
            />
          <TranslationContainer 
            textToTranslate={textToTranslate} 
            languageTarget="es"
            textTranslatedHandler={textTranslatedHandler} 
            />
      </div>
  );
};

export default SpeachToTextContainer;

export const Head = () => <title>Upload Interview</title>;
