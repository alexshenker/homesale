import createProperty, {
    CreatePropertyRes,
} from "@/lib/db/properties/createProperty";
import updateProperty, {
    UpdatePropertyRes,
} from "@/lib/db/properties/updateProperty";
import { PropertyUpdateInput } from "@/lib/requests/properties/updateProperty";
import resStatus from "@/utils/private/resStatus";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
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
