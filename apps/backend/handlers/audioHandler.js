const { lambdaInvoke } = require('./lambdaInvoke.js');

exports.audioHandler = async (event) => {
    //readS3text
    try {
        const payload = {
            bucket: 'ada-transcript-out',
            key: 'honza-576.json',
        };
        const bucketParams = {
            FunctionName: 'readS3File',
            InvocationType: 'RequestResponse',
            LogType: 'None',
            Payload: JSON.stringify(payload),
        };
        const responseToTranslate = await lambdaInvoke(bucketParams);
        const textToTranslated = Buffer.from(responseToTranslate.Payload).toString();

        //Text Translation
        const payloadTrans = {
            text: textToTranslated,
        };
        const TranslationFunctionParams = {
            FunctionName: 'textTranslation',
            InvocationType: 'RequestResponse',
            LogType: 'None',
            Payload: JSON.stringify(payloadTrans),
        };

        const TranslationResponde = await lambdaInvoke(TranslationFunctionParams);
        const textTranslated = JSON.parse(Buffer.from(TranslationResponde.Payload).toString());

        return {
            statusCode: 200,
            body: JSON.stringify(textTranslated),
        };
    } catch (err) {
        console.error(err);
    }
};
