import getUser from "@/lib/db/user/getUser";
import { getAuthSession } from "../../auth/[...nextauth]/route";

export async function GET() {
    const auth = await getAuthSession();

    if (auth === null || auth.user === undefined || auth.user.id === null) {
        return Response.json(null);
    }

    const user = await getUser(auth.user.id);

    return Response.json(user);
}
