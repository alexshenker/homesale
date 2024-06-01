"use client";

import { useMemo, useState } from "react";
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
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { formProps } from "@/utils/constants/formProps";
import { ListingType as ListingTypeT } from "@prisma/client";
import Space from "../ui/Space";
import PriceDetails from "./Subforms/PriceDetails";
import useToast from "../ui/Toast/useToast";

export type SubformTitle = "Listing Type" | "Property Details" | "Pricing";

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
    { page: 3, title: "Pricing" },
] as const;

interface Props {
    property: NonNullable<GetPropertyRes>;
}

export const listingTypeField = "listingType";
export const squareFeetField = "squareFeet";
export const bedroomsField = "bedrooms";
export const bathroomsField = "bathrooms";
export const propertyTypeField = "propertyType";
export const salePriceField = "salePrice";
export const rentPriceField = "rentPrice";
export const propertyTaxField = "propertyTax";
export const hoaMonthlyField = "hoaMonthly";

export interface PropertyForm {
    //1
    [listingTypeField]: ListingTypeT | null;
    [propertyTypeField]: PropertyTypeOption | null;

    //2
    [squareFeetField]: string | null;
    [bedroomsField]: BedroomOption | null;
    [bathroomsField]: BathroomOption | null;

    //3
    [salePriceField]: string | null;
    [propertyTaxField]: string | null;
    [hoaMonthlyField]: string | null;
    [rentPriceField]: string | null;
}

const toNumString = (num: number | null): string | null => {
    if (num === null) {
        return null;
    }

    return `${num}`;
};

const PropertyEditForm = ({ property }: Props): JSX.Element => {
    const {
        propertyType,
        listing_type,
        bedrooms,
        bathrooms,
        squareFeet,
        salePrice,
        annual_property_tax,
        rentPrice,
        HOA_monthly_fee,
    } = property;

    const toast = useToast();

    const defaultValues: PropertyForm = useMemo(() => {
        return {
            [listingTypeField]: listing_type,
            [propertyTypeField]: getPropertyTypeOption(propertyType),

            [squareFeetField]: toNumString(squareFeet),
            [bedroomsField]: getBedroomOption(bedrooms),
            [bathroomsField]: getBathroomOption(bathrooms),

            [salePriceField]: toNumString(salePrice),
            [propertyTaxField]: toNumString(annual_property_tax),
            [hoaMonthlyField]: toNumString(HOA_monthly_fee),
            [rentPriceField]: toNumString(rentPrice),
        };
    }, [
        HOA_monthly_fee,
        annual_property_tax,
        bathrooms,
        bedrooms,
        listing_type,
        propertyType,
        rentPrice,
        salePrice,
        squareFeet,
    ]);

    const methods = useForm<PropertyForm>({
        ...formProps,
        defaultValues: defaultValues,
    });
    methods.setValue;
    const [page, setPage] = useState<PropertyFormPage["page"]>(1);

    const formValues = useWatch({
        control: methods.control,
        defaultValue: defaultValues,
    }) as ExcludeUndefined<PropertyForm>;

    return (
        <div>
            <div>
                {propertyFormPages.map((p) => {
                    return (
                        <Button
                            key={p.title}
                            onClick={() => setPage(p.page)}
                            disabled={
                                p.title === "Pricing" &&
                                formValues[listingTypeField] === null
                            }
                        >
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
                            return (
                                <PriceDetails
                                    formValues={formValues}
                                    handleMissingListingType={() => {
                                        toast.create(
                                            "Please select the listing type",
                                            "error"
                                        );
                                        setPage(1);
                                    }}
                                    resetHOAFeeField={() =>
                                        methods.setValue(hoaMonthlyField, null)
                                    }
                                />
                            );
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
