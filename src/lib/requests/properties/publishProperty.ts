import { PropertyId } from "@/opaqueIdTypes";
import handleParseError from "@/utils/public/handleParseError";
import routes, {
    $propertyid,
    absoluteUrl,
    api,
    properties,
    publish,
} from "@/utils/public/routes";
import { z } from "zod";

const Response = z.object({
    propertyId: PropertyId,
});

type Response = z.infer<typeof Response>;

const publishProperty = async (propertyId: PropertyId): Promise<Response> => {
    const res = await fetch(
        absoluteUrl(routes[api][properties][publish][$propertyid](propertyId).$)
    );

    if (!res.ok) {
        throw new Error(
            `[${publishProperty.name}]: Failed to publish property`
        );
    }

    const data = await res.json();

    const parsedData = Response.safeParse(data);

    if (parsedData.success) {
        return parsedData.data;
    } else {
        return handleParseError(publishProperty.name, parsedData);
    }
};

export default publishProperty;
