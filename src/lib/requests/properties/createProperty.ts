import { CreatePropertyRes } from "@/lib/db/properties/createProperty";
import { UserId } from "@/opaqueIdTypes";
import routes, {
    absoluteUrl,
    api,
    create_property,
    properties,
} from "@/utils/public/routes";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { MapboxPlaceId } from "../searchAddress/searchAddress";
import { JSONString } from "@/utils/public/toJSONString";

const PrismaPropertyCreateInput = z
    .custom<OmitMod<Prisma.PropertyCreateInput, "creator">>()
    .transform((p) => ({
        ...p,
        mapboxPlaceId: p.mapboxPlaceId as MapboxPlaceId,
        ...(p.description !== undefined && {
            description: p.description as JSONString | null,
        }),
        ...(p.otherAmenities !== undefined && {
            otherAmenities: p.otherAmenities as JSONString | null,
        }),
        ...(p.otherUtilities !== undefined && {
            otherUtilities: p.otherUtilities as JSONString | null,
        }),
    }));

export const PropertyCreateInput = z.object({
    creatorId: UserId,
    property: PrismaPropertyCreateInput,
});

export type PropertyCreateInput = z.infer<typeof PropertyCreateInput>;

const createProperty = async (body: PropertyCreateInput) => {
    const res = await fetch(
        absoluteUrl(routes[api][properties][create_property].$),
        {
            method: "POST",
            body: JSON.stringify(body),
        }
    );

    if (!res.ok) {
        throw new Error(`[${createProperty}]: Failed to create property`);
    }

    const data = await res.json();

    const parsedData = CreatePropertyRes.safeParse(data);

    if (parsedData.success) {
        return parsedData.data;
    } else {
        throw new Error(
            `[${createProperty}]: Failed to parse: ${JSON.stringify(parsedData.error.issues)}`
        );
    }
};

export default createProperty;
