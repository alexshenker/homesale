import "server-only";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3BucketName } from "./bucketMap";
import s3 from "./s3";

/**
 * Uploads files to specified location in wasabi bucket
 * @param key - Exact location within the bucket of a specific file
 */
const s3Delete = async (key: string) => {
    const deleteCommand = new DeleteObjectCommand({
        Bucket: s3BucketName,
        Key: key,
    });

    try {
        await s3.send(deleteCommand);
    } catch {
        throw new Error("Failed to delete object from Wasabi");
    }
};

export default s3Delete;
