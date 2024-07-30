import { PropertyId } from "@/opaqueIdTypes";
import handleParseError from "@/utils/public/handleParseError";
import routes, {
    $propertyid,
    absoluteUrl,
    api,
    properties,
    unpublish,
} from "@/utils/public/routes";
import { z } from "zod";

const Response = z.object({
    propertyId: PropertyId,
});

type Response = z.infer<typeof Response>;

const unpublishProperty = async (propertyId: PropertyId): Promise<Response> => {
    const res = await fetch(
        absoluteUrl(
            routes[api][properties][unpublish][$propertyid](propertyId).$
        )
    );

    if (!res.ok) {
        throw new Error(
            `[${unpublishProperty.name}]: Failed to unpublish property`
        );
    }

    const data = await res.json();

    const parsedData = Response.safeParse(data);

    if (parsedData.success) {
        return parsedData.data;
    } else {
        return handleParseError(unpublishProperty.name, parsedData);
    }
};

export default unpublishProperty;
