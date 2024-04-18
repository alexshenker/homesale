import "server-only";
import { s3BucketName } from "./bucketMap";

/**
 * @returns - The Key that can be used to upload files to the location in wasabi that is extracted from the provided src url
 * @param src - The complete url of a file stored in wasabi
 */
const getWasabiKeyFromSrc = (src: string) => {
    const url = new URL(src);

    let key = url.pathname.replace(s3BucketName, "").replace("//", "/");

    if (key.startsWith("/")) {
        key = key.substring(1);
    }

    return key;
};

export default getWasabiKeyFromSrc;
