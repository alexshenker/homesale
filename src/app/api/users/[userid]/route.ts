import updateUser, { UserUpdateInput } from "@/lib/db/user/updateUser";
import { UserId } from "@/opaqueIdTypes";
import isAdminAuthenticated from "@/utils/private/isAdminAuthenticated";
import resStatus from "@/utils/private/resStatus";
import { $userid } from "@/utils/public/routes";

export async function PUT(
    req: Request,
    res: {
        params: { [$userid]: UserId };
    }
) {
    const isAdmin = await isAdminAuthenticated();

    if (isAdmin === false) {
        return resStatus(403);
    }

    const body = await req.json();

    const parsed = UserUpdateInput.safeParse(body);

    if (parsed.success === false) {
        return resStatus(400);
    }

    await updateUser(res.params[$userid], parsed.data);

    return resStatus(200);
}
