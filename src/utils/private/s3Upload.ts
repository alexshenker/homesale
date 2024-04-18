import "server-only";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { s3BucketName } from "./bucketMap";
import s3 from "./s3";
import { extToContentType, isValidExtension } from "../constants/extensions";

/**
 * Uploads files to specified location in wasabi bucket
 * @param key - Exact location within the bucket of a specific file
 * @param file - File we'd like to upload. contentType is being set in this function.
 */
const s3Upload = async (key: string, file: File) => {
    const [, ext] = file.type.split("/");

    if (ext.length > 400) {
        console.warn(
            `Key for wasabi upload exceeded 400 characters. This is far from the limit, but be aware. Total characters: ${key.length}`
        );
    }

    try {
        const s3Params: PutObjectCommandInput = {
            Bucket: s3BucketName,
            Key: key,
            ACL: "public-read",
            ContentType: extToContentType[ext], //sometimes mxl is not recognized, and File.type falls back on 'octet-stream'
            Body: Buffer.from(await file.arrayBuffer()),
            ContentLength: file.size,
        };

        const command = new PutObjectCommand(s3Params);

        const res = await s3.send(command);

        return res;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to upload document");
    }
};

export default s3Upload;
