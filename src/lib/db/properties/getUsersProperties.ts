import prismaClient from "@/lib/db";
import { PropertyId, UserId } from "@/opaqueIdTypes";
import { JSONString } from "@/utils/public/toJSONString";
import { z } from "zod";

const getUsersProperties = async (userId: UserId) => {
    return await prismaClient.property.findMany({
        where: {
            creatorId: userId,
        },
    });
};

type GetUsersPropertiesResUntyped = Awaited<
    ReturnType<typeof getUsersProperties>
>;

export const GetUsersPropertiesRes = z
    .custom<GetUsersPropertiesResUntyped>()
    .transform((properties) => {
        return properties.map((p) => {
            return {
                ...p,
                id: p.id as PropertyId,
                creatorId: p.creatorId as UserId,
                description: p.description as JSONString | null,
            };
        });
    });

export type GetPropertyRes = z.infer<typeof GetUsersPropertiesRes>;

export default getUsersProperties;
