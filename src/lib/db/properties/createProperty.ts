import prismaClient from "@/lib/db";
import { PropertyCreateInput } from "@/lib/requests/properties/createProperty";
import { PropertyId } from "@/opaqueIdTypes";
import { z } from "zod";

const createProperty = async (body: PropertyCreateInput) => {
    return await prismaClient.property.create({
        data: {
            ...body.property,
            Owner: {
                connect: {
                    id: body.ownerId,
                },
            },
        },
        select: {
            id: true,
        },
    });
};

type CreatePropertyResUntyped = Awaited<ReturnType<typeof createProperty>>;

export const CreatePropertyRes = z
    .custom<CreatePropertyResUntyped>()
    .transform((p) => {
        return {
            ...p,
            id: p.id as PropertyId,
        };
    });

export type CreatePropertysRes = z.infer<typeof CreatePropertyRes>;

export default createProperty;
