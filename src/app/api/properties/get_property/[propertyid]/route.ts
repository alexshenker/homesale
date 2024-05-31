import getProperty from "@/lib/db/properties/getProperty";
import { PropertyId } from "@/opaqueIdTypes";
import resStatus from "@/utils/private/resStatus";
import { $propertyid } from "@/utils/public/routes";

export async function GET(
    _: Request,
    res: {
        params: { [$propertyid]: PropertyId };
    }
) {
    const property = await getProperty(res.params[$propertyid]);

    if (property === null) {
        return resStatus(404, "Property not found");
    }

    return Response.json(property);
}
