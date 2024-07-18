import { PropertyId } from "@/opaqueIdTypes";
import { PropertyDocumentName } from "@/utils/private/bucketMap";
import handleParseError from "@/utils/public/handleParseError";
import routes, {
    absoluteUrl,
    api,
    get_signed_urls,
    upload_property_documents,
} from "@/utils/public/routes";
import typedKeys from "@/utils/public/typedKeys";
import { z } from "zod";

type FileObject = {
    [key in PropertyDocumentName]?: File;
};

export type UploadPropertyDocumentBody = {
    propertyId: PropertyId;
    files: FileObject;
};

export const UploadPropertyDocumentBody =
    z.custom<UploadPropertyDocumentBody>();

export type SignedUrlBody = {
    propertyId: PropertyId;
    fileName: PropertyDocumentName;
};

export const SignedUrlBody = z.custom<SignedUrlBody>();

const SignedUrlRes = z.string().url();

const uploadPropertyDocuments = async (body: UploadPropertyDocumentBody) => {
    const fileNames = typedKeys(body.files);

    if (fileNames.length === 0) {
        throw new Error(
            `[${uploadPropertyDocuments.name}]: No files were provided`
        );
    }

    const promises = fileNames.map(async (fileName) => {
        const signedUrlBody: SignedUrlBody = {
            propertyId: body.propertyId,
            fileName: fileName,
        };

        const signedUrl = await fetch(
            absoluteUrl(
                routes[api][get_signed_urls][upload_property_documents].$
            ),
            { method: "PUT", body: JSON.stringify(signedUrlBody) }
        );

        const parsedUrl = SignedUrlRes.safeParse(await signedUrl.json());

        if (parsedUrl.success === false) {
            return handleParseError(uploadPropertyDocuments, parsedUrl);
        }

        const file = body.files[fileName];

        if (file === undefined) {
            throw new Error("File does not exist");
        }

        //We get a signed URL in order to upload directly to wasabi from the browser to avoid
        //file size limits of doing it via the server
        try {
            await fetch(parsedUrl.data, {
                method: "PUT",
                headers: {
                    "Content-Type": file.type,
                },
                body: file,
            });
        } catch {
            throw new Error(
                `Failed to upload document with the name "${fileName}"`
            );
        }
    });

    return await Promise.all(promises);
};

export default uploadPropertyDocuments;
