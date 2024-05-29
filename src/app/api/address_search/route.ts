import resStatus from "@/utils/private/resStatus";
import { Q_address_search_freeform_query } from "@/utils/public/routes";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get(Q_address_search_freeform_query);

    if (query === null) {
        return resStatus(400, "missing search query");
    }

    if (query.length < 2) {
        return resStatus(400, "incomplete search query");
    }

    const encodedQuery = encodeURIComponent(query);

    const format = "json";
    const usCountryCode = "us";
    const maxResults = 10;

    try {
        const results = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=${format}&countrycodes=${usCountryCode}&limit=${maxResults}&addressdetails=1`,
            {
                headers: {
                    Referer: "http://localhost",
                    "User-Agent": "myhomeapp (Chrome)",
                },
            }
        );

        const parsedResults = await results.json();

        return Response.json(parsedResults);
    } catch (e) {
        console.error("Failed to get results:", e);
        return resStatus(500, "Failed to get results");
    }
}
