"use client";

import search_address from "@/lib/search_address/search_address";
import { formProps } from "@/utils/constants/formProps";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {}

const CreateNewListing = (props: Props): JSX.Element => {
    const methods = useForm({
        ...formProps,
    });

    const [v, setV] = useState("");

    return (
        <div>
            <input value={v} onChange={(e) => setV(e.target.value)} />
            <button
                onClick={async () => {
                    const r = await search_address(v);

                    console.log(r);
                }}
            >
                Search
            </button>
            {/* <FormProvider {...methods}></FormProvider> */}
        </div>
    );
};

export default CreateNewListing;
