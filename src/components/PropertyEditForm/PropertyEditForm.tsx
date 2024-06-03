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
    FloorOption,
    YearOption,
    getBathroomOption,
    getBedroomOption,
    getFloorOption,
    getYearOption,
} from "./Subforms/PropertyDetails";
import Button from "../ui/button/Button";
import { Box } from "@mui/material";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { formProps } from "@/utils/constants/formProps";
import { ListingType as ListingTypeT } from "@prisma/client";
import Space from "../ui/Space";
import PriceDetails from "./Subforms/PriceDetails";
import useToast from "../ui/Toast/useToast";

export type SubformTitle =
    | "Listing Type"
    | "Property Details"
    | "Pricing"
    | "Amenities"
    | "Media"
    | "Additional Info"
    | "Documents"
    | "Preview";

const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8] as const;
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
    { page: 4, title: "Amenities" },
    { page: 5, title: "Media" },
    { page: 6, title: "Additional Info" },
    { page: 7, title: "Documents" },
    { page: 8, title: "Preview" },
] as const;

interface Props {
    property: NonNullable<GetPropertyRes>;
    hoaBylawsDocument: File | null;
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
export const hoaBylawsDocumentField = "hoaBylawsDocument";
export const leaseTermMonthsField = "leaseTermMonths";
export const numberOfFloorsField = "numberOfFloors";
export const basementField = "basement";
export const yearBuiltField = "yearBuilt";
export const lastRoofReplacementYearField = "lastRoofReplacementYear";
export const acresField = "acres";

export interface PropertyForm {
    //1
    [listingTypeField]: ListingTypeT | null;
    [propertyTypeField]: PropertyTypeOption | null;

    //2
    [squareFeetField]: string | null;
    [bedroomsField]: BedroomOption | null;
    [bathroomsField]: BathroomOption | null;
    [numberOfFloorsField]: FloorOption | null;
    [basementField]: "Yes" | "No" | null;
    [yearBuiltField]: YearOption | null; //1998
    [lastRoofReplacementYearField]: YearOption | null;
    [acresField]: string | null;

    //3
    [salePriceField]: string | null;
    [propertyTaxField]: string | null;
    [hoaMonthlyField]: string | null;
    [hoaBylawsDocumentField]: File | null;
    [rentPriceField]: string | null;
    [leaseTermMonthsField]: string | null;
}

const toNumString = (num: number | null): string | null => {
    if (num === null) {
        return null;
    }

    return `${num}`;
};

const PropertyEditForm = ({
    property,
    hoaBylawsDocument,
}: Props): JSX.Element => {
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
        leaseDurationMonths,
        numberOfFloors,
        basement,
        yearBuilt,
        lastRoofReplacementYear,
        acres,
    } = property;

    const toast = useToast();

    const defaultValues: PropertyForm = useMemo(() => {
        return {
            [listingTypeField]: listing_type,
            [propertyTypeField]: getPropertyTypeOption(propertyType),

            [squareFeetField]: toNumString(squareFeet),
            [bedroomsField]: getBedroomOption(bedrooms),
            [bathroomsField]: getBathroomOption(bathrooms),
            [numberOfFloorsField]: getFloorOption(numberOfFloors),
            [basementField]:
                basement === true ? "Yes" : basement === false ? "No" : null,
            [yearBuiltField]: getYearOption(yearBuilt),
            [lastRoofReplacementYearField]: getYearOption(
                lastRoofReplacementYear
            ),
            [acresField]: toNumString(acres),

            [salePriceField]: toNumString(salePrice),
            [propertyTaxField]: toNumString(annual_property_tax),
            [hoaMonthlyField]: toNumString(HOA_monthly_fee),
            [rentPriceField]: toNumString(rentPrice),
            [leaseTermMonthsField]: toNumString(leaseDurationMonths),

            [hoaBylawsDocumentField]: hoaBylawsDocument,
        };
    }, [
        HOA_monthly_fee,
        acres,
        annual_property_tax,
        basement,
        bathrooms,
        bedrooms,
        hoaBylawsDocument,
        lastRoofReplacementYear,
        leaseDurationMonths,
        listing_type,
        numberOfFloors,
        propertyType,
        rentPrice,
        salePrice,
        squareFeet,
        yearBuilt,
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
                            {...(p.page === page
                                ? { variant: "outlined" }
                                : {})}
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
                                        toast.error(
                                            "Please select the listing type"
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
                        case 6: {
                            return;
                        }
                        case 7: {
                            return;
                        }
                        case 8: {
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
