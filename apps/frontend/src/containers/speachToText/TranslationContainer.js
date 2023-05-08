import React, { useState } from 'react';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';
import { ComprehendClient, DetectDominantLanguageCommand } from '@aws-sdk/client-comprehend';

const TranslationContainer = ({ textToTranslate, textTranslatedHandler, languageTarget }) => {
    const [textTranslated, setTextTranslated] = useState('');

    const translateTextToLanguage = async (text, targetLanguage) => {
        try {
            const sourceLanguage = await detectLanguageOfText(text);
            return await translateTextFromLanguageToLanguage(text, sourceLanguage, targetLanguage);
        } catch (err) {
            console.error(err);
        }
    };

    const detectLanguageOfText = async (text) => {
        const comprehendClient = createComprehendClient();
        try {
            const data = await comprehendClient.send(
                new DetectDominantLanguageCommand({ Text: text })
            );
            return data.Languages[0].LanguageCode;
        } catch (err) {
            console.error(err);
        }
    };

    const createComprehendClient = () => {
        return new ComprehendClient({
            region: 'eu-west-1',
            credentials: fromCognitoIdentityPool({
                client: new CognitoIdentityClient({ region: 'eu-west-1' }),
                identityPoolId: 'eu-west-1:3608148b-3dee-4d48-9b28-0bf1e6332bc8',
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
        try {
            const data = await translateClient.send(new TranslateTextCommand(translateParams));
            setTextTranslated(data.TranslatedText);
            textTranslatedHandler(data.TranslatedText);
            return data.TranslatedText;
        } catch (err) {
            console.error(err);
        }
    };

    const createTranslateClient = () => {
        return new TranslateClient({
            region: 'eu-west-1',
            credentials: fromCognitoIdentityPool({
                client: new CognitoIdentityClient({ region: 'eu-west-1' }),
                identityPoolId: 'eu-west-1:3608148b-3dee-4d48-9b28-0bf1e6332bc8',
            }),
        });
    };

    const translateHandler = () => {
        translateTextToLanguage(textToTranslate, languageTarget);
    };

    return (
        <>
            <button onClick={translateHandler}>Translate</button>
            <textarea value={textTranslated} readOnly />
        </>
    );
};

export default TranslationContainer;
