const lambda = require("aws-sdk/clients/lambda");

exports.uploadAudio = async (event) => {
    console.log(event);

    const name = event.queryStringParameters.name;

    const item = {
        id: name,
        name: name,
        date: Date.now()
    }

    const params = {
        FunctionName: 'transpileAudio',
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: '{}',
      };

    const response = await lambda.invoke(params).promise();
    if(response.StatusCode !== 200){
        throw new Error('Failed to get response from lambda function')
    }

    console.log(response)

    return {
        statusCode: 200,
        body: JSON.stringify(item),
    }
}
