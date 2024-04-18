import "server-only";
import { NextResponse } from "next/server";

const statusCodes = [200, 400, 401, 403, 404, 422, 500] as const;

type StatusCode = (typeof statusCodes)[number];

export const statusMessage: Record<StatusCode, string> = {
    200: "Success",
    400: "Invalid Request",
    401: "Not Authenticated",
    403: "Not Allowed",
    404: "Not Found",
    422: "Invalid Request Body",
    500: "Server Error",
};

const resStatus = (
    num: StatusCode,
    message?: string,
): void | NextResponse<unknown> => {
    return new NextResponse(
        JSON.stringify({
            message: message ?? statusMessage[num],
        }),
        { status: num, headers: { "content-type": "application/json" } },
    );
};

export default resStatus;
