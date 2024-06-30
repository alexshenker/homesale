import "server-only";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3BucketName } from "./bucketMap";
import { minutes } from "milliseconds";
import s3 from "./s3";
import getWasabiKeyFromUrl from "./getWasabiKeyFromSrc";
import exhaustiveSwitch from "../public/exhaustiveSwitch";
import { z } from "zod";

export type SignedUrlMethod = "GET" | "PUT";

const urlString = z.string().url();

const isUrl = (st: string): boolean => {
    return urlString.safeParse(st).success;
};

const createSignedUrl = async (
    urlOrKey: string,
    method: SignedUrlMethod,
    expirationInMinutes: number = 10
): Promise<string> => {
    const key = isUrl(urlOrKey) ? getWasabiKeyFromUrl(urlOrKey) : urlOrKey;

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
