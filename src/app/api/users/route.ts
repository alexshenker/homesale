import getUsers from "@/lib/db/user/getUsers";
import resStatus from "@/utils/private/resStatus";
import isAdminAuthenticated from "@/utils/private/isAdminAuthenticated";

export async function GET() {
  const isAdmin = await isAdminAuthenticated();

  if (isAdmin === false) {
    return resStatus(403);
  }

  const users = await getUsers();

  return Response.json(users);
}
