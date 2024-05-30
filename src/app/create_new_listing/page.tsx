"use client";

import TextField from "@/components/fields/TextField";
import Text from "@/components/ui/text/Text";
import searchAddress, {
    MapboxResponse,
} from "@/lib/searchAddress/searchAddress";
import { formProps } from "@/utils/constants/formProps";
import { Stack } from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {}

const CreateNewListing = (props: Props): JSX.Element => {
    const methods = useForm({
        ...formProps,
    });

    const [addressSelected, setAddressSelected] = useState(false);

    const [address, setAddress] = useState("");

    const [places, setPlaces] = useState<MapboxResponse | null>(null);

    const onAddressChange = useCallback(
        debounce(async (newAddress: string) => {
            const newPlaces = await searchAddress(newAddress);

            setPlaces(newPlaces);
        }, 250),
        []
    );

    useEffect(() => {
        if (address.length < 2) {
            return;
        }

        if (addressSelected) {
            return;
        }

        onAddressChange(address);
    }, [address, addressSelected, onAddressChange]);

    return (
        <div>
            <TextField
                value={address}
                onChange={(e) => {
                    setAddressSelected(false);
                    setAddress(e.target.value);
                }}
            />

            <Stack>
                {places !== null &&
                    places.features.map((place) => {
                        return (
                            <Text
                                key={place.id}
                                onClick={() => {
                                    setAddress(place.properties.full_address);
                                    setAddressSelected(true);
                                    setPlaces(null);
                                }}
                            >
                                {place.properties.full_address}
                            </Text>
                        );
                    })}
            </Stack>

            {/* <FormProvider {...methods}></FormProvider> */}
        </div>
    );
};

export default CreateNewListing;
