const { TranslateClient,TranslateTextCommand } = require("@aws-sdk/client-translate");
const client = new TranslateClient({ region: "eu-west-2" })

exports.textTranslation = async (event) => {

    const input = {
        Text: event.text, // required
        SourceLanguageCode: "en", // required
        TargetLanguageCode: "es", // required
    };

    const command = new TranslateTextCommand(input);


    let data = null
    
    try {
        data = await client.send(command);
    } catch (err) {
        console.error(err);
    }


    return {
        statusCode: 200,
        body: data.TranslatedText
      }
}