import { PropertyId } from "@/opaqueIdTypes";
import routes, {
    absoluteUrl,
    api,
    properties,
    upload_property_documents,
} from "@/utils/public/routes";
import { z } from "zod";

export type PropertyDocumentUploadBody = {
    propertyId: PropertyId;
};

export const PropertyDocumentUploadBody =
    z.custom<PropertyDocumentUploadBody>();

const uploadPropertyDocuments = async (body: {
    propertyId: PropertyDocumentUploadBody;
}) => {
    const res = await fetch(
        absoluteUrl(routes[api][properties][upload_property_documents].$),
        { method: "PUT", body: JSON.stringify(body) }
    );
};

export default uploadPropertyDocuments;
