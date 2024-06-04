import {
    GetPropertyRes,
    GetPropertyResUntyped,
} from "@/lib/db/properties/getProperty";
import { PropertyId, UserId } from "@/opaqueIdTypes";
import { JSONString } from "./toJSONString";

const transformProperty = (p: NonNullable<GetPropertyResUntyped>) => {
    return {
        ...p,
        id: p.id as PropertyId,
        creatorId: p.creatorId as UserId,
        description: p.description as JSONString | null,
        otherAmenities: p.otherAmenities as JSONString | null,
        otherUtilities: p.otherUtilities as JSONString | null,
    };
};

export default transformProperty;
