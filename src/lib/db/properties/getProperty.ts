import prismaClient from "@/lib/db";
import { PropertyId } from "@/opaqueIdTypes";
import transformProperty from "@/utils/public/transformProperty";
import { z } from "zod";

const getProperty = async (propertyId: PropertyId) => {
    return await prismaClient.property.findUnique({
        where: {
            id: propertyId,
        },
    });
};

export type GetPropertyResUntyped = Awaited<ReturnType<typeof getProperty>>;

export const GetPropertyRes = z
    .custom<GetPropertyResUntyped>()
    .transform((p) => {
        if (p === null) {
            return p;
        }

        return transformProperty(p);
    });

export type GetPropertyRes = z.infer<typeof GetPropertyRes>;

export default getProperty;
