const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

exports.audioHandler = async (event) => {
    console.log(event);

    // a client can be shared by different commands.
    const client = new LambdaClient({ region: "eu-west-2" });

    const params = {
        FunctionName: 'transpileAudio',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: '{}',
    };

    const command = new InvokeCommand(params);

    let data = null

    try {
        data = await client.send(command);
    } catch (error) {
        throw new Error('Failed to get response from lambda function')
    }

    const response = JSON.parse(Buffer.from(data.Payload).toString());

    return {
        statusCode: 200,
        body: JSON.stringify(response),
    }
}