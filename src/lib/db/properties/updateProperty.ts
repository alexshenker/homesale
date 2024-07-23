import prismaClient from "@/lib/db";
import { PropertyUpdateInput } from "@/lib/requests/properties/updateProperty";
import { PropertyId } from "@/opaqueIdTypes";
import { z } from "zod";

const updateProperty = async (body: PropertyUpdateInput) => {
    body.property.HOA_monthly_fee
    return await prismaClient.property.update({
        where: {
            id: body.propertyId,
        },
        data: {
            ...body.property,
        },
        select: {
            id: true,
        },
    });
};

type UpdatePropertyResUntyped = Awaited<ReturnType<typeof updateProperty>>;

export const UpdatePropertyRes = z
    .custom<UpdatePropertyResUntyped>()
    .transform((p) => {
        return {
            ...p,
            id: p.id as PropertyId,
        };
    });

export type UpdatePropertyRes = z.infer<typeof UpdatePropertyRes>;

export default updateProperty;
