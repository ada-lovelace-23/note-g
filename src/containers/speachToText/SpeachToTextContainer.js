import React, { useState, useRef } from 'react';
import RecorderContainer from './RecorderContainer';
import TranslationContainer from './TranslationContainer';
import './SpeachContainer.css';

const SpeachToTextContainer = () => {
    const [textToTranslate, setTextToTranslate] = useState('');
    // const [textTranslated, setTextTranslated] = useState('');
    const textTranscribe = useRef('');
    const [volunteerLanguage, setVolunteerLanguage] = useState('es-US');
    const [userLanguage, setUserLanguage] = useState('en-US');

    const textToTranslatehandler = (data) => {
        textTranscribe.current = textTranscribe.current + ' ' + data;
        updateTranscribeText(textTranscribe.current);
        console.log(textTranscribe.current, textToTranslate);
    };

    const updateTranscribeText = (text) => {
        setTextToTranslate(text);
    };

    // const textTranslatedHandler = (data) => {
    //     setTextTranslated(data);
    // };

    const volunteerLanguageHandler = (language) => {
        if (language?.code) {
            setVolunteerLanguage(language.code);
        } else {
            setVolunteerLanguage('en-US');
        }
    };

    const userLanguageHandler = (language) => {
        if (language?.code) {
            setUserLanguage(language.code);
        } else {
            setUserLanguage('en-US');
        }
    };

    return (
        <div className="speachContainer">
            <TranslationContainer
                targetLanguage={volunteerLanguage}
                textToTranslate={textToTranslate}
                // textTranslatedHandler={textTranslatedHandler}
            />
            <RecorderContainer
                volunteer={{
                    language: volunteerLanguage,
                    languageHandler: volunteerLanguageHandler,
                }}
                user={{ language: userLanguage, languageHandler: userLanguageHandler }}
                textToTranslatehandler={textToTranslatehandler}
            />
        </div>
    );
};

export default SpeachToTextContainer;

export const Head = () => <title>Upload Interview</title>;
