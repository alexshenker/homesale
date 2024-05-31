import { z } from "zod";

export type UserId = string & { isUserId: true };
export const UserId = z.custom<UserId>();

export type PropertyId = string & { isPropertyId: true };
export const PropertyId = z.custom<PropertyId>();
