import prismaClient from "@/lib/db";
import { UserId } from "@/opaqueIdTypes";
import transformProperty from "@/utils/public/transformProperty";
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
            return transformProperty(p);
        });
    });

export type GetUsersPropertiesRes = z.infer<typeof GetUsersPropertiesRes>;

export default getUsersProperties;
