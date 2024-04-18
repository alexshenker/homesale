import "server-only";

export const s3BucketName = process.env.WASABI_BUCKET_NAME;

//Dynamic
export const $S3filename = "filename";

//S3 presets
export const protocol = "https";
export const cloud = "s3";
export const region = "us-east-1";
export const cloudDomain = "wasabisys.com";
export const endpoint = `${protocol}://${cloud}.${region}.${cloudDomain}`;

export const bucketPath = `${endpoint}/${s3BucketName}`;

const normalizeKey = (keyName: string): string => {
    return keyName.replace(/ /g, "_").replace(/,/g, "");
};

const key = (...args: string[]): string => {
    return normalizeKey(`${args.join("/")}`);
};

/**
 * the paths created in 'bucketMap' are used to generate keys that are provided to PutObjectCommandInput when uploading to wasabi.
 * The keys are not urls, therefore, in order to return the actual src url of an uploaded document, we prepend the complete bucket endpoint and return the full url.
 */
export const bucketUrlPath = (key: string): string => {
    return `${bucketPath}/${key}`;
};

export const normalizeFileName = (fileName: string): string => {
    return fileName
        .replace(/ /g, "-")
        .replace(/[<>:"/\\|?*,%$&!@#]/g, "")
        .replace("--", "-");
};

/** The complete directory structure in wasabi */
const bucketMap = {};

export default bucketMap;
