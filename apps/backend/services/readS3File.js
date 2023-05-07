const { S3Client,GetObjectCommand } = require("@aws-sdk/client-s3");
const client = new S3Client({ region: "eu-west-2" })

exports.readS3File = async (event) => {

    const command = new GetObjectCommand({
            Bucket: event.bucket,
            Key: event.key
        });

    let data = null
    
    try {
        const response = await client.send(command);
        // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
        data = await response.Body.transformToString();
        // console.log(data.result);
    } catch (err) {
        console.error(err);
    }

    let result = JSON.parse(data)
    result = result.results.transcripts[0].transcript

    return {
        statusCode: 200,
        body: result,
      }
}