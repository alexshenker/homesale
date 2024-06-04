import { States } from "@prisma/client";

type Address = {
    street_address: string;
    apartment: string | null;
    zipCode: string;
    zipCodeExt: string | null;
    city: string;
    state: States;
};

const toFullAddress = (address: Address): string => {
    const { street_address, apartment, zipCode, zipCodeExt, city, state } =
        address;

    const zip = zipCodeExt ? `${zipCode}-${zipCodeExt}` : zipCode;

    const street = apartment
        ? `${street_address}, ${apartment}`
        : street_address;

    return `${street}, ${city}, ${state} ${zip}`;
};

export default toFullAddress;
