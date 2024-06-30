import { GetUsersPropertiesRes } from "@/lib/db/properties/getUsersProperties";
import { UserId } from "@/opaqueIdTypes";
import handleParseError from "@/utils/public/handleParseError";
import routes, {
    $userid,
    absoluteUrl,
    api,
    get_users_properties,
    properties,
} from "@/utils/public/routes";

const getUsersProperties = async (userId: UserId) => {
    const res = await fetch(
        absoluteUrl(
            routes[api][properties][get_users_properties][$userid](userId).$
        )
    );

    if (!res.ok) {
        throw new Error(
            `[${getUsersProperties.name}]: Failed to get properties`
        );
    }

    const data = await res.json();

    const parsedData = GetUsersPropertiesRes.safeParse(data);

    if (parsedData.success) {
        return parsedData.data;
    } else {
        return handleParseError(getUsersProperties.name, parsedData);
    }
};

export default getUsersProperties;
