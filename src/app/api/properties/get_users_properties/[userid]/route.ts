import getUsersProperties from "@/lib/db/properties/getUsersProperties";
import { UserId } from "@/opaqueIdTypes";
import { $userid } from "@/utils/public/routes";

export async function GET(
    _: Request,
    res: {
        params: { [$userid]: UserId };
    }
) {
    const properties = await getUsersProperties(res.params[$userid]);

    return Response.json(properties);
}
