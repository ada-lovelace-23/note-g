import React, { useState, useRef, useEffect } from 'react';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';
import { ComprehendClient, DetectDominantLanguageCommand, BatchDetectKeyPhrasesCommand } from '@aws-sdk/client-comprehend';
import './TranslationContainer.css';
import loadingImg from '../../images/loading.gif';

const TranslationContainer = ({
    textToTranslate,
    textTranslatedHandler,
    targetLanguage,
    loading,
}) => {
    const [textTranslated, setTextTranslated] = useState('');
    const [keyPhrases, setKeyPhrases] = useState(null);
    const translationSwitch = useRef('');

    if (textToTranslate !== translationSwitch.current) {
        translationSwitch.current = textToTranslate;
    }

    useEffect(() => {
        if (textToTranslate != '') {
            translateTextToLanguage(textToTranslate, targetLanguage);
        }
    }, [translationSwitch.current]);

    const getKeyPhrases = async () => {
        const client = (createComprehendClient());
        const input = { // BatchDetectKeyPhrasesRequest
            TextList: [ // CustomerInputStringList // required
                textTranslated,
            ],
            LanguageCode: "es"
          };
         const command = new BatchDetectKeyPhrasesCommand(input);
        const response = await client.send(command);
        setKeyPhrases(response.ResultList[0].KeyPhrases)

    }

    const translateTextToLanguage = async (text, targetLanguage) => {
        const sourceLanguage = await detectLanguageOfText(text);
        return await translateTextFromLanguageToLanguage(text, sourceLanguage, targetLanguage);
    };

    const detectLanguageOfText = async (text) => {
        const comprehendClient = createComprehendClient();
        const data = await comprehendClient.send(new DetectDominantLanguageCommand({ Text: text }));
        return data.Languages[0].LanguageCode;
    };

    const createComprehendClient = () => {
        return new ComprehendClient({
            region: 'eu-west-1',
            credentials: fromCognitoIdentityPool({
                client: new CognitoIdentityClient({ region: process.env.GATSBY_REGION }),
                identityPoolId: process.env.GATSBY_IDENTITY_POOL_ID,
            }),
        });
    };

    const translateTextFromLanguageToLanguage = async (text, sourceLanguage, targetLanguage) => {
        const translateClient = createTranslateClient();
        const translateParams = {
            Text: text,
            SourceLanguageCode: sourceLanguage,
            TargetLanguageCode: targetLanguage,
        };
        const data = await translateClient.send(new TranslateTextCommand(translateParams));
        setTextTranslated(data.TranslatedText);
        textTranslatedHandler(data.TranslatedText);
        return data.TranslatedText;
    };

    const createTranslateClient = () => {
        return new TranslateClient({
            region: 'eu-west-1',
            credentials: fromCognitoIdentityPool({
                client: new CognitoIdentityClient({ region: process.env.GATSBY_REGION }),
                identityPoolId: process.env.GATSBY_IDENTITY_POOL_ID,
            }),
        });
    };
    return (
        <div className="translationContainer">
            {loading ? (
                <img className="loadingStyle" src={loadingImg} />
            ) : (
                <>
                    <textarea className="translationBox" value={textTranslated} readOnly />
                    {
                        textTranslated != '' && <button onClick={getKeyPhrases}> Get Key Phrases </button> 
                    
                    }
                    {
                        keyPhrases &&
                            keyPhrases.map(({Text, BeginOffset}) => {
                                return(
                                    <div key={BeginOffset}>{Text}</div>
                                )
                            })
                    }
                </>
            )}
        </div>
    );
};

export default TranslationContainer;
