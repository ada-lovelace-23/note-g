const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

exports.lambdaInvoke = async (params) => {

    const client = new LambdaClient({ region: "eu-west-2" });
    const command = new InvokeCommand(params);
    let response = null

    try {
        response = await client.send(command);
    } catch (error) {
        throw new Error('Failed to get response from lambda function')
    }

    return response
}