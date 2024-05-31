import getProperty from "@/lib/db/properties/getProperty";
import { PropertyId } from "@/opaqueIdTypes";
import makeHookResponse from "@/utils/public/hooks/makeHookResponse";
import { useQuery } from "@tanstack/react-query";
import { days } from "milliseconds";
import { useMemo } from "react";

export const getPropertyKeyMaker = (propertyId: PropertyId) => [propertyId];

const useProperty = (propertyId: PropertyId) => {
    const piece = useQuery({
        queryKey: getPropertyKeyMaker(propertyId),
        queryFn: async () => getProperty(propertyId),
        staleTime: days(7),
    });

    return useMemo(() => {
        return makeHookResponse(piece);
    }, [piece]);
};

export default useProperty;
