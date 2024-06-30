import createProperty, {
    CreatePropertyRes,
} from "@/lib/db/properties/createProperty";
import { PropertyCreateInput } from "@/lib/requests/properties/createProperty";
import resStatus from "@/utils/private/resStatus";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const parsedBody = PropertyCreateInput.safeParse(body);

    if (parsedBody.success === false) {
        return resStatus(400, "Invalid property data");
    }

    try {
        const newProperty = (await createProperty(
            parsedBody.data
        )) as CreatePropertyRes;

        return Response.json(newProperty);
    } catch (e) {
        console.error("Failed to create property:", e);

        return resStatus(500, "Failed to create property");
    }
}
