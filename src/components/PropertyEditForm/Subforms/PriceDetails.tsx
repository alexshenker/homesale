import { Box } from "@mui/material";
import {
    PropertyForm,
    hoaMonthlyField,
    listingTypeField,
    propertyTaxField,
    rentPriceField,
    salePriceField,
} from "../PropertyEditForm";
import exhaustiveSwitch from "@/utils/public/exhaustiveSwitch";
import { useEffect, useState } from "react";
import Text from "@/components/ui/text/Text";
import FormAmountField from "@/components/fields/formfields/FormAmountField";
import Space from "@/components/ui/Space";
import Switch from "@/components/fields/Switch";
import Label from "@/components/ui/text/Label";

interface Props {
    formValues: PropertyForm;
    handleMissingListingType: () => void;
    resetHOAFeeField: () => void;
}

const PriceDetails = ({
    formValues,
    handleMissingListingType,
    resetHOAFeeField,
}: Props): JSX.Element => {
    const listingType = formValues[listingTypeField];

    const [hasHOA, setHasHOA] = useState(formValues[hoaMonthlyField] !== null);

    useEffect(() => {
        if (listingType === null) {
            //This means we don't have the info we need for this form
            handleMissingListingType();
        }
    });

    const toggleHasHOA = () => {
        if (hasHOA === true) {
            //Reset HOA value/s
            setHasHOA(false);
            resetHOAFeeField();
        } else {
            setHasHOA(true);
        }
    };

    switch (listingType) {
        case "sell": {
            return (
                <Box width={"200px"}>
                    <FormAmountField
                        name={salePriceField}
                        startAdornment={"$"}
                        label="Price"
                    />

                    <Space />

                    <FormAmountField
                        name={propertyTaxField}
                        startAdornment={"$"}
                        label="Annual Property Tax"
                    />

                    <Space />

                    <Box>
                        <Label>Is the property part of an HOA?</Label>

                        <Switch on={hasHOA} onChange={toggleHasHOA} label="" />

                        {hasHOA && (
                            <Box>
                                <FormAmountField
                                    name={hoaMonthlyField}
                                    startAdornment={"$"}
                                    label="Monthly HOA Fee"
                                    endAdornment={
                                        <Text
                                            padding={1}
                                            fontSize={"12px"}
                                            whiteSpace={"nowrap"}
                                        >
                                            Per month
                                        </Text>
                                    }
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
            );
        }

        case "rent": {
            return (
                <Box width={"200px"}>
                    <FormAmountField
                        name={rentPriceField}
                        startAdornment={"$"}
                        label="Monthly Rent"
                        endAdornment={
                            <Text
                                padding={1}
                                fontSize={"12px"}
                                whiteSpace={"nowrap"}
                            >
                                Per month
                            </Text>
                        }
                    />
                </Box>
            );
        }

        case null: {
            /* User didn't select listing type yet... so we enforce it here */
            return (
                <Text type="error">
                    Please go back and select the listing type
                </Text>
            );
        }

        default: {
            return exhaustiveSwitch(listingType);
        }
    }
};

export default PriceDetails;
