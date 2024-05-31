import prismaClient from "@/lib/db";
import { PropertyId, UserId } from "@/opaqueIdTypes";
import { z } from "zod";

const getProperty = async (propertyId: PropertyId) => {
    return await prismaClient.property.findUnique({
        where: {
            id: propertyId,
        },
    });
};

type GetPropertyResUntyped = Awaited<ReturnType<typeof getProperty>>;

export const GetPropertyRes = z
    .custom<GetPropertyResUntyped>()
    .transform((p) => {
        if (p === null) {
            return p;
        }

        return {
            ...p,
            id: p.id as PropertyId,
            creatorId: p.creatorId as UserId,
        };
    });

export type GetPropertyRes = z.infer<typeof GetPropertyRes>;

export default getProperty;
