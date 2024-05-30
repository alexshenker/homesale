"use client";

import TextField from "@/components/fields/TextField";
import searchAddress, {
    NominatimResponse,
} from "@/lib/searchAddress/searchAddress";
import { formProps } from "@/utils/constants/formProps";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {}

const CreateNewListing = (props: Props): JSX.Element => {
    const methods = useForm({
        ...formProps,
    });

    const [addressToSearch, setAddressToSearch] = useState("");

    const [places, setPlaces] = useState<NominatimResponse>();

    const onAddressChange = useCallback(
        debounce(async (newAddress: string) => {
            const newPlaces = await searchAddress(newAddress);

            setPlaces(newPlaces);
        }, 250),
        []
    );
    useEffect(() => {
        console.log(places);
    }, [places]);
    useEffect(() => {
        onAddressChange(addressToSearch);
    }, [addressToSearch, onAddressChange]);

    return (
        <div>
            <TextField
                value={addressToSearch}
                onChange={(e) => setAddressToSearch(e.target.value)}
            />

            {/* <FormProvider {...methods}></FormProvider> */}
        </div>
    );
};

export default CreateNewListing;
