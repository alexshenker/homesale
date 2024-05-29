import routes, {
    absoluteUrl,
    address_search,
    api,
} from "@/utils/public/routes";
import z from "zod";

const NominatimAddress = z.object({
    country: z.string(),
    county: z.string(),
    borough: z.string().optional(),
    city: z.string().optional(),
    house_number: z
        .string()
        .refine((v) => /^\d+$/.test(v), {
            message: "house number must be an integer string",
        })
        .optional(),
    postcode: z
        .string()
        .length(5)
        .refine((v) => /^\d+$/.test(v), {
            message: "house number must be an integer string",
        })
        .optional(),
    road: z.string().optional(),
    state: z.string(),
});

const NominatimPlace = z.object({
    address: NominatimAddress,
    type: z.string(), //house, //residential, ...etc
    place_id: z.number().int(),
});

const NominatimResponse = NominatimPlace.array();

export type NominatimResponse = z.infer<typeof NominatimResponse>;

const search_address = async (
    searchQuery: string
): Promise<NominatimResponse> => {
    const res = await fetch(
        absoluteUrl(routes[api][address_search](searchQuery).$)
    );

    if (!res.ok) {
        throw new Error(`[${search_address}]: Failed to search address`);
    }

    const data = await res.json();

    const parsed = NominatimResponse.safeParse(data);

    if (parsed.success) {
        return parsed.data;
    } else {
        throw new Error(
            `[${search_address}]: Failed to parse: ${JSON.stringify(data.error.issues)}`
        );
    }
};

export default search_address;
