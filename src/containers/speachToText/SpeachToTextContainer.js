import React, { useState, useRef } from "react";
import RecorderContainer from "./RecorderContainer";
import TranslationContainer from './TranslationContainer'
import "./SpeachContainer.css"

const SpeachToTextContainer = () => {

  const [textToTranslate, setTextToTranslate] = useState("");
  const [textTranslated, setTextTranslated] = useState("");
  const [loading, setLoading] = useState(false);
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

  const loadingHandler = (config) => {
    setLoading(config)
  }


  return (
      <div className="speachContainer">
          {/* <textarea 
            value={textToTranslate} 
            onChange={(e) => updateTranscribeText(e.target.value)}
            /> */}
          <RecorderContainer 
            textToTranslatehandler={textToTranslatehandler} 
            loadingHandler={loadingHandler}
            />
          <TranslationContainer 
            textToTranslate={textToTranslate} 
            languageTarget="es"
            textTranslatedHandler={textTranslatedHandler} 
            loading={loading}
            />
      </div>
  );
};

export default SpeachToTextContainer;

export const Head = () => <title>Upload Interview</title>;
