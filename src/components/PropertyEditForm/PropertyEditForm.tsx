"use client";

import { useEffect, useMemo, useState } from "react";

import { GetPropertyRes } from "@/lib/db/properties/getProperty";
import PropertyDetails, {
    BathroomOption,
    BedroomOption,
    FloorOption,
    PropertyTypeOption,
    YearOption,
    getBathroomOption,
    getBedroomOption,
    getFloorOption,
    getPropertyTypeOption,
    getYearOption,
} from "./Subforms/PropertyDetails";
import Button from "../ui/button/Button";
import { Box } from "@mui/material";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { formProps } from "@/utils/constants/formProps";
import Space from "../ui/Space";
import PriceDetails from "./Subforms/PriceDetails";
import exhaustiveSwitch from "@/utils/public/exhaustiveSwitch";
import Description from "./Subforms/Description";
import AmenitiesPage, {
    AmenityOption,
    getAmenityOptionsGrouped,
} from "./Subforms/AmenitiesPage";
import Media from "./Subforms/Media";
import Documents, {
    ConfirmPermissionOption,
    confirmPermissionOptions,
} from "./Subforms/Documents";
import Preview from "./Subforms/Preview";

const subforms = [
    "Property Details",
    "Description",
    "Pricing",
    "Amenities",
    "Media",
    "Documents",
    "Preview",
] as const;

export type Subform = (typeof subforms)[number];

const maxPageIndex = subforms.length - 1;

interface Props {
    property: NonNullable<GetPropertyRes>;
    hoaBylawsDocument: File | null;
    deedDocument: File | null;
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
export const descriptionField = "description";
export const amenitiesField = "amenities";
export const otherAmenitiesField = "amenitiesOther";
export const deedDocumentField = "deedDocument";
export const mainPhotoSrcField = "mainPhotoSrc";
export const otherPhotosSrcsField = "otherPhotos";
export const creatorConfirmedPermissionField = "creatorConfirmedPermission";

export interface PropertyForm {
    //Property details
    [propertyTypeField]: PropertyTypeOption | null;
    [squareFeetField]: string | null;
    [bedroomsField]: BedroomOption | null;
    [bathroomsField]: BathroomOption | null;
    [numberOfFloorsField]: FloorOption | null;
    [basementField]: "Yes" | "No" | null;
    [yearBuiltField]: YearOption | null; //1998
    [lastRoofReplacementYearField]: YearOption | null;
    [acresField]: string | null;

    //Description
    [descriptionField]: string | null;

    //Pricing
    [salePriceField]: string | null;
    [propertyTaxField]: string | null;
    [hoaMonthlyField]: string | null;
    [hoaBylawsDocumentField]: File | null;
    [rentPriceField]: string | null;
    [leaseTermMonthsField]: string | null;

    //Amenities
    [amenitiesField]: AmenityOption[];
    [otherAmenitiesField]: string | null;

    //Media
    [mainPhotoSrcField]: string | null;
    [otherPhotosSrcsField]: string[];

    //Documents
    [creatorConfirmedPermissionField]: ConfirmPermissionOption | [];
    [deedDocumentField]: File | null;
}

const toNumString = (num: number | null): string | null => {
    if (num === null) {
        return null;
    }

    return `${num}`;
};

const PropertyEditForm = (props: Props): JSX.Element => {
    const {
        propertyType,
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
        description,
        amenities,
        otherAmenities,
        primaryPhoto,
        photos,
        creator_confirmed_management_permission,
    } = props.property;

    const defaultValues: PropertyForm = useMemo(() => {
        return {
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
            [hoaBylawsDocumentField]: props.hoaBylawsDocument,
            [descriptionField]: description,
            [amenitiesField]: getAmenityOptionsGrouped(amenities),
            [otherAmenitiesField]: otherAmenities,
            [deedDocumentField]: props.deedDocument,
            [mainPhotoSrcField]: primaryPhoto,
            [otherPhotosSrcsField]: photos,
            [creatorConfirmedPermissionField]:
                creator_confirmed_management_permission === true
                    ? confirmPermissionOptions
                    : [],
        };
    }, [
        HOA_monthly_fee,
        acres,
        annual_property_tax,
        basement,
        bathrooms,
        bedrooms,
        description,
        props.hoaBylawsDocument,
        lastRoofReplacementYear,
        leaseDurationMonths,
        numberOfFloors,
        propertyType,
        rentPrice,
        salePrice,
        squareFeet,
        yearBuilt,
        primaryPhoto,
        photos,
        props.deedDocument,
        creator_confirmed_management_permission,
    ]);

    const methods = useForm<PropertyForm>({
        ...formProps,
        defaultValues: defaultValues,
    });
    methods.setValue;
    const [pageIndex, setPageIndex] = useState<number>(0);

    const formValues = useWatch({
        control: methods.control,
        defaultValue: defaultValues,
    }) as ExcludeUndefined<PropertyForm>;

    return (
        <div>
            <div>
                {subforms.map((f, idx) => {
                    return (
                        <Button
                            key={f}
                            onClick={() => setPageIndex(idx)}
                            {...(idx === pageIndex
                                ? { variant: "outlined" }
                                : {})}
                        >
                            {f}
                        </Button>
                    );
                })}
            </div>

            {/* Using visibility allows us to keep users form edits without api call */}

            <Space />

            <FormProvider {...methods}>
                {(() => {
                    const curForm = subforms[pageIndex];

                    switch (curForm) {
                        case "Property Details": {
                            return <PropertyDetails />;
                        }
                        case "Description": {
                            return <Description />;
                        }
                        case "Pricing": {
                            return (
                                <PriceDetails
                                    formValues={formValues}
                                    resetHOAFeeField={() =>
                                        methods.setValue(hoaMonthlyField, null)
                                    }
                                    listingType={props.property.listing_type}
                                />
                            );
                        }
                        case "Amenities": {
                            return <AmenitiesPage />;
                        }
                        case "Media": {
                            return <Media />;
                        }
                        case "Documents": {
                            return <Documents property={props.property} />;
                        }
                        case "Preview": {
                            return <Preview />;
                        }
                        default: {
                            return exhaustiveSwitch(curForm);
                        }
                    }
                })()}
            </FormProvider>

            <Space />

            <Box display="flex" justifyContent={"space-between"}>
                <Button
                    onClick={() => setPageIndex(pageIndex - 1)}
                    disabled={pageIndex === 0}
                >
                    {"< Previous"}
                </Button>

                <Button
                    onClick={() => setPageIndex(pageIndex + 1)}
                    disabled={pageIndex === maxPageIndex}
                >
                    {"Next >"}
                </Button>
            </Box>
        </div>
    );
};

export default PropertyEditForm;
