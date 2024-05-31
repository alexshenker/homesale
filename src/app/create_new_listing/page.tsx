"use client";

import TextField, {
    textFieldBorderRadius,
} from "@/components/fields/TextField";
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
import {
    Box,
    ClickAwayListener,
    Stack,
    outlinedInputClasses,
    stackClasses,
    typographyClasses,
} from "@mui/material";
import { debounce, isNil } from "lodash";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

const CreateNewListing = (): JSX.Element => {
    const auth = useAuth();

    const [placeId, setPlaceId] = useState<MapboxPlaceId | null>(null);

    const [address, setAddress] = useState("");

    const toast = useToast();

    const [loading, setLoading] = useState(false);

    const [apt, setApt] = useState("");

    const [places, setPlaces] = useState<MapboxResponse | null>(null);

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
        if (submitDisabled) {
            return;
        }

        if (isNil(auth.data) || place === null) {
            return;
        }

        setLoading(true);

        const { properties } = place;

        const { context } = properties;

        try {
            await createProperty({
                ownerId: auth.data.user.id,
                property: {
                    street_address: properties.name,
                    zipCode: context.postcode.name,
                    city: context.locality?.name ?? context.place.name,
                    state: context.region.region_code,
                    longitude: properties.geometry.coordinates[0],
                    latitude: properties.geometry.coordinates[1],
                    ...(apt.length > 0 ? { apartment: apt } : {}),
                },
            });

            toast.create("New property created", "success");

            //@TODO: Redirect to next property process
        } catch {
            toast.create("Failed to create property", "error");
        } finally {
            setLoading(false);
        }
    };

    const submitDisabled = place === null || loading || isNil(auth.data);

    return (
        <Box position="relative">
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
                            "linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 60%)",
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
                maxWidth={"350px"}
                minWidth="180px"
                position="absolute"
                top="0px"
                padding={4}
            >
                <Space />
                <Text fontSize={"18px"}>
                    What is the street address of your property?
                </Text>
                <Space />
                <ClickAwayListener
                    onClickAway={() => {
                        setPlaces(null); //closes the 'dropdown'
                    }}
                >
                    <Box position={"relative"}>
                        <TextField
                            label="Street address"
                            value={address}
                            onChange={(e) => {
                                setPlaceId(null);
                                setAddress(e.target.value);
                            }}
                            required
                            placeholder="Search address..."
                            sx={
                                places === null
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
                        {places !== null && (
                            <Stack
                                position={"absolute"}
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
                                                    setPlaces(null);
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
                {/* <FormProvider {...methods}></FormProvider> */}
                <Space />
                <Box width={"100px"}>
                    <TextField
                        value={apt}
                        placeholder="Apt/Suite..."
                        onChange={(e) => setApt(e.target.value)}
                        label="Apartment/Suite"
                    />
                </Box>
            </Box>

            <Button onClick={submit} disabled={submitDisabled}>
                Submit
            </Button>
        </Box>
    );
};

export default CreateNewListing;
