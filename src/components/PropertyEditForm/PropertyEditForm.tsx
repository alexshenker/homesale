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
import useUpdateProperty from "@/lib/hooks/properties/useUpdateProperty";
import { useBoolean } from "usehooks-ts";
import useToast from "../ui/Toast/useToast";

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
}

export const listingTypeField = "listingType";
export const squareFeetField = "squareFeet";
export const bedroomsField = "bedrooms";
export const bathroomsField = "bathrooms";
export const propertyTypeField = "propertyType";
export const salePriceField = "salePrice";
export const rentPriceField = "rentPrice";
export const propertyTaxField = "annual_property_tax";
export const hoaMonthlyField = "HOA_monthly_fee";
export const leaseTermMonthsField = "leaseDurationMonths";
export const numberOfFloorsField = "numberOfFloors";
export const basementField = "basement";
export const yearBuiltField = "yearBuilt";
export const lastRoofReplacementYearField = "lastRoofReplacementYear";
export const acresField = "acres";
export const descriptionField = "description";
export const amenitiesField = "amenities";
export const otherAmenitiesField = "otherAmenities";
export const creatorConfirmedPermissionField =
    "creator_confirmed_management_permission";
export const ownerFirstnameField = "Owner_first";
export const ownerLastnameField = "Owner_last";
export const ownerMiddlenameField = "Owner_middle";

const strToNum = (s: string | null): number | null => {
    if (s === null) {
        return null;
    }

    if (/^-?\d+$/.test(s)) {
        return parseInt(s, 10);
    } else if (/^-?\d*\.\d+$/.test(s)) {
        return parseFloat(s);
    }

    return null;
};

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
    [rentPriceField]: string | null;
    [leaseTermMonthsField]: string | null;

    //Amenities
    [amenitiesField]: AmenityOption[];
    [otherAmenitiesField]: string | null;

    //Documents
    [creatorConfirmedPermissionField]: ConfirmPermissionOption | [];
    [ownerFirstnameField]: string | null;
    [ownerLastnameField]: string | null;
    [ownerMiddlenameField]: string | null;
}

const toNumString = (num: number | null): string | null => {
    if (num === null) {
        return null;
    }

    return `${num}`;
};

const PropertyEditForm = (props: Props): JSX.Element => {
    /** Just to shorten variable */
    const p = useMemo(() => {
        return props.property;
    }, [props.property]);

    const loading = useBoolean();

    const defaultValues: PropertyForm = useMemo(() => {
        return {
            [propertyTypeField]: getPropertyTypeOption(p.propertyType),
            [squareFeetField]: toNumString(p.squareFeet),
            [bedroomsField]: getBedroomOption(p.bedrooms),
            [bathroomsField]: getBathroomOption(p.bathrooms),
            [numberOfFloorsField]: getFloorOption(p.numberOfFloors),
            [basementField]:
                p.basement === true
                    ? "Yes"
                    : p.basement === false
                      ? "No"
                      : null,
            [yearBuiltField]: getYearOption(p.yearBuilt),
            [lastRoofReplacementYearField]: getYearOption(
                p.lastRoofReplacementYear
            ),
            [acresField]: toNumString(p.acres),
            [salePriceField]: toNumString(p.salePrice),
            [propertyTaxField]: toNumString(p.annual_property_tax),
            [hoaMonthlyField]: toNumString(p.HOA_monthly_fee),
            [rentPriceField]: toNumString(p.rentPrice),
            [leaseTermMonthsField]: toNumString(p.leaseDurationMonths),
            [descriptionField]: p.description,
            [amenitiesField]: getAmenityOptionsGrouped(p.amenities),
            [otherAmenitiesField]: p.otherAmenities,
            [creatorConfirmedPermissionField]:
                p.creator_confirmed_management_permission === true
                    ? confirmPermissionOptions
                    : [],
            [ownerFirstnameField]: p.Owner_first,
            [ownerLastnameField]: p.Owner_last,
            [ownerMiddlenameField]: p.Owner_middle,
        };
    }, [p]);

    const updateProperty = useUpdateProperty();

    const methods = useForm<PropertyForm>({
        ...formProps,
        defaultValues: defaultValues,
    });

    const { getValues, formState } = methods;

    const toast = useToast();

    const [pageIndex, setPageIndex] = useState<number>(0);

    const formValues = useWatch({
        control: methods.control,
        defaultValue: defaultValues,
    }) as ExcludeUndefined<PropertyForm>;

    const callUpdateProperty = async () => {
        const values = getValues();

        const {
            salePrice,
            rentPrice,
            propertyType,
            squareFeet,
            amenities,
            bedrooms,
            bathrooms,
            yearBuilt,
            numberOfFloors,
            acres,
            basement,
            annual_property_tax,
            lastRoofReplacementYear,
            HOA_monthly_fee,
            leaseDurationMonths,
            creator_confirmed_management_permission,
            ...restValues
        } = values;

        const salePriceParsed = strToNum(salePrice);
        const rentPriceParsed = strToNum(rentPrice);
        const squareFeetParsed = strToNum(squareFeet);
        const propertyTaxParsed = strToNum(annual_property_tax);
        const HOAMonthlyParsed = strToNum(HOA_monthly_fee);
        const acresParsed = strToNum(acres);
        const basementParsed =
            basement === "Yes" ? true : basement === "No" ? false : null;
        const leaseTermMonthsParsed = strToNum(leaseDurationMonths);

        const confirmedPermission =
            creator_confirmed_management_permission.length > 0;
        try {
            loading.setTrue();

            await updateProperty({
                propertyId: p.id,
                property: {
                    creator_confirmed_management_permission:
                        confirmedPermission,
                    ...(confirmedPermission === true && {
                        creator_confirmed_management_permission_on_date:
                            new Date(),
                    }),
                    leaseDurationMonths: leaseTermMonthsParsed,
                    HOA_monthly_fee: HOAMonthlyParsed,
                    annual_property_tax: propertyTaxParsed,
                    lastRoofReplacementYear:
                        lastRoofReplacementYear?.value ?? null,
                    acres: acresParsed,
                    basement: basementParsed,
                    numberOfFloors: numberOfFloors?.value ?? null,
                    yearBuilt: yearBuilt?.value ?? null,
                    bathrooms: values[bathroomsField]?.value ?? null,
                    bedrooms: values[bedroomsField]?.value ?? null,
                    squareFeet: squareFeetParsed,
                    amenities: amenities.map((a) => a.value),
                    propertyType: propertyType?.value ?? null,
                    rentPrice: rentPriceParsed,
                    salePrice: salePriceParsed,
                    ...restValues,
                },
            });

            toast.success("Property updated");
        } catch {
            toast.error("Failed to update property");
        } finally {
            loading.setFalse();
        }
    };

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
                            return <Media property={props.property} />;
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

            <Button onClick={callUpdateProperty}>Save</Button>

            <Space />

            <Box display="flex" justifyContent={"space-between"}>
                <Button
                    onClick={() => {
                        setPageIndex(pageIndex - 1);
                    }}
                    disabled={pageIndex === 0}
                >
                    {"< Previous"}
                </Button>

                <Button
                    onClick={() => {
                        setPageIndex(pageIndex + 1);
                    }}
                    disabled={pageIndex === maxPageIndex}
                >
                    {"Next >"}
                </Button>
            </Box>
        </div>
    );
};

export default PropertyEditForm;
