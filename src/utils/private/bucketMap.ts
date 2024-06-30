import { PropertyId } from "@/opaqueIdTypes";
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

const S3properties = "properties";
const S3primary_photo = "primary_photo";
const $S3propertyId = "property_id";

type PhotoNumber = 1 | 2 | 3 | 4 | 5 | 6; //6 is max number
type PhotoFileName = `photo_${PhotoNumber}`;
const $S3photo_file_name = "photo_file_name"; //PhotoNumber

/** The complete directory structure in wasabi */
const bucketMap = {
    [S3properties]: {
        [$S3propertyId]: (propId: PropertyId) => ({
            $: key(S3properties, propId),
            [S3primary_photo]: {
                $: key(S3properties, propId, S3primary_photo),
            },
            [$S3photo_file_name]: (name: PhotoFileName) => ({
                $: key(S3properties, propId, name),
            }),
        }),
    },
};

export const bucketFunc = {
    propertyBucketPath: (propId: PropertyId) =>
        bucketMap[S3properties][$S3propertyId](propId).$,

    primaryPhotoBucketPath: (propId: PropertyId) =>
        bucketMap[S3properties][$S3propertyId](propId)[S3primary_photo].$,

    propertyPhotoBucketPath: (propId: PropertyId, fileName: PhotoFileName) =>
        bucketMap[S3properties][$S3propertyId](propId)[$S3photo_file_name](
            fileName
        ).$,
};

export default bucketMap;
