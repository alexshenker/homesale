"use client";

import TextField, {
    textFieldBorderRadius,
} from "@/components/fields/TextField";
import Space from "@/components/ui/Space";
import Text from "@/components/ui/text/Text";
import searchAddress, {
    MapboxResponse,
} from "@/lib/searchAddress/searchAddress";
import { formProps } from "@/utils/constants/formProps";
import colors from "@/utils/public/colors";
import {
    Box,
    ClickAwayListener,
    Stack,
    outlinedInputClasses,
    stackClasses,
    typographyClasses,
} from "@mui/material";
import { debounce } from "lodash";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {}

const CreateNewListing = (props: Props): JSX.Element => {
    const methods = useForm({
        ...formProps,
    });

    const [addressSelected, setAddressSelected] = useState(false);

    const [address, setAddress] = useState("");

    const [apt, setApt] = useState("");

    const [places, setPlaces] = useState<MapboxResponse | null>(null);

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

        if (addressSelected) {
            return;
        }

        onAddressChange(address);
    }, [address, addressSelected, onAddressChange]);

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
                                setAddressSelected(false);
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
                                {places.features.map((place, idx) => {
                                    const isLastItem =
                                        idx === places.features.length - 1;
                                    return (
                                        <Box
                                            key={place.id}
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
                                                        place.properties.full_address.replace(
                                                            ", United States",
                                                            ""
                                                        )
                                                    );
                                                    setAddressSelected(true);
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
                                                {place.properties.full_address.replace(
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
        </Box>
    );
};

export default CreateNewListing;
