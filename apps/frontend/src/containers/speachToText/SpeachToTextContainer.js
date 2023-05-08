import React, { useState, useRef } from "react";
import RecorderContainer from "./RecorderContainer";
import TranslationContainer from './TranslationContainer'

const SpeachToTextContainer = () => {

  const [textToTranslate, setTextToTranslate] = useState("");
  const [textTranslated, setTextTranslated] = useState("");
  const textTranscribe = useRef("");
  
  const handlerTextToTranslate = (data) =>{
    textTranscribe.current = textTranscribe.current + " " + data
    updateTranscribeText(textTranscribe.current)
    console.log(textTranscribe.current, textToTranslate)
  }

  const updateTranscribeText = (text) =>{
    setTextToTranslate(text)
  }

  const handleTextTranslated = (data) => {
    setTextTranslated(data)
  }


  return (
      <>
          <textarea 
            value={textToTranslate} 
            onChange={(e) => updateTranscribeText(e.target.value)}
            />
          <RecorderContainer 
            handleTextToTranslate={handlerTextToTranslate} 
            />
          <TranslationContainer 
            textToTranslate={textToTranslate} 
            languageTarget="es"
            handleTextTranslated={handleTextTranslated} 
            />
      </>
  );
};

export default SpeachToTextContainer;

export const Head = () => <title>Upload Interview</title>;
