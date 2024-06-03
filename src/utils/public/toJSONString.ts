import { z } from "zod";

//upload, and parsed to string after
export type JSONString = string & { isJSONString: true };
export const JSONString = z.custom<JSONString>();

/**
 * Converts a text-area value to a JSON string which preserves newlines.
 * This is to enforce text-area input to be converted to json prior to
 * upload
 */
export default function toJSONString(str: string): JSONString {
    return JSON.stringify(str) as JSONString;
}
