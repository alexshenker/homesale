import "server-only";
import { S3Client } from "@aws-sdk/client-s3";
import { AwsCredentialIdentity } from "@smithy/types/dist-types/identity/awsCredentialIdentity";
import { endpoint, region } from "./bucketMap";

//WASABI INFO:
//https://knowledgebase.wasabi.com/hc/en-us/articles/18079343657755-How-do-I-use-AWS-SDK-for-JavaScript-v3-with-Wasabi-

const credentials: AwsCredentialIdentity = {
    accessKeyId: process.env.WASABI_ACCESS_KEY,
    secretAccessKey: process.env.WASABI_SECRET_KEY,
};

const createS3Instance = (): S3Client => {
    return new S3Client({ region, credentials, endpoint });
};

/** Instance of s3 that is ready to use for uploads etc... */
const s3 = createS3Instance();

export default s3;
