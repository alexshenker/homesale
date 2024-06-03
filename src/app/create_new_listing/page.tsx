"use client";

import Radio from "@/components/fields/Radio";
import TextField, {
    textFieldBorderRadius,
} from "@/components/fields/TextField";
import Loading from "@/components/ui/Loading";
import Space from "@/components/ui/Space";
import useToast from "@/components/ui/Toast/useToast";
import Button from "@/components/ui/button/Button";
import Text from "@/components/ui/text/Text";
import createProperty from "@/lib/requests/properties/createProperty";
import searchAddress, {
    MapboxPlaceId,
    MapboxResponse,
} from "@/lib/requests/searchAddress/searchAddress";

import colors from "@/utils/public/colors";
import useAuth from "@/utils/public/hooks/useAuth";
import routes, { $propertyid, edit_listing } from "@/utils/public/routes";
import {
    Box,
    ClickAwayListener,
    Stack,
    outlinedInputClasses,
    stackClasses,
    typographyClasses,
} from "@mui/material";
import { ListingType } from "@prisma/client";
import { debounce, isNil } from "lodash";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const CreateNewListing = (): JSX.Element => {
    const auth = useAuth();

    const router = useRouter();

    const [placeId, setPlaceId] = useState<MapboxPlaceId | null>(null);

    const [listingType, setListingType] = useState<ListingType | null>(null);

    const [address, setAddress] = useState("");

    const toast = useToast();

    const [loading, setLoading] = useState(false);

    const [apt, setApt] = useState("");

    const [showDropdown, setShowDropdown] = useState(false);

    const [places, setPlaces] = useState<MapboxResponse | null>(null);

    useEffect(() => {
        if (auth.isLoading || auth.hasError) {
            return;
        }

        if (auth.data === null || !auth.data.authenticated) {
            signIn();
        }
    }, [auth.data, auth.hasError, auth.isLoading]);

    const place = useMemo(() => {
        if (placeId === null || places === null) {
            return null;
        }

        const placeLocal = places.features.find((pl) => pl.id === placeId);

        if (placeLocal === undefined) {
            console.error("Missing place for Id", placeId);
            return null;
        }

        return placeLocal;
    }, [placeId, places]);

    const onAddressChange = useCallback(
        debounce((newAddress: string) => {
            searchAddress(newAddress).then((newPlaces) => {
                setPlaces(newPlaces);
                setShowDropdown(true);
            });
        }, 300),
        []
    );

    useEffect(() => {
        if (address.length < 2) {
            return;
        }

        if (placeId !== null) {
            return;
        }

        onAddressChange(address);
    }, [address, onAddressChange, placeId]);

    const submit = async () => {
        if (isNil(auth.data) || place === null) {
            return;
        }

        if (listingType === null) {
            toast.error("Missing listing type");
            return;
        }

        setLoading(true);

        const { context } = place.properties;

        try {
            const property = await createProperty({
                creatorId: auth.data.user.id,
                property: {
                    mapboxPlaceId: place.id,
                    street_address: place.properties.name,
                    zipCode: context.postcode.name,
                    city: context.locality?.name ?? context.place.name,
                    state: context.region.region_code,
                    longitude: place.geometry.coordinates[0],
                    latitude: place.geometry.coordinates[1],
                    ...(apt.length > 0 ? { apartment: apt } : {}),
                    listing_type: listingType,
                },
            });

            toast.success("New property created");

            router.push(routes[edit_listing][$propertyid](property.id).$);
        } catch {
            toast.error("Failed to create property");
        } finally {
            setLoading(false);
        }
    };

    const submitDisabled =
        place === null || loading || isNil(auth.data) || listingType === null;

    if (auth.isLoading) {
        return <Loading />;
    }

    if (auth.hasError || auth.data === null) {
        return <></>;
    }

    return (
        <Box position="relative">
            {loading && <Loading />}
            <Box
                sx={{
                    display: "inline-block",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background:
                            "linear-gradient(to bottom, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 0.2) 60%)",
                    },
                }}
            >
                <Image
                    src="/images/lawn_3.webp"
                    width={2048}
                    height={2048}
                    alt="lawn"
                    objectFit="contain"
                />
            </Box>
            <Box
                width="100%"
                maxWidth={"405px"}
                minWidth="180px"
                position="absolute"
                top="0px"
                padding={4}
            >
                <Space />
                <Text fontSize={"18px"}>Lets get started!</Text>
                <Space h={5} />
                <Text fontSize={"16px"}>
                    First, what is the address of your property?
                </Text>
                <Space h={12} />
                <ClickAwayListener
                    onClickAway={() => {
                        setShowDropdown(false);
                    }}
                >
                    <Box position={"relative"}>
                        <TextField
                            label="Address"
                            value={address}
                            onChange={(e) => {
                                setPlaceId(null);
                                setAddress(e.target.value);
                            }}
                            required
                            placeholder="Search address..."
                            sx={
                                showDropdown === false
                                    ? {}
                                    : {
                                          [`& .${outlinedInputClasses.root}`]: {
                                              borderEndEndRadius: "0px",
                                              borderEndStartRadius: "0px",
                                              borderBottom: "none",
                                          },
                                          [`& .${outlinedInputClasses.input}`]:
                                              {
                                                  borderEndEndRadius: "0px",
                                                  borderEndStartRadius: "0px",
                                              },
                                      }
                            }
                        />
                        {places !== null && showDropdown && (
                            <Stack
                                position={"absolute"}
                                zIndex={1}
                                width="100%"
                                sx={{
                                    [`&.${stackClasses.root}`]: {
                                        backgroundColor: colors.background,
                                        borderLeft: `1px solid ${colors.border}`,
                                        borderRight: `1px solid ${colors.border}`,
                                        borderBottom: `1px solid ${colors.border}`,
                                        borderEndEndRadius:
                                            textFieldBorderRadius,
                                        borderEndStartRadius:
                                            textFieldBorderRadius,
                                    },
                                }}
                            >
                                {places.features.map((pl, idx) => {
                                    const isLastItem =
                                        idx === places.features.length - 1;
                                    return (
                                        <Box
                                            key={pl.id}
                                            paddingX={2}
                                            paddingY={0.5}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor:
                                                        colors.surface,
                                                },
                                                ...(isLastItem
                                                    ? {
                                                          borderEndEndRadius:
                                                              textFieldBorderRadius,
                                                          borderEndStartRadius:
                                                              textFieldBorderRadius,
                                                      }
                                                    : {}),
                                            }}
                                        >
                                            <Text
                                                onClick={() => {
                                                    setAddress(
                                                        pl.properties.full_address.replace(
                                                            ", United States",
                                                            ""
                                                        )
                                                    );
                                                    setPlaceId(pl.id);
                                                    setShowDropdown(false);
                                                }}
                                                whiteSpace={"nowrap"}
                                                textOverflow={"ellipsis"}
                                                overflow={"hidden"}
                                                sx={{
                                                    [`&.${typographyClasses.root}`]:
                                                        {
                                                            width: "auto",
                                                        },
                                                }}
                                            >
                                                {pl.properties.full_address.replace(
                                                    ", United States",
                                                    ""
                                                )}
                                            </Text>
                                        </Box>
                                    );
                                })}
                            </Stack>
                        )}
                    </Box>
                </ClickAwayListener>

                <Space />
                <Box width={"100px"}>
                    <TextField
                        value={apt}
                        placeholder="Apt/Suite..."
                        onChange={(e) => setApt(e.target.value)}
                        label="Apartment/Suite"
                    />
                </Box>

                <Space />

                <Box>
                    <Radio
                        label="Planning to sell or rent this property?"
                        value={listingType}
                        options={Object.values(ListingType)}
                        onChange={(e) =>
                            setListingType(e.target.value as ListingType)
                        }
                        required
                        row
                    />
                </Box>

                <Space />

                <Button onClick={submit} disabled={submitDisabled}>
                    Continue
                </Button>
            </Box>
        </Box>
    );
};

export default CreateNewListing;
