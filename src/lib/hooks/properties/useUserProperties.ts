import getUsersProperties from "@/lib/requests/properties/getUsersProperties";
import { UserId } from "@/opaqueIdTypes";
import makeHookResponse from "@/utils/public/hooks/makeHookResponse";
import { useQuery } from "@tanstack/react-query";
import { days } from "milliseconds";
import { useMemo } from "react";

export const getUserPropertiesKeyMaker = (userId: UserId) => [
    "users properties",
    userId,
];

const useUserProperties = (userId: UserId | null) => {
    const piece = useQuery({
        queryKey: userId === null ? [] : getUserPropertiesKeyMaker(userId),
        queryFn:
            userId === null
                ? undefined
                : async () => getUsersProperties(userId),
        staleTime: days(7),
        enabled: userId !== null,
    });

    return useMemo(() => {
        return makeHookResponse(piece);
    }, [piece]);
};

export default useUserProperties;
