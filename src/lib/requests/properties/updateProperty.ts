import { CreatePropertyRes } from "@/lib/db/properties/createProperty";
import { PropertyId, UserId } from "@/opaqueIdTypes";
import routes, {
    absoluteUrl,
    api,
    create_property,
    properties,
    update_property,
} from "@/utils/public/routes";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { MapboxPlaceId } from "../searchAddress/searchAddress";
import { JSONString } from "@/utils/public/toJSONString";
import handleParseError from "@/utils/public/handleParseError";
import { UpdatePropertyRes } from "@/lib/db/properties/updateProperty";

const PrismaPropertyUpdateInput = z
    .custom<
        OmitMod<
            Prisma.PropertyUpdateInput,
            | "creator"
            | "Deed_src"
            | "HOA_bylaws_document_src"
            | "Owner_ID_back_src"
            | "Owner_ID_front_src"
            | "photos"
            | "primaryPhoto"
            | "createdAt"
            | "id"
        >
    >()
    .transform((p) => ({
        ...p,
        ...(p.mapboxPlaceId !== undefined && {
            mapboxPlaceId: p.mapboxPlaceId as MapboxPlaceId,
        }),
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

export const PropertyUpdateInput = z.object({
    propertyId: PropertyId,
    property: PrismaPropertyUpdateInput,
});

export type PropertyUpdateInput = z.infer<typeof PropertyUpdateInput>;

const updateProperty = async (body: PropertyUpdateInput) => {
    const res = await fetch(
        absoluteUrl(routes[api][properties][update_property].$),
        {
            method: "PUT",
            body: JSON.stringify(body),
        }
    );

    if (!res.ok) {
        throw new Error(`[${updateProperty.name}]: Failed to update property`);
    }

    const data = await res.json();

    const parsedData = UpdatePropertyRes.safeParse(data);

    if (parsedData.success) {
        return parsedData.data;
    } else {
        return handleParseError(updateProperty, parsedData);
    }
};

export default updateProperty;
