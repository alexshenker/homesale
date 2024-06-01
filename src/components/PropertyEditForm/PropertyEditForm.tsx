"use client";

import { useState } from "react";
import ListingType, {
    PropertyTypeOption,
    getPropertyTypeOption,
} from "./Subforms/ListingType";
import { GetPropertyRes } from "@/lib/db/properties/getProperty";
import exhaustiveSwitch from "@/utils/public/exhaustiveSwitch";
import PropertyDetails, {
    BathroomOption,
    BedroomOption,
    getBathroomOption,
    getBedroomOption,
} from "./Subforms/PropertyDetails";
import Button from "../ui/button/Button";
import { Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { formProps } from "@/utils/constants/formProps";
import { ListingType as ListingTypeT, PropertyTypes } from "@prisma/client";
import Space from "../ui/Space";

export type SubformTitle = "Listing Type" | "Property Details";

const pageNumbers = [1, 2, 3, 4, 5] as const;
type PageNumber = (typeof pageNumbers)[number];

const maxPageNumber = Math.max(...pageNumbers);

export type PropertyFormPage = {
    page: PageNumber;
    title: SubformTitle;
};

const propertyFormPages: PropertyFormPage[] = [
    { page: 1, title: "Listing Type" },
    { page: 2, title: "Property Details" },
] as const;

interface Props {
    property: NonNullable<GetPropertyRes>;
}

export const listingTypeField = "listingType";
export const squareFeetField = "squareFeet";
export const bedroomsField = "bedrooms";
export const bathroomsField = "bathrooms";
export const propertyTypeField = "propertyType";

interface Form {
    //1
    [listingTypeField]: ListingTypeT | null;
    [propertyTypeField]: PropertyTypeOption | null;

    //2
    [squareFeetField]: `${number}` | null;
    [bedroomsField]: BedroomOption | null;
    [bathroomsField]: BathroomOption | null;
}

const PropertyEditForm = ({ property }: Props): JSX.Element => {
    const { propertyType, listing_type, bedrooms, bathrooms, squareFeet } =
        property;

    const methods = useForm<Form>({
        ...formProps,
        defaultValues: {
            [listingTypeField]: listing_type,
            [propertyTypeField]: getPropertyTypeOption(propertyType),

            [squareFeetField]: squareFeet !== null ? `${squareFeet}` : null,
            [bedroomsField]: getBedroomOption(bedrooms),
            [bathroomsField]: getBathroomOption(bathrooms),
        },
    });

    const [page, setPage] = useState<PropertyFormPage["page"]>(1);

    return (
        <div>
            <div>
                {propertyFormPages.map((p) => {
                    return (
                        <Button key={p.title} onClick={() => setPage(p.page)}>
                            {p.title}
                        </Button>
                    );
                })}
            </div>

            {/* Using visibility allows us to keep users form edits without api call */}

            <Space />

            <FormProvider {...methods}>
                {(() => {
                    switch (page) {
                        case 1: {
                            return <ListingType />;
                        }
                        case 2: {
                            return <PropertyDetails />;
                        }
                        case 3: {
                            return;
                        }
                        case 4: {
                            return;
                        }
                        case 5: {
                            return;
                        }
                        default: {
                            return exhaustiveSwitch(page);
                        }
                    }
                })()}
            </FormProvider>

            <Space />

            <Box display="flex" justifyContent={"space-between"}>
                <Button
                    onClick={() => setPage((page - 1) as PageNumber)}
                    disabled={page === 1}
                >
                    {"< Previous"}
                </Button>

                <Button
                    onClick={() => setPage((page + 1) as PageNumber)}
                    disabled={page === maxPageNumber}
                >
                    {"Next >"}
                </Button>
            </Box>
        </div>
    );
};

export default PropertyEditForm;
