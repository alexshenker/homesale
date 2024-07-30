import createProperty, {
    CreatePropertyRes,
} from "@/lib/db/properties/createProperty";
import updateProperty, {
    UpdatePropertyRes,
} from "@/lib/db/properties/updateProperty";
import { PropertyUpdateInput } from "@/lib/requests/properties/updateProperty";
import { getAuthSession } from "@/utils/private/authOptions";
import resStatus from "@/utils/private/resStatus";
import { isNil } from "lodash";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
    //@TODO: Need to check if user is actual owner of property
    const auth = await getAuthSession();

    if (isNil(auth?.user)) {
        return resStatus(401);
    }

    const body = await req.json();

    const parsedBody = PropertyUpdateInput.safeParse(body);

    if (parsedBody.success === false) {
        return resStatus(400, "Invalid property data");
    }

    try {
        const updatedProperty = (await updateProperty(
            parsedBody.data
        )) as UpdatePropertyRes;

        return Response.json(updatedProperty);
    } catch (e) {
        console.error("Failed to update property:", e);

        return resStatus(500, "Failed to update property");
    }
}
