import { GetPropertyRes } from "@/lib/db/properties/getProperty";
import { PropertyId } from "@/opaqueIdTypes";
import routes, {
    $propertyid,
    absoluteUrl,
    api,
    get_property,
    properties,
} from "@/utils/public/routes";

const getProperty = async (propertyId: PropertyId) => {
    const res = await fetch(
        absoluteUrl(
            routes[api][properties][get_property][$propertyid](propertyId).$
        )
    );

    if (!res.ok) {
        throw new Error(`[${getProperty}]: Failed to get property`);
    }

    const data = await res.json();

    const parsedData = GetPropertyRes.safeParse(data);

    if (parsedData.success) {
        return parsedData.data;
    } else {
        throw new Error(
            `[${getProperty}]: Failed to parse: ${JSON.stringify(parsedData.error.issues)}`
        );
    }
};

export default getProperty;
