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

export const S3properties = "properties";
export const S3primary_photo = "primary_photo";
export const S3deed = "deed";
export const S3owner_id_front = "owner_id_front";
export const S3owner_id_back = "owner_id_back";
export const S3video = "video";
export const S3HOA_bylaws = "HOA_bylaws";

export const $S3propertyId = "property_id";

export type PhotoNumber = 1 | 2 | 3 | 4 | 5 | 6; //6 is max number
export type S3PhotoFileName = `photo_${PhotoNumber}`;

const $property_document_name = "property_document_name";

export type PropertyDocumentName =
    | typeof S3primary_photo
    | S3PhotoFileName
    | typeof S3owner_id_front
    | typeof S3owner_id_back
    | typeof S3deed
    | typeof S3video
    | typeof S3HOA_bylaws;

/** The complete directory structure in wasabi */
const bucketMap = {
    [S3properties]: {
        [$S3propertyId]: (propId: PropertyId) => ({
            $: key(S3properties, propId),
            [$property_document_name]: (docName: PropertyDocumentName) => {
                return {
                    $: key(S3properties, propId, docName),
                };
            },
        }),
    },
};

export const bucketFunc = {
    propertyBucketPath: (propId: PropertyId) =>
        bucketMap[S3properties][$S3propertyId](propId).$,

    propertyDocPath: (propId: PropertyId, fileName: PropertyDocumentName) => {
        return bucketMap[S3properties][$S3propertyId](propId)[
            $property_document_name
        ](fileName).$;
    },
};

export default bucketMap;
