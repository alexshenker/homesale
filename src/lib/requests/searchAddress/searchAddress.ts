import handleParseError from "@/utils/public/handleParseError";
import routes, {
    absoluteUrl,
    address_search,
    api,
} from "@/utils/public/routes";
import { States } from "@prisma/client";
import z from "zod";

const featureTypes = [
    "country",
    "region",
    "postcode",
    "district",
    "place",
    "locality",
    "neighborhood",
    "street",
    "address",
] as const;

const FeatureType = z.enum(featureTypes);
type FeatureType = (typeof featureTypes)[number];

export type MapboxPlaceId = string & { isMapboxPlaceId: true };

const MapboxPlaceId = z.custom<MapboxPlaceId>();

const states = [...Object.values(States)] as const;

type State = (typeof states)[number];

const State = z.custom<State>();

const Geometry = z.object({
    /** [Longitude, Latitude] */
    coordinates: z.tuple([z.number(), z.number()]),
    type: z.string(), //Point
});

export type Geometry = z.infer<typeof Geometry>;

const Context = z.object({
    postcode: z.object({
        /** ex: 11214 */
        name: z.string(),
    }),
    locality: z
        .object({
            /** (city) ex: brooklyn */
            name: z.string(),
        })
        .optional(),
    place: z.object({
        /** If locality is unavailable, this is 2nd best"
         * (city / place) ex: brooklyn || New York
         */
        name: z.string(),
    }),
    region: z.object({
        /** (State) ex: New York */
        name: z.string(),

        /** (State-abbrev) ex: NY */
        region_code: State,
    }),
});

const Properties = z.object({
    mapbox_id: MapboxPlaceId, //Same exact string as MapboxPlace.id
    feature_type: FeatureType,
    context: Context,
    /** ex: 228 Johnson avenue */
    name: z.string(),

    /** ex: Brooklyn, New York 11231, United States */
    place_formatted: z.string(),
    full_address: z.string(), //name & place_formatted combined
});

const MapboxPlace = z.object({
    id: MapboxPlaceId, //Same exact string as MapboxPlace.properties.mapbox_id
    properties: Properties,
    type: z.string(), //Feature
    geometry: Geometry,
});

export type MapboxPlace = z.infer<typeof MapboxPlace>;

const MapboxResponse = z.object({
    type: z.string(),
    features: MapboxPlace.array(),
    attribution: z.string(),
});

export type MapboxResponse = z.infer<typeof MapboxResponse>;

const searchAddress = async (searchQuery: string): Promise<MapboxResponse> => {
    const res = await fetch(
        absoluteUrl(routes[api][address_search](searchQuery).$)
    );

    if (!res.ok) {
        throw new Error(`[${searchAddress.name}]: Failed to search address`);
    }

    const data = await res.json();

    const parsed = MapboxResponse.safeParse(data);

    if (parsed.success) {
        return parsed.data;
    } else {
        return handleParseError(searchAddress, parsed);
    }
};

export default searchAddress;
