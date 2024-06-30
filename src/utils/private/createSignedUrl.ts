import "server-only";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3BucketName } from "./bucketMap";
import { minutes } from "milliseconds";
import s3 from "./s3";
import getWasabiKeyFromUrl from "./getWasabiKeyFromSrc";
import exhaustiveSwitch from "../public/exhaustiveSwitch";

export type SignedUrlMethod = "GET" | "PUT";

const createSignedUrl = async (
    urlToChange: string,
    method: SignedUrlMethod,
    expirationInMinutes: number = 10
): Promise<string> => {
    const key = getWasabiKeyFromUrl(urlToChange);

    const command = (() => {
        switch (method) {
            case "GET": {
                return new GetObjectCommand({ Bucket: s3BucketName, Key: key });
            }

            case "PUT": {
                return new PutObjectCommand({
                    Bucket: s3BucketName,
                    Key: key,
                    ACL: "public-read",
                });
            }

            default: {
                return exhaustiveSwitch(method);
            }
        }
    })();

    const signed = await getSignedUrl(s3, command, {
        expiresIn: minutes(expirationInMinutes),
    });

    return signed;
};

export default createSignedUrl;
