import "server-only";
import { getAuthSession } from "./authOptions";

const isAdminAuthenticated = async () => {
    const auth = await getAuthSession();

    if (
        auth === null ||
        auth.user === undefined ||
        auth.user.id === null ||
        auth.user.role !== "admin"
    ) {
        return false;
    }

    return true;
};

export default isAdminAuthenticated;
