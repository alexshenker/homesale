import "server-only";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3BucketName } from "./bucketMap";
import { minutes } from "milliseconds";
import s3 from "./s3";
import getWasabiKeyFromUrl from "./getWasabiKeyFromSrc";

const createSignedUrl = async (urlToChange: string): Promise<string> => {
    const key = getWasabiKeyFromUrl(urlToChange);

    const command = new GetObjectCommand({ Bucket: s3BucketName, Key: key });

    const signed = await getSignedUrl(s3, command, {
        expiresIn: minutes(10),
    });

    return signed;
};

export default createSignedUrl;
