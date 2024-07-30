import prismaClient from "@/lib/db";
import { PropertyId } from "@/opaqueIdTypes";
import { getAuthSession } from "@/utils/private/authOptions";
import resStatus from "@/utils/private/resStatus";
import { $propertyid } from "@/utils/public/routes";
import { isNil } from "lodash";

export async function PUT(
    _: Request,
    res: {
        params: { [$propertyid]: PropertyId };
    }
) {
    //@TODO: Need to check if user is actual owner of property
    const auth = await getAuthSession();

    if (isNil(auth?.user)) {
        return resStatus(401);
    }

    try {
        await prismaClient.property.update({
            where: {
                id: res.params[$propertyid],
            },
            data: {
                published: true,
                published_last: new Date(),
            },
        });

        return Response.json({ propertyId: res.params[$propertyid] });
    } catch (e) {
        console.error("Failed to unpublish property", e);

        return resStatus(500, "Failed to unpublish property");
    }
}
