import { PropertyDocumentUploadBody } from "@/lib/requests/properties/uploadPropertyDocuments";
import { bucketFunc } from "@/utils/private/bucketMap";
import createSignedUrl from "@/utils/private/createSignedUrl";
import resStatus from "@/utils/private/resStatus";
import routes, { $propertyid } from "@/utils/public/routes";

export async function PUT(req: Request) {
    const bodyJson = await req.json();

    const bodyObject = JSON.parse(bodyJson);

    const bodyParsed = PropertyDocumentUploadBody.safeParse(bodyObject);

    if (bodyParsed.success === false) {
        return resStatus(400, "Invalid upload body");
    }

    const propertyBucketKey = bucketFunc.propertyBucketPath(
        bodyParsed.data.propertyId
    );

    const signedUrl = await createSignedUrl(propertyBucketKey, "PUT");
}
