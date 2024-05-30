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

    const usCountryCode = "us";
    const maxResults = 7; //Max is 10

    /**
     * Permanent - indicates were storing these (We are not)
     * Autocomplete - doesn't only return full matches, tries to autocomplete
     */
    try {
        const results = await fetch(
            `https://api.mapbox.com/search/geocode/v6/forward?address_line1=${encodedQuery}&country=${usCountryCode}&limit=${maxResults}&autocomplete=true&permanent=false&access_token=${process.env.MAPBOX_TOKEN}`
        );

        const parsedResults = await results.json();

        return Response.json(parsedResults);
    } catch (e) {
        console.error("Failed to get results:", e);
        return resStatus(500, "Failed to get results");
    }
}
