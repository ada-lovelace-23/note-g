const { lambdaInvoke } = require("./lambdaInvoke.js");

exports.audioHandler = async (event) => {
    
    //readS3text
    const bucketParams = {
        FunctionName: 'readS3Object',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: '',
    }
    const responseToTranslate = await lambdaInvoke(bucketParams)
    const textToTranslated = JSON.parse(Buffer.from(responseToTranslate.Payload).toString())

    //Text Translation

    const TranslationFunctionParams = {
        FunctionName: 'textTranslation',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: '',
    }

    const TranslationResponde = await lambdaInvoke(TranslationFunctionParams)
    const textTranslated = JSON.parse(Buffer.from(TranslationResponde.Payload).toString())
    
    return {
        statusCode: 200,
        body: textToTranslated
    }
}